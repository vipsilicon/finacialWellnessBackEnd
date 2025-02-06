import { LimitOffsetDTO } from "../../shared/models/dtos/limit-offset.dto";
import { StartEndDateDTO } from "../../shared/models/dtos/start-end-date.dto";
import { HttpStatus } from "../../shared/models/enums/http-status";
import { HttpException } from "../../shared/utils/http/http-exception";
import { User } from "../user/user-entity";
import { CashTransaction } from "./cash-transaction-entity";
import {
  ICashTransactionRepository,
  makeCashTransactionRepository,
} from "./cash-transaction-repository";
import { CashTransactionDTO } from "./models/dtos/cash-transaction.dto";

interface ICreateProps {
  cashTransactionDTO: CashTransactionDTO;
  user: User;
}

interface IUpdateProps {
  cashTransactionDTO: CashTransactionDTO;
  user: User;
  id: number;
}

interface IFindProps {
  limitOffsetDTO: LimitOffsetDTO;
  startEndDateDTO: StartEndDateDTO;
  user: User;
}

export interface ICashTransactionService {
  create(props: ICreateProps): Promise<CashTransaction>;
  update(props: IUpdateProps): Promise<CashTransaction>;
  find(props: IFindProps): Promise<CashTransaction[]>;
}

export class CashTransactionService implements ICashTransactionService {
  constructor(private cashTransactionRepository: ICashTransactionRepository) {}

  async create(props: ICreateProps): Promise<CashTransaction> {
    const { cashTransactionDTO, user } = props;

    const cashTransactionCreate = CashTransaction.fromCreate({
      userId: user.id,
      cashTransactionDTO,
    });

    return await this.cashTransactionRepository.create(cashTransactionCreate);
  }

  async update(props: IUpdateProps): Promise<CashTransaction> {
    const { cashTransactionDTO, user, id } = props;

    let cashTransaction = await this.cashTransactionRepository.findById(id);

    if (!cashTransaction) {
      throw new HttpException(
        "Cash Transaction Not Found!",
        HttpStatus.NOT_FOUND
      );
    }

    const cashTransactionUpdate = CashTransaction.fromUpdate({
      cashTransactionDTO,
      userId: user.id,
    });

    await this.cashTransactionRepository.update(id, cashTransactionUpdate);

    cashTransaction = await this.cashTransactionRepository.findById(id);

    if (!cashTransaction) {
      throw new HttpException(
        "Cash Transaction Not Found!",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return cashTransaction;
  }

  async find(props: IFindProps): Promise<CashTransaction[]> {
    const { limitOffsetDTO, startEndDateDTO, user } = props;

    return this.cashTransactionRepository.find({
      limitOffsetDTO,
      startEndDateDTO,
      user,
    });
  }
}

export const makeCashTransactionService = (): ICashTransactionService => {
  return new CashTransactionService(makeCashTransactionRepository());
};
