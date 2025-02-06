import { Request, Response } from "express";
import { IProductsService, makeProductsService } from "./products-service";
import { Product } from "./products-entity";
import { ProductsDTO } from "./models/dtos/products.dto";
import { ProductsFilterDTO } from "./models/dtos/products-filter.dto";
import { LimitOffsetDTO } from "../../shared/models/dtos/limit-offset.dto";


export class ProductsController {

    constructor(
        private productService: IProductsService
    ){}

    async create(req: Request | any, res: Response): Promise<Response<Product>>{

        const productsDTO = new ProductsDTO(req.body);
        productsDTO.validate();

        const user = req.user;

        const response = await this.productService.create({
            user,
            productsDTO
        });

        return res.json(response);
    }

    async update(req: Request | any, res: Response): Promise<Response<Product>>{

        const productsDTO = new ProductsDTO(req.body);
        productsDTO.validate();

        const user = req.user;

        const response = await this.productService.update(user.id, productsDTO);

        return res.json(response);

    }

    async find(req: Request | any, res: Response): Promise<Response<Product[]>>{

        const productsFilterDTO = new ProductsFilterDTO(req.body);
        productsFilterDTO.validate();

        const limitOffset = new LimitOffsetDTO(req.query as any);
        limitOffset.validate();

        const user = req.user;

        const response = await this.productService.find({
            userID: user.id,
            limitOffset,
            productsFilterDTO
        })

        return res.json(response);
    }

}

export const makeProductsController = (): ProductsController => {
    return new ProductsController(
        makeProductsService()
    );
}

