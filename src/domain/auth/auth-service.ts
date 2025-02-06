import { LoginDTO } from "./models/dtos/login.dto";
import { IUserRepository, makeUserRepository } from "../user/user-repository";
import { HttpException } from "../../shared/utils/http/http-exception";
import { HttpStatus } from "../../shared/models/enums/http-status";
import { User } from "../user/user-entity";
import { IHMACAdapter, makeHMACAdapter } from "../../infra/cryptography/hmac/hmac-adapter";
import { UserInterface } from "../user/models/interface/user-response.interface";
import { AccountStatusEnum } from "../user/models/enums/account-status.enum";
import { UserSessionMetadata } from "../userSession/classes/user-session-metadata";
import { ICreateSessionUseCase, makeCreateSessionUseCase } from "../userSession/useCases/create-session-usecase";
import { IAuthResponse } from "./models/responses/auth-response";
import { UserSession } from "../userSession/user-session-entity";
import { IAuthDataResponse,  } from "./models/responses/auth-data-response";
import { IJwtAdapter } from "../../infra/cryptography/jwt/jwt-adapter";
import { makeLoginJwtAdapter, makeRefreshTokenJwtAdapter } from "../../infra/cryptography/jwt/jwt-factory";
import { jwtConfig } from "../../config/jwt-config";

interface ILoginProps {
    loginDTO: LoginDTO,
    metadata: UserSessionMetadata
}

interface IGetAuthResponseProps {
    user: UserInterface
    userSession: UserSession
}

export interface IAuthService {
    login(props: ILoginProps): Promise<IAuthResponse>
}

export class AuthService implements IAuthService {

    constructor(
        private userRepository: IUserRepository,
        private hmacAdapter: IHMACAdapter,
        private createSessionUseCase: ICreateSessionUseCase,
        private loginJwtAdapter: IJwtAdapter<IAuthDataResponse>,
        private refreshTokenJwtAdapter: IJwtAdapter<IAuthDataResponse>
    ){}

    async login(props: ILoginProps): Promise<IAuthResponse>{

        const { loginDTO, metadata } = props;

        let user;

        if(loginDTO.email){
            user = await this.userRepository.findByEmail(loginDTO.email);     
        }
        else if(loginDTO.phoneNumber){
            user = await this.userRepository.findByPhoneNumber(loginDTO.phoneNumber);
        }

        if(!user){
            throw new HttpException("Invalid email, phone number or password", HttpStatus.FORBIDDEN);
        }

        const passwordHash = this.hmacAdapter.hash(user.passwordSalt, loginDTO.password);

        const userSession = await this.createSessionUseCase.handle({
            user,
            metadata
        })

        if(passwordHash == user.passwordHash){
            const userResponse = User.forResponse({user}) as UserInterface

            return this.getAuthResponse({
                user: userResponse,
                userSession: userSession
            })
        }
        else {
            throw new HttpException("Invalid email, phone number or password", HttpStatus.FORBIDDEN);
        }

    }

    private getAuthResponse(props: IGetAuthResponseProps): IAuthResponse {

        const { user, userSession } = props;

        const data: IAuthDataResponse = {
            user,
            userSession
        }

        const accessToken = this.loginJwtAdapter.sign(data);
        const refreshToken = this.refreshTokenJwtAdapter.sign(data);

        return {
            user,
            userSession,
            accessToken: {
                token: accessToken,
                expiresIn: jwtConfig.accessToken.expiresIn
            },
            refreshToken: {
                token: refreshToken,
                expiresin: jwtConfig.refreshToken.expiresIn
            }
        }
    }
}

export const makeAuthService = (): IAuthService => {
    return new AuthService(
        makeUserRepository(),
        makeHMACAdapter(),
        makeCreateSessionUseCase(),
        makeLoginJwtAdapter(),
        makeRefreshTokenJwtAdapter()
    )
}