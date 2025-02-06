import { HttpStatus } from "../../../shared/models/enums/http-status";
import { HttpException } from "../../../shared/utils/http/http-exception";
import { UserSession } from "../user-session-entity";
import { IUserSessionRepository, makeuserSessionRepository } from "../user-session-repository";

interface IProps {
    id: number
    userID: number
}

export interface IFindSessionUsecase {
    handle(props: IProps): Promise<UserSession>
}

export class FindSessionUseCase implements IFindSessionUsecase {

    constructor(
        private sessionRepository: IUserSessionRepository
    ){}

    async handle(props: IProps): Promise<UserSession>{

        const { userID, id } = props;

        const userSession = await this.sessionRepository.findById(id);

        if(!userSession || userSession.userID !== userID){
            throw new HttpException("Session not found", HttpStatus.UNAUTHORIZED);
        }

        return userSession;
    }
}

export const makeFindSessionUseCase = (): IFindSessionUsecase => {

    return new FindSessionUseCase(
        makeuserSessionRepository()
    )
}