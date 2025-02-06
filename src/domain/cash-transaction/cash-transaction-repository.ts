import { SqlDataSource } from "../../infra/create-conn";
import { LimitOffsetDTO } from "../../shared/models/dtos/limit-offset.dto";
import { StartEndDateDTO } from "../../shared/models/dtos/start-end-date.dto";
import { User } from "../user/user-entity";
import { CashTransaction } from "./cash-transaction-entity";

interface IFindProps {
  limitOffsetDTO: LimitOffsetDTO;
  startEndDateDTO: StartEndDateDTO;
  user: User;
}

export interface ICashTransactionRepository {
  create(cashTransaction: CashTransaction): Promise<CashTransaction>;
  update(id: number, cashTransaction: CashTransaction): Promise<void>;
  findById(id: number): Promise<CashTransaction | null>;
  find(props: IFindProps): Promise<CashTransaction[]>;
}

export class CashTransactionRepository implements ICashTransactionRepository {
  private get repository() {
    return SqlDataSource.getRepository(CashTransaction);
  }

  async create(cashTransaction: CashTransaction): Promise<CashTransaction> {
    return await this.repository.save(cashTransaction);
  }

  async update(id: number, cashTransaction: CashTransaction): Promise<void> {
    await this.repository.update(id, {
      transactionDate: cashTransaction.transactionDate,
      transactionType: cashTransaction.transactionType,
      amount: cashTransaction.amount,
      description: cashTransaction.description,
      productId: cashTransaction.productId,
      userId: cashTransaction.userId,
    });
  }

  findById(id: number): Promise<CashTransaction | null> {
    return this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  find(props: IFindProps): Promise<CashTransaction[]> {
    return this.repository
      .createQueryBuilder("cashTransaction")
      .where("cashTransaction.userId = :userId", { userId: props.user.id })
      .limit(props.limitOffsetDTO.limit)
      .offset(props.limitOffsetDTO.offset)
      .orderBy("cashTransaction.id", "DESC")
      .getMany();
  }
}

export const makeCashTransactionRepository = (): ICashTransactionRepository => {
  return new CashTransactionRepository();
};
