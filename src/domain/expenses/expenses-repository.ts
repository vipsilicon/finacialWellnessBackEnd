import { SqlDataSource } from "../../infra/create-conn";
import { HttpStatus } from "../../shared/models/enums/http-status";
import { HttpException } from "../../shared/utils/http/http-exception";
import { Expenses } from "./expenses-entity";
import { IFindProps } from "./expenses-service";

export interface IExpensesRepository {
  create(expenses: Expenses[]): Promise<Expenses[]>;
  update(id: number, expenses: Expenses): Promise<void>;
  findById(id: number): Promise<Expenses | null>;
  find(props: IFindProps): Promise<Expenses[]>;
}

export class ExpensesRepository implements IExpensesRepository {
  private get repository() {
    return SqlDataSource.getRepository(Expenses);
  }

  async create(expenses: Expenses[]): Promise<Expenses[]> {
    // return await this.repository.save(expenses);
    try {
      return await this.repository.save(expenses);
    } catch (error) {
      console.error("Error saving expenses:", error);
      throw new HttpException(
        "Failed to save expenses",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id: number, expenses: Expenses): Promise<void> {
    await this.repository.update(id, {
      expenseDate: expenses.expenseDate,
      amount: expenses.amount,
      description: expenses.description,
      source: expenses.source,
      userId: expenses.userId,
      bankId: expenses.bankId,
      transactionId: expenses.transactionId,
      productId: expenses.productId,
      mrp: expenses.mrp,
      cgst: expenses.cgst,
      sgst: expenses.sgst,
      orderId: expenses.orderId,
    });
  }

  findById(id: number): Promise<Expenses | null> {
    return this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  async find(props: IFindProps): Promise<Expenses[]> {
    const { userID, expensesFilterDTO, limitOffsetDTO, startEndDateDTO } =
      props;

    const queryBuilder = this.repository.createQueryBuilder("expenses");

    queryBuilder.where("expenses.userId = : userID", { userID });

    if (expensesFilterDTO.source) {
      queryBuilder.andWhere("expenses.source = : source", {
        source: `${expensesFilterDTO.source}`,
      });
    }

    if (expensesFilterDTO.bankId) {
      queryBuilder.andWhere("expenses.bankId = : bankId", {
        bankId: `${expensesFilterDTO.bankId}`,
      });
    }

    if (expensesFilterDTO.productId) {
      queryBuilder.andWhere("expenses.productId = : productId", {
        productId: `${expensesFilterDTO.productId}`,
      });
    }

    if (expensesFilterDTO.expenseDate) {
      queryBuilder.andWhere("expenses.expenseDate = : expenseDate", {
        expenseDate: `${expensesFilterDTO.expenseDate}`,
      });
    }

    if (limitOffsetDTO) {
      queryBuilder.take(limitOffsetDTO.limit).skip(limitOffsetDTO.offset);
    }

    return await queryBuilder.getMany();
  }
}

export const makeExpensesRepository = (): ExpensesRepository => {
  return new ExpensesRepository();
};
