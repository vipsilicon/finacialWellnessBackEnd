import { User } from "../../../user/user-entity";
import { UserSession } from "../../../userSession/user-session-entity";
import { UserInterface } from "../../../user/models/interface/user-response.interface";

export interface IAuthDataResponse {
    user: UserInterface
    userSession: UserSession
}