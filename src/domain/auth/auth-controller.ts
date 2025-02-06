import { Request, Response } from "express";
import { IAuthService, makeAuthService } from "./auth-service";
import { LoginDTO } from "./models/dtos/login.dto";
import { UserSessionMetadata } from "../userSession/classes/user-session-metadata";

export class AuthController {

    constructor(
        private authService: IAuthService
    ){}

    async login(req: Request, res: Response): Promise<Response<any>>{

        const login = req.body.login;
        
        const loginDTO = new LoginDTO(login);
        await loginDTO.validate();

        const response = await this.authService.login({
            loginDTO,
            metadata: UserSessionMetadata.fromRequest(req)
        })

        return res.json(response);

    }
}

export const makeAuthController = () => {
    return new AuthController(
        makeAuthService()
    )
}