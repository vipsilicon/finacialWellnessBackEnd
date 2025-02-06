import { IsNotEmpty, IsString } from "class-validator";
import validateDTO from "../../../../shared/utils/common/validate-dto";

export class ResetPasswordDTO {

    @IsNotEmpty()
    @IsString()
    token: string

    @IsNotEmpty()
    @IsString()
    password: string

    constructor(props: ResetPasswordDTO){
        this.token = props?.token
        this.password = props?.password
    }

    async validate(){
        await validateDTO(this); 
    }
}