import crypto from "crypto";

export interface IHMACAdapter {
    hash(key: string, text:any): string
    generatePasswordSalt(): string
    generateResetPasswordToken(): string
}

class HMACAdapter implements IHMACAdapter {

    hash(key: string, text: any): string {
        return crypto.createHmac("sha512", key)
            .update(text)
            .digest('hex')
    }

    generatePasswordSalt(): string {
        return crypto.randomBytes(Math.ceil(16/2))
            .toString('hex')
            .slice(0, 16)
    }

    generateResetPasswordToken(): string {
        return crypto.randomBytes(20)
            .toString('hex')
    }
}

export const makeHMACAdapter = (): IHMACAdapter => {
    return new HMACAdapter();
}