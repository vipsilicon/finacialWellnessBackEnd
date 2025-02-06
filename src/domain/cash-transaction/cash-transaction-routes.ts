import { IRouter } from "../../shared/models/interfaces/router";
import { userMiddleware } from "../../infra/middlewares/user-middleware";
import { Router } from "express";
import {
  CashTransactionController,
  makeCashTransactionController,
} from "./cash-transaction-controller";

export class CashTransactionRoutes implements IRouter {
  public path = "/cash-transaction";

  private controller: CashTransactionController;

  constructor() {
    this.controller = makeCashTransactionController();
  }

  create(router: Router): void {
    router.post(`${this.path}`, userMiddleware, (req, res) =>
      this.controller.create(req, res)
    );
    router.put(`${this.path}/:id`, userMiddleware, (req, res) =>
      this.controller.update(req, res)
    );
    router.get(`${this.path}`, userMiddleware, (req, res) =>
      this.controller.find(req, res)
    );
  }
}

export const makeCashTransactionRoutes = (router: Router) => {
  const routes = new CashTransactionRoutes();

  routes.create(router);

  return routes;
};
