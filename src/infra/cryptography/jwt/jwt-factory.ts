import { IAuthDataResponse } from "../../../domain/auth/models/responses/auth-data-response";
import { IJwtAdapter, JwtAdapter } from "./jwt-adapter";
import { jwtConfig } from "../../../config/jwt-config";

export const makeLoginJwtAdapter = (): IJwtAdapter<IAuthDataResponse> => {
    const jwtAdapter = new JwtAdapter<IAuthDataResponse>(jwtConfig.accessToken.key, jwtConfig.accessToken.expiresIn);
    return jwtAdapter;
}

export const makeRefreshTokenJwtAdapter = (): IJwtAdapter<IAuthDataResponse> => {
    const jwtAdapter = new JwtAdapter<IAuthDataResponse>(jwtConfig.refreshToken.key, jwtConfig.refreshToken.expiresIn);
    return jwtAdapter;
}

