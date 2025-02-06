import { Request, Response, NextFunction } from "express";
import { IAuthDataResponse } from "../../domain/auth/models/responses/auth-data-response";
import { makeFindSessionUseCase } from "../../domain/userSession/useCases/find-session-usecase";
import { makeUserRepository } from "../../domain/user/user-repository";
import { HttpStatus } from "../../shared/models/enums/http-status";
import { HttpException } from "../../shared/utils/http/http-exception";
import { makeRefreshTokenJwtAdapter } from "../cryptography/jwt/jwt-factory";

interface CustomRequest extends Request {
    user?: any;
    session?: any;
}

export async function refreshTokenMiddleware(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    const { refreshToken } = req.body;
    const jwtAdapter = makeRefreshTokenJwtAdapter();
    const userRepository = makeUserRepository();

    if (!refreshToken) {
        throw new HttpException("Invalid refresh token", HttpStatus.UNAUTHORIZED);
    }

    let decodedData: IAuthDataResponse | undefined;

    try {
        decodedData = jwtAdapter.verify(refreshToken);
    } catch (_) {
        throw new HttpException("Invalid refresh token", HttpStatus.UNAUTHORIZED);
    }

    if (!decodedData?.user?.id) {
        throw new HttpException("Invalid refresh token", HttpStatus.UNAUTHORIZED);
    }

    const user = await userRepository.findById(decodedData.user.id);

    const findSessionUseCase = makeFindSessionUseCase();

    const session = await findSessionUseCase.handle({
        id: decodedData.userSession?.id,
        userID: decodedData.user.id,
    });

    req.user = user;
    req.session = session;

    return next();
}
