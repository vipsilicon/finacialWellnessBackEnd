import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { TransactionTypeEnum } from "../enums/transaction-type.enum";
import validateDTO from "../../../../shared/utils/common/validate-dto";

export class CashTransactionDTO {
  @IsNotEmpty()
  @IsDate()
  transactionDate: Date;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(TransactionTypeEnum)
  transactionType: TransactionTypeEnum;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  constructor(props: CashTransactionDTO) {
    this.transactionDate = props.transactionDate;
    this.transactionType = props.transactionType;
    this.amount = props.amount;
    this.description = props.description;
    this.productId = props.productId;
    this.userId = props.userId;
  }

  async validate() {
    await validateDTO(this);
  }
}
