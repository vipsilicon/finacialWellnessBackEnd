import { User } from "../../../user/user-entity";
import { UserSession } from "../../../userSession/user-session-entity";
import { UserInterface } from "../../../user/models/interface/user-response.interface";

export interface IAuthResponse {
    user: UserInterface
    userSession: UserSession
    accessToken: {
        token: string
        expiresIn: number
    }
    refreshToken: {
        token: string
        expiresin: number
    }
}