import { Router } from "express";
import rateLimit from "express-rate-limit";
import { IRouter } from "../../shared/models/interfaces/router"; 
import { AuthController, makeAuthController } from "./auth-controller";

const MINUTES_15 = 15 * 60 * 1000;

class AuthRoutes implements IRouter {

    public path = "/auth";

    private controller: AuthController;

    constructor(){
        this.controller = makeAuthController()
    }

    create(router: Router){

        const loginLimiter = rateLimit({ windowMs: MINUTES_15, max: 50});

        router.post(`${this.path}/login`, loginLimiter, (req, res) => this.controller.login(req, res))
    }
}

export const makeAuthRoutes = (router: Router): IRouter => {
    const routes = new AuthRoutes();
    routes.create(router);

    return routes;
}