import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean} from "class-validator";
import validateDTO from "../../../../shared/utils/common/validate-dto";
import { Exclude } from "class-transformer";

export class UserDTO {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    firstName: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    middleName: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    lastName: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    email: string

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    phoneNumber: number

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    password: string

    constructor(props: UserDTO){
        this.firstName = props.firstName
        this.middleName = props.middleName
        this.lastName = props.lastName
        this.email = props.email
        this.phoneNumber = props.phoneNumber
        this.password = props.password
    }

    async validate(){
        await validateDTO(this);
    }
}
