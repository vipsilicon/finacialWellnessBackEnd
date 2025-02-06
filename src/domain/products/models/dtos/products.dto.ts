import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { UnitTypeEnum } from "../enums/unit-type.enum";
import validateDTO from "../../../../shared/utils/common/validate-dto";


export class ProductsDTO {

    @IsNotEmpty()
    @IsString()
    name: string
    
    @IsNotEmpty()
    @IsString()
    company: string

    @IsNotEmpty()
    @IsNumber()
    quantity: number

    @IsNotEmpty()
    @IsEnum(UnitTypeEnum)
    unit: UnitTypeEnum

    @IsOptional()
    @IsNumber()
    description: string

    @IsNotEmpty()
    @IsString()
    category: string

    @IsNotEmpty()
    @IsString()
    subCategory: string

    constructor(props: ProductsDTO){
        this.name = props.name
        this.company = props.company
        this.quantity = props.quantity
        this.unit = props.unit
        this.description = props?.description || ''
        this.category = props.category
        this.subCategory = props.subCategory 
    }

    async validate(){
        await validateDTO(this);
    }
}