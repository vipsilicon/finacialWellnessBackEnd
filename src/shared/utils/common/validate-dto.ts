import { validate } from "class-validator";
import { HttpStatus } from "../../models/enums/http-status";
import { HttpException } from "../http/http-exception";

export default async function validateDTO(dto: Object){
    const errors = await validate(dto);
    const errorsMessage: string[] = [];

    errors.forEach((error) => {
        const contraints = Object.values(error.constraints?? []);
        contraints.forEach((errorMessage => {
            errorsMessage.push(errorMessage);
        }))
    })

    if(errors.length > 0){
        throw new HttpException(errorsMessage, HttpStatus.BAD_REQUEST);
    }
}