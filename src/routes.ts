import express from "express";
import { makeUserRoutes } from "./domain/user/user-routes";
import { makeAuthRoutes } from "./domain/auth/auth-routes";
import { makeExpensesRoutes } from "./domain/expenses/expenses-routes";
import { makeBankListRoutes } from "./domain/bankList/bank-list-routes";
import { makeBankTransactionRoutes } from "./domain/bank-transaction/bank-transaction-routes";
import { makeCashTransactionRoutes } from "./domain/cash-transaction/cash-transaction-routes";
import { makeProductsRoutes } from "./domain/products/products-routes";

const router = express.Router();

class Routes {
  initialize() {
    router.get("/", (req, res) => {
      res.json({
        status: "active",
      });
    });

    makeAuthRoutes(router);
    makeUserRoutes(router);
    makeExpensesRoutes(router);
    makeBankListRoutes(router);
    makeBankTransactionRoutes(router);
    makeCashTransactionRoutes(router);
    makeProductsRoutes(router);

    return router;
  }
}

export const makeRoutes = (): Routes => {
  return new Routes();
};
