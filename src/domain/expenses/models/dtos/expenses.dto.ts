import { IsString, IsNumber, IsNotEmpty, IsOptional, IsDateString, IsEnum, IsDate } from 'class-validator';
import validateDTO from '../../../../shared/utils/common/validate-dto';
import { SourceTypeEnum } from '../enums/source-type.enum';

export class ExpensesDTO {

    @IsNotEmpty()
    @IsDate()
    expenseDate?: Date

    @IsNotEmpty()
    @IsNumber()
    amount?: number

    @IsOptional()
    @IsString()
    description?: string | null

    @IsOptional()
    @IsEnum(SourceTypeEnum)
    source?: SourceTypeEnum | null

    // @IsOptional()
    // @IsNumber()
    // userId?: number

    @IsNotEmpty()
    @IsNumber()
    bankId?: number

    @IsNotEmpty()
    @IsNumber()
    productId?: number

    @IsNotEmpty()
    @IsNumber()
    transactionId?: number

    @IsNotEmpty()
    @IsNumber()
    mrp?: number

    @IsNotEmpty()
    @IsNumber()
    cgst?: number

    @IsNotEmpty()
    @IsNumber()
    sgst?: number

    constructor(props: ExpensesDTO){
        this.expenseDate = props?.expenseDate
        this.amount = props?.amount
        this.description = props?.description || null
        this.source = props?.source || null
        // this.userId = props?.userId
        this.bankId = props?.bankId
        this.productId = props?.productId
        this.transactionId = props?.transactionId
        this.mrp = props?.mrp
        this.cgst = props?.cgst
        this.sgst = props?.sgst
    }

    async validate(){
        await validateDTO(this)
    }
}