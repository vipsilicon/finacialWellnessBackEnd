import { SqlDataSource } from "../../infra/create-conn";
import { BankTransaction } from "./bank-transaction-entity";
import { IFindProps } from "./bank-transaction-service";

export interface IBankTransactionRepository {
  create(bankTransaction: BankTransaction): Promise<BankTransaction>;
  update(id: number, bankTransaction: BankTransaction): Promise<void>;
  findById(id: number): Promise<BankTransaction | any>;
  find(props: IFindProps): Promise<BankTransaction[]>;
}

export class BankTransactionRepository implements IBankTransactionRepository {
  private get repository() {
    return SqlDataSource.getRepository("bank_transaction");
  }

  create(bankTransaction: BankTransaction): Promise<BankTransaction> {
    return this.repository.save(bankTransaction);
  }

  async update(id: number, bankTransaction: BankTransaction): Promise<void> {
    await this.repository.update(id, {
      transactionDate: bankTransaction.transactionDate,
      amount: bankTransaction.amount,
      description: bankTransaction.description,
      transactionType: bankTransaction.transactionType,
      userId: bankTransaction.userId,
      bankId: bankTransaction.bankId,
      productId: bankTransaction.productId,
    });
  }

  findById(id: number): Promise<BankTransaction | any> {
    return this.repository.findOne({
      where: {
        id: id,
      },
    });
  }

  async find(props: IFindProps): Promise<BankTransaction[]> {
    const { userID, bankTransactionDTO, limitOffsetDTO, startEndDateDTO } =
      props;

    const queryBuilder = this.repository.createQueryBuilder("bank_transaction");

    queryBuilder.where("bank_transaction.userId: = userID", { userID });

    if (bankTransactionDTO.amount) {
      queryBuilder.andWhere("bank_transaction.amount: =amount", {
        amount: `${bankTransactionDTO.amount}`,
      });
    }

    if (bankTransactionDTO.bankId) {
      queryBuilder.andWhere("bank_transaction.bankId: =bankID", {
        bankID: `${bankTransactionDTO.bankId}`,
      });
    }

    if (bankTransactionDTO.productId) {
      queryBuilder.andWhere("bank_transaction.productId: =productID", {
        productID: `${bankTransactionDTO.productId}`,
      });
    }

    if (bankTransactionDTO.transactionDate) {
      queryBuilder.andWhere(
        "bank_transaction.transactionDate: =transactionDate",
        { transactionDate: `${bankTransactionDTO.transactionDate}` }
      );
    }

    if (bankTransactionDTO.transactionDate) {
      queryBuilder.andWhere(
        "bank_transaction.transactionDate: =transactionDate",
        { transactionDate: `${bankTransactionDTO.transactionDate}` }
      );
    }

    if (limitOffsetDTO) {
      queryBuilder.take(limitOffsetDTO.limit).skip(limitOffsetDTO.offset);
    }

    return (await queryBuilder.getMany()) as BankTransaction[];
  }
}

export const makeBankTransactionRepository = (): IBankTransactionRepository => {
  return new BankTransactionRepository();
};
