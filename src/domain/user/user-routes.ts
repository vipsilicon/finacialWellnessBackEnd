import { Router } from "express";
import { IRouter } from "../../shared/models/interfaces/router";
import { UserController, makeUserController } from "./user-controller";

class UserRoutes implements IRouter {

    public path = "/user";

    private controller: UserController;

    constructor(){
        this.controller = makeUserController()
    }

    create(router: Router){
        router.post(`${this.path}`, (req, res) => this.controller.create(req, res));
    }
}

export const makeUserRoutes = (router: Router): IRouter => {
    const routes = new UserRoutes()
    routes.create(router);

    return routes;
}