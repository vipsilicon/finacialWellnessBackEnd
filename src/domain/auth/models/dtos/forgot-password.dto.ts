import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import validateDTO from "../../../../shared/utils/common/validate-dto";

export class ForgotPasswordDTO {

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string

    constructor(props: ForgotPasswordDTO){
        this.email = props?.email
    }

    async validate(){
        await validateDTO(this);
    }
}