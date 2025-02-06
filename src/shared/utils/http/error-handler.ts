import { Request, Response, NextFunction } from 'express';


export async function errorHandler(err:any, req: Request, res: Response,  next: NextFunction){
    return next();
}