import { Request, Response } from "express";
import { IUserService, makeUserService } from "./user-service";
import { User } from "./user-entity";
import { UserDTO } from "./models/dtos/user.dto";
import { UserInterface } from "./models/interface/user-response.interface";

export class UserController {

    constructor(
        private userService: IUserService
    ){}

    async create(req: Request, res: Response): Promise<Response<UserInterface>>{
        const userDTO = new UserDTO(req.body);
        await userDTO.validate();

        const response = await this.userService.create({
            userDTO
        })

        return res.json(response);
    }

}

export const makeUserController = () => {
    return new UserController(
        makeUserService()
    )
}