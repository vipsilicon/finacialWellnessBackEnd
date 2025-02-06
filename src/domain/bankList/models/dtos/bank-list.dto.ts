import { IsOptional, IsString, IsNotEmpty} from 'class-validator';
import validateDTO from '../../../../shared/utils/common/validate-dto';

export class BankListDTO {

    @IsNotEmpty()
    @IsString()
    bankName: string

    @IsNotEmpty()
    @IsString()
    bankSymbol: string

    @IsOptional()
    @IsString()
    icon: string | null

    constructor(props: BankListDTO){
        this.bankName = props?.bankName
        this.bankSymbol = props?.bankSymbol
        this.icon = props?.icon 
    }

    async validate(){
        await validateDTO(this)
    }

}