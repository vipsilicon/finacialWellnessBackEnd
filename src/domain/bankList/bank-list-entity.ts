import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { BankListDTO } from "./models/dtos/bank-list.dto";
import { Expenses } from "../expenses/expenses-entity";

interface IFromCreateProps {
  bankListDTO: BankListDTO;
}

interface IFromUpdateProps {
  bankList: BankList;
  bankListDTO: BankListDTO;
}

@Entity({ name: "bank_list" })
// @Unique([])
export class BankList {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  bankName!: string;

  @Column({ type: "varchar", length: 100 })
  bankSymbol!: string;

  @Column({ type: "longtext", nullable: true })
  icon!: string | null;

  @OneToMany(() => Expenses, (expenses) => expenses.bank)
  expenses!: Expenses[];

  static fromCreate(props: IFromCreateProps): BankList {
    const { bankListDTO } = props;
    const bankList = new BankList();
    return this.getBankListByDTO(bankList, bankListDTO);
  }

  static fromUpdate(props: IFromUpdateProps): BankList {
    const { bankList, bankListDTO } = props;
    return this.getBankListByDTO(bankList, bankListDTO);
  }

  static getBankListByDTO(bankList: BankList, dto: BankListDTO): BankList {
    return Object.assign(bankList, dto);
  }
}
