import { IsNotEmpty, IsNumber, IsPositive, Max } from "class-validator";
import validateDTO from "../../utils/common/validate-dto";


export class LimitOffsetDTO {

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Max(999999)
    limit: number


    @IsNotEmpty()
    @IsNumber()
    offset: number

    constructor(props: LimitOffsetDTO){
        this.limit = parseInt(props?.limit?.toString()) || 10;
        this.offset = parseInt(props?.offset?.toString()) || 0;
    }

    async validate(){
        await validateDTO(this);
    }
}