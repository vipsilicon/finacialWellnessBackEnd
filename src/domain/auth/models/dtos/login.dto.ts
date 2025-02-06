import validateDTO from "../../../../shared/utils/common/validate-dto";
import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class LoginDTO {

    @IsEmail()
    @IsString()
    @IsOptional()
    email: string

    @IsNumber()
    @IsOptional()
    phoneNumber: number

    @IsString()
    @IsNotEmpty()
    password: string

    constructor(props: LoginDTO){
        this.email = props?.email 
        this.password = props?.password
        this.phoneNumber = props?.phoneNumber 
    }

    async validate(){
        await validateDTO(this)
    }
}