import { Router } from "express";
import { IRouter } from "../../shared/models/interfaces/router";
import { ProductsController, makeProductsController } from "./product-controller";
import { userMiddleware } from "../../infra/middlewares/user-middleware";

class ProductRoutes implements IRouter {

    public path = "/products";

    private controller: ProductsController;

    constructor(){
        this.controller = makeProductsController()
    }

    create(router: Router){
        router.post(`${this.path}`, userMiddleware, (req, res) => this.controller.create(req, res))
        router.put(`${this.path}/:id`, userMiddleware, (req, res) => this.controller.update(req, res))
        router.get(`${this.path}`, userMiddleware, (req, res) => this.controller.find(req, res))
    }
}

export const makeProductsRoutes = (router: Router): ProductRoutes => {
    const routes = new ProductRoutes();
    routes.create(router);
    return routes;
}

