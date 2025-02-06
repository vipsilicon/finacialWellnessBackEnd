import { SqlDataSource } from "../../infra/create-conn";
import { User} from "./user-entity";

export interface IUserRepository {
    create(user: User): Promise<User>
    findByEmail(email: string): Promise<User | null>
    findById(id: number): Promise<User | null>
    findByPhoneNumber(phoneNumber: number): Promise<User | null>
}

export class UserRepository implements IUserRepository {

    private get repository(){
        return SqlDataSource.getRepository(User)
    }

    create(user: User): Promise<User>{
        return this.repository.save(user);
    }

    findByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({
            where: {
                email
            }
        })
    }

    findById(id: number): Promise<User | null> {
        return this.repository.findOne({
            where: {
                id
            }
        })
    }

    findByPhoneNumber(phoneNumber: number): Promise<User | null>{
        return this.repository.findOne({
            where: {
                phoneNumber
            }
        })
    }
}

export const makeUserRepository = (): IUserRepository => {
    return new UserRepository();
}