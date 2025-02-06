import { Request, Response } from "express";
import { BankList } from "./bank-list-entity";
import { BankListDTO } from "./models/dtos/bank-list.dto";
import { IBankListService, makeBankListService } from "./bank-list-service";

export class BankListController {
  constructor(private bankListService: IBankListService) {}

  async create(req: Request, res: Response): Promise<Response<BankList>> {
    const bankListDTO = new BankListDTO(req.body);
    bankListDTO.validate();

    const response = await this.bankListService.create({
      bankListDTO,
    });

    return res.json(response);
  }
}

export const makeBankListController = (): BankListController => {
  return new BankListController(makeBankListService());
};
