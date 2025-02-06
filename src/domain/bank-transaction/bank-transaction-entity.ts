import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TransactionTypeEnum } from "./models/enums/transaction-type.enum";
import { BankList } from "../bankList/bank-list-entity";
import { Product } from "../products/products-entity";
import { User } from "../user/user-entity";
import { BankTransactionDTO } from "./models/dtos/bank-transaction.dto";

interface IFromCreateProps {
  userID: number;
  bankTransactionDTO: BankTransactionDTO;
}

interface IFromUpdateProps {
  userID: number;
  bankTransactionDTO: BankTransactionDTO;
}

@Entity({ name: "bank_transaction" })
export class BankTransaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date", name: "expenseDate", nullable: false })
  transactionDate!: Date;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  amount!: number;

  @Column()
  description!: string;

  @Column({ type: "enum", enum: TransactionTypeEnum, nullable: false })
  transactionType!: TransactionTypeEnum;

  @Column({ nullable: false })
  userId!: number;

  @Column({ nullable: false })
  bankId!: number;

  @Column()
  productId!: number;

  @ManyToOne(() => BankList, (bankList) => bankList.id)
  @JoinColumn({ name: "bankListId", referencedColumnName: "id" })
  bankList!: BankList[];

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: "productId", referencedColumnName: "id" })
  product!: Product[];

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user!: User[];

  static fromCreate(props: IFromCreateProps): BankTransaction {
    const { userID, bankTransactionDTO } = props;

    const bankTransaction = new BankTransaction();

    bankTransaction.transactionDate = bankTransactionDTO.transactionDate;
    bankTransaction.amount = bankTransactionDTO.amount;
    bankTransaction.transactionType = bankTransactionDTO.transactionType;
    bankTransaction.bankId = bankTransactionDTO.bankId;
    bankTransaction.productId = bankTransactionDTO.productId;
    bankTransaction.userId = userID;

    return bankTransaction;
  }

  static fromUpdate(props: IFromUpdateProps): BankTransaction {
    const { userID, bankTransactionDTO } = props;

    const bankTransaction = new BankTransaction();

    bankTransaction.transactionDate = bankTransactionDTO.transactionDate;
    bankTransaction.amount = bankTransactionDTO.amount;
    bankTransaction.transactionType = bankTransactionDTO.transactionType;
    bankTransaction.bankId = bankTransactionDTO.bankId;
    bankTransaction.productId = bankTransactionDTO.productId;
    bankTransaction.userId = userID;

    return bankTransaction;
  }
}
