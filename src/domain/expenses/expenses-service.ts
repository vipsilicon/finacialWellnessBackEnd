import { User } from "../user/user-entity";
import { Expenses } from "./expenses-entity";
import { ExpensesDTO } from "./models/dtos/expenses.dto";
import {
  IExpensesRepository,
  makeExpensesRepository,
} from "./expenses-repository";
import { HttpException } from "../../shared/utils/http/http-exception";
import { HttpStatus } from "../../shared/models/enums/http-status";
import { LimitOffsetDTO } from "../../shared/models/dtos/limit-offset.dto";
import { StartEndDateDTO } from "../../shared/models/dtos/start-end-date.dto";
import { ExpensesFilterDTO } from "./models/dtos/expenses-filter.dto";
import { UUIDUtils } from "../../shared/utils/common/uuid-generator-utils";
import { SourceTypeEnum } from "./models/enums/source-type.enum";
import { CashTransactionDTO } from "../cash-transaction/models/dtos/cash-transaction.dto";
import { TransactionTypeEnum as TransactionTypeEnumCash } from "../cash-transaction/models/enums/transaction-type.enum";
import { TransactionTypeEnum as TransactionTypeEnumBank } from "../bank-transaction/models/enums/transaction-type.enum";
import {
  ICashTransactionService,
  makeCashTransactionService,
} from "../cash-transaction/cash-transaction-service";
import {
  IBankTransactionService,
  makeBankTransactionService,
} from "../bank-transaction/bank-transaction-service";
import { BankTransactionDTO } from "../bank-transaction/models/dtos/bank-transaction.dto";

interface ICreateProps {
  user: User;
  expensesDTOArray: ExpensesDTO[];
}

interface IUpdateProps {
  id: number;
  user: User;
  expensesDTO: ExpensesDTO;
}

export interface IFindProps {
  userID: number;
  expensesFilterDTO: ExpensesFilterDTO;
  limitOffsetDTO: LimitOffsetDTO;
  startEndDateDTO: StartEndDateDTO;
}

export interface IExpensesService {
  create(props: ICreateProps): Promise<Expenses[]>;
  update(props: IUpdateProps): Promise<Expenses | null>;
  find(props: IFindProps): Promise<Expenses[]>;
}

export class ExpensesService implements IExpensesService {
  constructor(
    private expensesRepository: IExpensesRepository,
    private cashTransactionService: ICashTransactionService,
    private bankTransactionService: IBankTransactionService
  ) {}

  // async create(props: ICreateProps): Promise<Expenses[]> {
  //   const { user, expensesDTOArray } = props;

  //   const orderId: string = UUIDUtils.generateUUID();

  //   const expenseEntity = expensesDTOArray.map((dto) => {
  //     return Expenses.fromCreate({
  //       user,
  //       expensesDTO: dto,
  //       orderId,
  //     });
  //   });

  //   const expensesResponse = await this.expensesRepository.create(
  //     expenseEntity
  //   );

  //   for (let expense of expensesResponse) {
  //     if (expense.source == SourceTypeEnum.CASH) {
  //       const cashExpense = {
  //         transactionDate: expense?.expenseDate,
  //         transactionType: TransactionTypeEnumCash.DEBIT,
  //         amount: expense.amount,
  //         description: expense.description,
  //         productId: expense.productId,
  //         userId: expense.userId,
  //         validate: async () => {
  //           return;
  //         },
  //       };
  //       const cashTransactionDTO = new CashTransactionDTO(cashExpense);
  //       cashTransactionDTO.validate();

  //       await this.cashTransactionService.create({
  //         cashTransactionDTO,
  //         user,
  //       });
  //     }

  //     if (expense.source == SourceTypeEnum.BANK) {
  //       const bankExpense = {
  //         transactionDate: expense?.expenseDate,
  //         transactionType: TransactionTypeEnumBank.DEBIT,
  //         amount: expense.amount,
  //         description: expense.description,
  //         productId: expense.productId,
  //         userId: expense.userId,
  //         bankId: expense.bankId,

  //         validate: async () => {
  //           return;
  //         },
  //       };

  //       const bankTransactionDTO = new BankTransactionDTO(bankExpense);
  //       bankTransactionDTO.validate();

  //       await this.bankTransactionService.create({
  //         bankTransactionDTO,
  //         user,
  //       });
  //     }
  //   }

  //   return expensesResponse;
  // }

  async create(props: ICreateProps): Promise<Expenses[]> {
    const { user, expensesDTOArray } = props;
    const orderId: string = UUIDUtils.generateUUID();

    const expenseEntities = expensesDTOArray.map((dto) =>
      Expenses.fromCreate({ user, expensesDTO: dto, orderId })
    );

    const expensesResponse = await this.expensesRepository.create(
      expenseEntities
    );

    await Promise.all(
      expensesResponse.map(async (expense) => {
        try {
          if (expense.source === SourceTypeEnum.CASH) {
            const cashTransactionDTO = new CashTransactionDTO({
              transactionDate: expense.expenseDate,
              transactionType: TransactionTypeEnumCash.DEBIT,
              amount: expense.amount,
              description: expense.description,
              productId: expense.productId,
              userId: expense.userId,
              validate: async () => {
                return;
              },
            });
            cashTransactionDTO.validate();

            await this.cashTransactionService.create({
              cashTransactionDTO,
              user,
            });
          }

          if (expense.source === SourceTypeEnum.BANK) {
            const bankTransactionDTO = new BankTransactionDTO({
              transactionDate: expense.expenseDate,
              transactionType: TransactionTypeEnumBank.DEBIT,
              amount: expense.amount,
              description: expense.description,
              productId: expense.productId,
              userId: expense.userId,
              bankId: expense.bankId,
              validate: async () => {
                return;
              },
            });
            bankTransactionDTO.validate();

            await this.bankTransactionService.create({
              bankTransactionDTO,
              user,
            });
          }
        } catch (error) {
          console.error(
            `Transaction failed for expense ID: ${expense.id}`,
            error
          );
        }
      })
    );

    return expensesResponse;
  }

  async update(props: IUpdateProps): Promise<Expenses | null> {
    const { user, expensesDTO, id } = props;

    let expenses: Expenses | any = this.expensesRepository.findById(id);

    if (!expenses) {
      throw new HttpException("Expense not found!", HttpStatus.NOT_FOUND);
    }

    const expensesUpdate = Expenses.fromUpdate({
      user,
      expensesDTO,
      orderId: expenses.orderId,
    });

    await this.expensesRepository.update(id, expensesUpdate);

    expenses = this.expensesRepository.findById(id);

    return expenses;
  }

  async find(props: IFindProps): Promise<Expenses[]> {
    const { userID, expensesFilterDTO, limitOffsetDTO, startEndDateDTO } =
      props;

    return this.expensesRepository.find({
      userID,
      expensesFilterDTO,
      limitOffsetDTO,
      startEndDateDTO,
    });
  }
}

export const makeExpensesService = (): ExpensesService => {
  return new ExpensesService(
    makeExpensesRepository(),
    makeCashTransactionService(),
    makeBankTransactionService()
  );
};
