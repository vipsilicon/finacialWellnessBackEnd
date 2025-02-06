import { IsOptional } from "class-validator";
import validateDTO from "../../utils/common/validate-dto";


export class StartEndDateDTO {

    @IsOptional()
    startDate: Date

    @IsOptional()
    endDate: Date

    constructor(props: StartEndDateDTO){
        this.startDate = props?.startDate
        this.endDate = props?.endDate
    }

    async validate(){
        await validateDTO(this);
    }
}