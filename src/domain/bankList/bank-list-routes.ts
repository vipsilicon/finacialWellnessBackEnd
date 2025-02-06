import { Router } from "express";
import { userMiddleware } from "../../infra/middlewares/user-middleware"; 
import { IRouter } from "../../shared/models/interfaces/router";
import { BankListController, makeBankListController } from './bank-list-controller';

class BankListRoutes implements IRouter {

    public path = "/bank-list"

    private controller: BankListController;

    constructor(){
        this.controller = makeBankListController();
    }

    create(router: Router){
        router.post(`${this.path}`, userMiddleware, (req, res) => this.controller.create(req, res))
    }

}

export const makeBankListRoutes = (router: Router): IRouter => {
    const routes = new BankListRoutes();
    routes.create(router);
    return routes;
}