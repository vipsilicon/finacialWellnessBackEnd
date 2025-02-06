import { Router } from "express";

export interface IRouter {
    path: string;
    create(router: Router): void;
}