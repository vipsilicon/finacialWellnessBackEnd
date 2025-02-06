import { IsOptional, IsString } from "class-validator";
import validateDTO from "../../../../shared/utils/common/validate-dto";


export class ProductsFilterDTO {

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    company: string

    @IsOptional()
    @IsString()
    category: string

    @IsOptional()
    @IsString()
    subCategory: string

    constructor(props: ProductsFilterDTO){

        this.name = props.name
        this.company = props.company
        this.category = props.category
        this.subCategory = props.subCategory
    }

    async validate(){
        await validateDTO(this);
    }
}