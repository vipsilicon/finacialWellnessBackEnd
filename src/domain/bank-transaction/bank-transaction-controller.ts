import { Request, Response } from "express";
import {
  IBankTransactionService,
  makeBankTransactionService,
} from "./bank-transaction-service";
import { BankTransaction } from "./bank-transaction-entity";
import { BankTransactionDTO } from "./models/dtos/bank-transaction.dto";
import { LimitOffsetDTO } from "../../shared/models/dtos/limit-offset.dto";
import { StartEndDateDTO } from "../../shared/models/dtos/start-end-date.dto";

export class BankTransactionController {
  constructor(private bankTransactionService: IBankTransactionService) {}

  async create(
    req: Request | any,
    res: Response
  ): Promise<Response<BankTransaction>> {
    const bankTransactionDTO = new BankTransactionDTO(req.body);
    bankTransactionDTO.validate();

    const user = req.user;

    const response = await this.bankTransactionService.create({
      user,
      bankTransactionDTO,
    });

    return res.json(response);
  }

  async update(
    req: Request | any,
    res: Response
  ): Promise<Response<BankTransaction>> {
    const bankTransactionDTO = new BankTransactionDTO(req.body);
    bankTransactionDTO.validate();

    const user = req.user;

    const response = await this.bankTransactionService.update({
      id: parseInt(req.params.id),
      user,
      bankTransactionDTO,
    });

    return res.json(response);
  }

  async find(
    req: Request | any,
    res: Response
  ): Promise<Response<BankTransaction[]>> {
    const bankTransactionDTO = new BankTransactionDTO(req.body);
    bankTransactionDTO.validate();

    const limitOffsetDTO = new LimitOffsetDTO(req.query as any);
    limitOffsetDTO.validate();

    const startEndDateDTO = new StartEndDateDTO(req.query as any);
    startEndDateDTO.validate();

    const user = req.user;

    const response = await this.bankTransactionService.find({
      userID: user.id,
      bankTransactionDTO,
      limitOffsetDTO,
      startEndDateDTO,
    });

    return res.json(response);
  }
}

export const makeBankTransactionController = (): BankTransactionController => {
  return new BankTransactionController(makeBankTransactionService());
};
