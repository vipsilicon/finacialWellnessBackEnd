import { IsDate, IsEnum, IsNumber, IsOptional } from "class-validator";
import { SourceTypeEnum } from "../enums/source-type.enum";
import validateDTO from "../../../../shared/utils/common/validate-dto";

export class ExpensesFilterDTO {

    @IsOptional()
    @IsDate()
    expenseDate: Date

    @IsOptional()
    @IsEnum(SourceTypeEnum)
    source: SourceTypeEnum

    @IsOptional()
    @IsNumber()
    bankId: number

    @IsOptional()
    @IsNumber()
    productId: number

    @IsOptional()
    @IsNumber()
    orderId: number

    constructor(props: ExpensesFilterDTO){
        this.expenseDate = props.expenseDate
        this.source = props.source
        this.bankId = props.bankId
        this.productId = props.productId
        this.orderId = props.orderId
    }

    async validate(){
        await validateDTO(this);
    }
}