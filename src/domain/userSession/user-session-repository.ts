import { SqlDataSource } from "../../infra/create-conn";
import { UserSession } from "./user-session-entity"; 

export interface IUserSessionRepository {
    create(session: UserSession): Promise<UserSession>
    findById(id: number): Promise<UserSession | null>
}

export class UserSessionRepository implements IUserSessionRepository {

    private get repository(){
        return SqlDataSource.getRepository(UserSession);
    }

    create(session: UserSession): Promise<UserSession>{
        return this.repository.save(session);
    }

    findById(id: number): Promise<UserSession | null> {
        return this.repository.createQueryBuilder("userSession")
            .where("userSession.id = :id", { id })
            .getOne()
    }
}

export const makeuserSessionRepository = (): IUserSessionRepository => {
    return new UserSessionRepository();
}