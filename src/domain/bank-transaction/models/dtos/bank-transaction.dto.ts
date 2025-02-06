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

export class BankTransactionDTO {
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
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  bankId: number;

  constructor(props: BankTransactionDTO) {
    (this.transactionDate = props.transactionDate),
      (this.amount = props.amount),
      (this.description = props.description),
      (this.transactionType = props.transactionType);
    (this.userId = props.userId),
      (this.productId = props.productId),
      (this.bankId = props.bankId);
  }

  async validate() {
    await validateDTO(this);
  }
}
