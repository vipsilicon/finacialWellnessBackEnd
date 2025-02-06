import { Request, Response } from "express";
import { ExpensesService, makeExpensesService } from "./expenses-service";
import { Expenses } from "./expenses-entity";
import { ExpensesDTO } from "./models/dtos/expenses.dto";
import { LimitOffsetDTO } from "../../shared/models/dtos/limit-offset.dto";
import { StartEndDateDTO } from "../../shared/models/dtos/start-end-date.dto";
import { ExpensesFilterDTO } from "./models/dtos/expenses-filter.dto";

export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  async create(req: Request | any, res: Response): Promise<Response<Expenses>> {
    const expensesDTOArray: ExpensesDTO[] = [];

    // for (const expenseDTOItem of req.body) {
    //   expenseDTOItem.date = new Date(expenseDTOItem.date);
    //   const expensesDTO = new ExpensesDTO(expenseDTOItem);
    //   await expensesDTO.validate();
    //   expensesDTOArray.push(expensesDTO);
    // }

    try {
      for (const expenseDTO of req.body) {
        try {
          expenseDTO.date = new Date();
          if (isNaN(expenseDTO.date.getTime())) {
            throw new Error(`Invalid date format for: ${expenseDTO.date}`);
          }

          const expensesDTO = new ExpensesDTO(expenseDTO);
          expensesDTO.validate();

          expensesDTOArray.push(expensesDTO);
        } catch (error) {
          console.log(`failed to process excess item: ${error}`);
        }
      }
    } catch (error) {
      console.log(`Critical error while processing expenses: ${error}`);
    }

    const user = req.user;

    const response = await this.expensesService.create({
      user,
      expensesDTOArray,
    });

    return res.json(response);
  }

  async update(req: Request | any, res: Response): Promise<Response<Expenses>> {
    const expensesDTO = new ExpensesDTO(req.body);
    await expensesDTO.validate();

    const user = req.user;

    const response = await this.expensesService.update({
      id: parseInt(req.params.id),
      user,
      expensesDTO,
    });

    return res.json(response);
  }

  async find(req: Request | any, res: Response): Promise<Response<Expenses[]>> {
    const limitOffsetDTO = new LimitOffsetDTO(req.query as any);
    limitOffsetDTO.validate();

    const expensesFilterDTO = new ExpensesFilterDTO(req.body);
    expensesFilterDTO.validate();

    const startEndDateDTO = new StartEndDateDTO(req.query as any);
    startEndDateDTO.validate();

    const user = req.user;

    const response = await this.expensesService.find({
      userID: user.id,
      expensesFilterDTO,
      limitOffsetDTO,
      startEndDateDTO,
    });

    return res.json(response);
  }
}

export const makeExpensesController = (): ExpensesController => {
  return new ExpensesController(makeExpensesService());
};
