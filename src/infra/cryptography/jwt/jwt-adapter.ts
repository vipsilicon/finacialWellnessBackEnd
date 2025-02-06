import * as jwt from "jsonwebtoken";

export interface IJwtAdapter<T> {
    sign(props: T | any): string
    verify(token: string): T | undefined
}

export class JwtAdapter<T> implements IJwtAdapter<T>{

    constructor(
        private key: string,
        private expiresIn?: number
    ){}

    sign(props: T | any): string {
        const options = this.expiresIn ? { expiresIn: this.expiresIn } : {};
        return jwt.sign({ ...props }, this.key, options);
    }

    verify(token: string): T | undefined {
        try {
            const decoded = jwt.verify(token, this.key);
            return decoded as T;
        } catch (error) {
            return undefined;
        }
    }
}