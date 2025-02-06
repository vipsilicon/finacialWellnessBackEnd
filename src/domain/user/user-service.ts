import { User } from "./user-entity";
import { IUserRepository, makeUserRepository } from "./user-repository";
import { UserDTO } from "./models/dtos/user.dto";
import { IHMACAdapter, makeHMACAdapter } from "../../infra/cryptography/hmac/hmac-adapter";
import { HttpException } from "../../shared/utils/http/http-exception"; 
import { HttpStatus } from "../../shared/models/enums/http-status";
import { UserInterface } from "./models/interface/user-response.interface";

interface ICreateProps {
    userDTO: UserDTO
}

export interface IUserService {
    create(props:ICreateProps): Promise<UserInterface>
}

export class UserService implements IUserService {

    constructor(
        private userRepository: IUserRepository,
        private hmacAdapter: IHMACAdapter
    ){}

    async create(props:ICreateProps): Promise<UserInterface>{

        const { userDTO } = props;

        const existUserEmail = await this.userRepository.findByEmail(userDTO.email);

        if(existUserEmail){
            throw new HttpException("Email ID already exist", HttpStatus.NOT_ACCEPTABLE)
        }

        const existUserPhoneNumber = await this.userRepository.findByPhoneNumber(userDTO.phoneNumber);

        if(existUserPhoneNumber){
            throw new HttpException("Phone number already exist", HttpStatus.CONFLICT)
        }

        const passwordSalt = this.hmacAdapter.generatePasswordSalt();
        const passwordHash = this.hmacAdapter.hash(passwordSalt, userDTO.password); 

        const userToCreate = User.fromCreate({
            userDTO,
            passwordSalt,
            passwordHash
        });

        const user = await this.userRepository.create(userToCreate);

        let userResponse: UserInterface = {} as UserInterface;
        userResponse = Object.assign(userResponse, user);

        return userResponse;
    }
}

export const makeUserService = (): IUserService => {
    return new UserService(
        makeUserRepository(),
        makeHMACAdapter()
    );
}