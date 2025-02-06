import { classToPlain } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';

export async function responseHandler(req: Request, res: Response, next: NextFunction){

    const oldJson = res.json;

    res.json = function(data){

        const finalData = classToPlain(data);
        oldJson.call(this, finalData);
        return this;
    }

    next();
}