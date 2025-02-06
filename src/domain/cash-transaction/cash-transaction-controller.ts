import { Request, Response } from "express";
import {
  ICashTransactionService,
  makeCashTransactionService,
} from "./cash-transaction-service";
import { CashTransactionDTO } from "./models/dtos/cash-transaction.dto";
import { CashTransaction } from "./cash-transaction-entity";
import { LimitOffsetDTO } from "../../shared/models/dtos/limit-offset.dto";
import { StartEndDateDTO } from "../../shared/models/dtos/start-end-date.dto";

export class CashTransactionController {
  constructor(private cashTransactionService: ICashTransactionService) {}

  async create(
    req: Request | any,
    res: Response
  ): Promise<Response<CashTransaction>> {
    const cashTransactionDTO = new CashTransactionDTO(req.body);
    await cashTransactionDTO.validate();

    const user = req.user;

    const response = await this.cashTransactionService.create({
      user,
      cashTransactionDTO,
    });

    return res.json(response);
  }

  async update(
    req: Request | any,
    res: Response
  ): Promise<Response<CashTransaction>> {
    const cashTransactionDTO = new CashTransactionDTO(req.body);
    await cashTransactionDTO.validate();

    const user = req.user;

    const response = await this.cashTransactionService.update({
      user,
      cashTransactionDTO,
      id: parseInt(req.params.id),
    });

    return res.json(response);
  }

  async find(
    req: Request | any,
    res: Response
  ): Promise<Response<CashTransaction[]>> {
    const limitOffsetDTO = new LimitOffsetDTO(req.query as any);
    limitOffsetDTO.validate();

    const startEndDateDTO = new StartEndDateDTO(req.query as any);
    startEndDateDTO.validate();

    const user = req.user;

    const response = await this.cashTransactionService.find({
      limitOffsetDTO,
      startEndDateDTO,
      user,
    });

    return res.json(response);
  }
}

export const makeCashTransactionController = (): CashTransactionController => {
  return new CashTransactionController(makeCashTransactionService());
};
