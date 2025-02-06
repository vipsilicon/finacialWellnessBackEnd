import { Router } from "express";
import { userMiddleware } from "../../infra/middlewares/user-middleware";
import { IRouter } from "../../shared/models/interfaces/router";
import {
  BankTransactionController,
  makeBankTransactionController,
} from "./bank-transaction-controller";

class BankTransactionRoutes implements IRouter {
  public path = "/bank_transaction";

  private controller: BankTransactionController;

  constructor() {
    this.controller = makeBankTransactionController();
  }

  create(router: Router) {
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

export const makeBankTransactionRoutes = (
  router: Router
): BankTransactionRoutes => {
  const routes = new BankTransactionRoutes();
  routes.create(router);

  return routes;
};
