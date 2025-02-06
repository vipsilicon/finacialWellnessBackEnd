import { Router } from 'express';
import { userMiddleware } from '../../infra/middlewares/user-middleware';
import { IRouter } from '../../shared/models/interfaces/router';
import { ExpensesController, makeExpensesController } from './expenses-controller';

class ExpensesRoutes implements IRouter {

    public path = "/expenses";

    private controller: ExpensesController;

    constructor(){
        this.controller = makeExpensesController()
    }

    create(router: Router){
        router.post(`${this.path}`, userMiddleware, (req, res) => this.controller.create(req, res))
        router.put(`${this.path}/:id`, userMiddleware, (req, res) => this.controller.update(req, res))
        router.get(`${this.path}`, userMiddleware, (req, res) => this.controller.find(req, res))
    }
}

export const makeExpensesRoutes = (router: Router): IRouter => {
    const routes = new ExpensesRoutes();
    routes.create(router);
    return routes;
} 
