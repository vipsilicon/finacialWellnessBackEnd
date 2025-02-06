import { Request } from "express";
import parser from "ua-parser-js";

export class UserSessionMetadata {

    ip!: string;
    device!: string;
    browser!: string;

    static fromRequest(req: Request): UserSessionMetadata {

        const userAgent = parser(req.headers['user-agent'])

        const ip = req?.ip || ''
        const device = userAgent.os?.name || ''
        const browser = userAgent.browser?.name || ''

        return { ip, device, browser }
    }
}