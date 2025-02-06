import { IBankListRepository, makeBankListRepository } from './bank-list-repository';
import { LimitOffsetDTO } from '../../shared/models/dtos/limit-offset.dto';
import { StartEndDateDTO } from '../../shared/models/dtos/start-end-date.dto';
import { HttpException } from '../../shared/utils/http/http-exception';
import { HttpStatus } from '../../shared/models/enums/http-status';
import { BankList } from './bank-list-entity';
import { BankListDTO } from './models/dtos/bank-list.dto';


interface ICreateProps {
    bankListDTO: BankListDTO
} 

export interface IBankListService {
    create(props: ICreateProps): Promise<BankList>
}

export class BankListService implements IBankListService {

    constructor(
        private bankListRepository: IBankListRepository
    ){}

    async create(props: ICreateProps): Promise<BankList> {
        
        const { bankListDTO } = props;
    
        const bankList = BankList.fromCreate({
            bankListDTO
        });

        return this.bankListRepository.create(bankList);
    }

}

export const makeBankListService = (): IBankListService => {
    return new BankListService(
        makeBankListRepository()
    );
}