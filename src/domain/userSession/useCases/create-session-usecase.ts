import { User } from "../../user/user-entity";
import { UserSessionMetadata } from "../classes/user-session-metadata";
import { UserSession } from "../user-session-entity";
import { IUserSessionRepository, makeuserSessionRepository } from "../user-session-repository";

interface IProps {
    user: User
    metadata?: UserSessionMetadata
}

export interface ICreateSessionUseCase {
    handle(props: IProps): Promise<UserSession>
}

export class CreateSessionUseCase implements ICreateSessionUseCase {

    constructor(
        private userSessionRepository: IUserSessionRepository
    ){}

    async handle(props: IProps): Promise<UserSession>{

        const { user, metadata } = props;
        
        const sessionToCreate = UserSession.fromCreate({
            user,
            metadata
        });

        const userSession = await this.userSessionRepository.create(sessionToCreate);

        return userSession;
    }
}

export const makeCreateSessionUseCase = (): ICreateSessionUseCase => {
    
    return new CreateSessionUseCase(
        makeuserSessionRepository()
    )
}