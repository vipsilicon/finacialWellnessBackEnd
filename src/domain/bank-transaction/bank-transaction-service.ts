import {
  IBankTransactionRepository,
  makeBankTransactionRepository,
} from "./bank-transaction-repository";
import { BankTransaction } from "./bank-transaction-entity";
import { User } from "../user/user-entity";
import { BankTransactionDTO } from "./models/dtos/bank-transaction.dto";
import { HttpException } from "../../shared/utils/http/http-exception";
import { HttpStatus } from "../../shared/models/enums/http-status";
import { LimitOffsetDTO } from "../../shared/models/dtos/limit-offset.dto";
import { StartEndDateDTO } from "../../shared/models/dtos/start-end-date.dto";

interface ICreateProps {
  user: User;
  bankTransactionDTO: BankTransactionDTO;
}

interface IUpdateProps {
  id: number;
  user: User;
  bankTransactionDTO: BankTransactionDTO;
}

export interface IFindProps {
  userID: number;
  bankTransactionDTO: BankTransactionDTO;
  limitOffsetDTO: LimitOffsetDTO;
  startEndDateDTO: StartEndDateDTO;
}

export interface IBankTransactionService {
  create(props: ICreateProps): Promise<BankTransaction>;
  update(props: IUpdateProps): Promise<BankTransaction>;
  find(props: IFindProps): Promise<BankTransaction[]>;
}

export class BankTransactionService implements IBankTransactionService {
  constructor(private bankTransactionRepository: IBankTransactionRepository) {}

  async create(props: ICreateProps): Promise<BankTransaction> {
    const { user, bankTransactionDTO } = props;

    const bankTransactionCreate = BankTransaction.fromCreate({
      userID: user.id,
      bankTransactionDTO,
    });

    return await this.bankTransactionRepository.create(bankTransactionCreate);
  }

  async update(props: IUpdateProps): Promise<BankTransaction> {
    const { id, user, bankTransactionDTO } = props;

    let bankTransaction = await this.bankTransactionRepository.findById(id);

    if (!bankTransaction) {
      throw new HttpException(
        "Bank Transaction Not Found",
        HttpStatus.NOT_FOUND
      );
    }

    const bankTransactionUpdate = BankTransaction.fromUpdate({
      userID: user.id,
      bankTransactionDTO,
    });

    await this.bankTransactionRepository.update(id, bankTransactionUpdate);

    bankTransaction = await this.bankTransactionRepository.findById(id);

    return bankTransaction;
  }

  async find(props: IFindProps): Promise<BankTransaction[]> {
    const { userID, bankTransactionDTO, startEndDateDTO, limitOffsetDTO } =
      props;

    return await this.bankTransactionRepository.find({
      userID,
      bankTransactionDTO,
      limitOffsetDTO,
      startEndDateDTO,
    });
  }
}

export const makeBankTransactionService = (): IBankTransactionService => {
  return new BankTransactionService(makeBankTransactionRepository());
};
