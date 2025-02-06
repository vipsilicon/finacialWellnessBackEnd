import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../user/user-entity";
import { BankList } from "../bankList/bank-list-entity";
import { SourceTypeEnum } from "./models/enums/source-type.enum";
import { ExpensesDTO } from "./models/dtos/expenses.dto";
import { Product } from "../products/products-entity";

interface IFromCreateProps {
  expensesDTO: ExpensesDTO;
  user: User;
  orderId: string;
}

interface IFromUpdateProps {
  expensesDTO: ExpensesDTO;
  user: User;
  orderId: string;
}

@Entity({ name: "expenses" })
export class Expenses {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date", name: "expenseDate", nullable: false })
  expenseDate!: Date;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  amount!: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  description!: string;

  @Column({ type: "enum", enum: SourceTypeEnum, nullable: false })
  source!: SourceTypeEnum | null;

  @Column({ nullable: false })
  userId!: number;

  @Column({ nullable: false })
  bankId!: number;

  @Column({ nullable: false })
  transactionId!: number;

  @Column({ nullable: false })
  productId!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  mrp!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  cgst!: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  sgst!: number;

  @Column({ nullable: false })
  orderId!: string;

  @ManyToOne(
    () => BankList,
    (bank) => {
      bank.expenses;
    }
  )
  @JoinColumn({ name: "bankId" })
  bank!: BankList;

  @ManyToOne(
    () => User,
    (user) => {
      user.expenses;
    }
  )
  @JoinColumn({ name: "userId" })
  user!: User;

  @ManyToOne(
    () => Product,
    (product) => {
      product.expenses;
    }
  )
  @JoinColumn({ name: "productId" })
  product!: Product;

  static fromCreate(props: IFromCreateProps): Expenses {
    const { expensesDTO, user, orderId } = props;

    const expenses = new Expenses();
    expenses.userId = user.id;
    expenses.expenseDate = expensesDTO.expenseDate ?? new Date();
    expenses.amount = expensesDTO.amount ?? 0;
    expenses.description = expensesDTO.description ?? "";
    expenses.source = expensesDTO.source ?? SourceTypeEnum.CASH;
    expenses.bankId = expensesDTO.bankId ?? 0;
    expenses.transactionId = expensesDTO.transactionId ?? 0;
    expenses.productId = expensesDTO.productId ?? 0;
    expenses.mrp = expensesDTO.mrp ?? 0;
    expenses.cgst = expensesDTO.cgst ?? 0;
    expenses.sgst = expensesDTO.sgst ?? 0;
    expenses.orderId = orderId;

    return expenses;
  }

  static fromUpdate(props: IFromUpdateProps): Expenses {
    const { expensesDTO, user, orderId } = props;

    const expenses = new Expenses();
    expenses.userId = user.id;
    expenses.expenseDate = expensesDTO.expenseDate ?? new Date();
    expenses.amount = expensesDTO.amount ?? 0;
    expenses.description = expensesDTO.description ?? "";
    expenses.source = expensesDTO.source ?? SourceTypeEnum.CASH;
    expenses.bankId = expensesDTO.bankId ?? 0;
    expenses.transactionId = expensesDTO.transactionId ?? 0;
    expenses.productId = expensesDTO.productId ?? 0;
    expenses.mrp = expensesDTO.mrp ?? 0;
    expenses.cgst = expensesDTO.cgst ?? 0;
    expenses.sgst = expensesDTO.sgst ?? 0;
    expenses.orderId = orderId;

    return expenses;
  }
}
