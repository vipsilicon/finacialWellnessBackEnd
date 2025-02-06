import { SqlDataSource } from "../../infra/create-conn";
import { BankList } from "./bank-list-entity";

export interface IBankListRepository {
    create(bankList: BankList): Promise<BankList>
    findById(id: number): Promise<BankList | null>
    update(id: number, bankList: BankList): Promise<void>
}

export class BankListRepository implements IBankListRepository {

    private get repository(){
        return SqlDataSource.getRepository(BankList);
    }

    create(bankList: BankList): Promise<BankList>{
        return this.repository.save(bankList);
    }

    findById(id: number): Promise<BankList | null> {
        return this.repository.findOne({
            where: {
                id
            }
        })
    }

    async update(id: number, bankList: BankList): Promise<void> {
        await this.repository.update(id, {
            bankName: bankList.bankName,
            bankSymbol: bankList.bankSymbol,
            icon: bankList.icon
        })
    }
}

export const makeBankListRepository = (): BankListRepository => {
    return new BankListRepository()
}