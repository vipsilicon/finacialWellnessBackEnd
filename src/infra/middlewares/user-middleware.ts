import { Request, Response, NextFunction } from "express";
import { IAuthDataResponse } from "../../domain/auth/models/responses/auth-data-response";
import { makeUserRepository } from "../../domain/user/user-repository";
import { HttpException } from "../../shared/utils/http/http-exception";
import { HttpStatus } from "../../shared/models/enums/http-status";
import { makeLoginJwtAdapter } from "../cryptography/jwt/jwt-factory";
import { makeFindSessionUseCase } from "../../domain/userSession/useCases/find-session-usecase";

interface CustomRequest extends Request {
    user?: any;
    session?: any;
}

export async function getAuthUser(req: CustomRequest): Promise<void> {
    const authHeader = req.headers.authorization;
    const jwtAdapter = makeLoginJwtAdapter();
    const userRepository = makeUserRepository();

    if (!authHeader) {
        throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }

    const arrayAuth = authHeader.split(' ');
    if (arrayAuth.length !== 2 || arrayAuth[0] !== 'Bearer') {
        throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }

    const token = arrayAuth[1];

    let decodedData: IAuthDataResponse | undefined;

    try {
        decodedData = jwtAdapter.verify(token);
    } catch (_) {
        throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }

    if (!decodedData?.user) {
        throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }

    const user = await userRepository.findById(decodedData.user.id);

    if (!user) {
        throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }

    const findSessionUseCase = makeFindSessionUseCase();

    const session = await findSessionUseCase.handle({
        id: decodedData.userSession?.id,
        userID: decodedData.user.id,
    });

    req.user = user;
    req.session = session;
}

export async function userMiddleware(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    await getAuthUser(req);
    next();
}
