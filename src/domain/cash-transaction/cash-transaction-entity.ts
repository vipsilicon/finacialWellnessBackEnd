import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TransactionTypeEnum } from "./models/enums/transaction-type.enum";
import { Product } from "../products/products-entity";
import { CashTransactionDTO } from "./models/dtos/cash-transaction.dto";
import { User } from "../user/user-entity";

interface IFromCreateProps {
  cashTransactionDTO: CashTransactionDTO;
  userId: number;
}

interface IFromUpdateProps {
  cashTransactionDTO: CashTransactionDTO;
  userId: number;
}

@Entity({ name: "cash_transaction" })
export class CashTransaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date", nullable: false })
  transactionDate!: Date;

  @Column({ type: "date", name: "expenseDate", nullable: false })
  amount!: number;

  @Column({ nullable: true })
  description!: string;

  @Column({ type: "enum", nullable: false, enum: TransactionTypeEnum })
  transactionType!: TransactionTypeEnum;

  @Column({ nullable: false })
  productId!: number;

  @Column({ nullable: false })
  userId!: number;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: "productId", referencedColumnName: "id" })
  product!: Product[];

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user!: User[];

  static fromCreate(props: IFromCreateProps) {
    const { cashTransactionDTO, userId } = props;

    const cashTransaction = new CashTransaction();

    cashTransaction.transactionDate = cashTransactionDTO.transactionDate;
    cashTransaction.transactionType = cashTransactionDTO.transactionType;
    cashTransaction.description = cashTransactionDTO.description || "";
    cashTransaction.amount = cashTransactionDTO.amount;
    cashTransaction.productId = cashTransactionDTO.productId;
    cashTransaction.userId = userId;

    return cashTransaction;
  }

  static fromUpdate(props: IFromUpdateProps) {
    const { cashTransactionDTO, userId } = props;

    const cashTransaction = new CashTransaction();

    cashTransaction.transactionDate = cashTransactionDTO.transactionDate;
    cashTransaction.transactionType = cashTransactionDTO.transactionType;
    cashTransaction.description = cashTransactionDTO.description || "";
    cashTransaction.amount = cashTransactionDTO.amount;
    cashTransaction.productId = cashTransactionDTO.productId;
    cashTransaction.userId = userId;

    return cashTransaction;
  }
}
