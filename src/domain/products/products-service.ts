import { LimitOffsetDTO } from "../../shared/models/dtos/limit-offset.dto";
import { HttpStatus } from "../../shared/models/enums/http-status";
import { HttpException } from "../../shared/utils/http/http-exception";
import { User } from "../user/user-entity";
import { ProductsFilterDTO } from "./models/dtos/products-filter.dto";
import { ProductsDTO } from "./models/dtos/products.dto";
import { Product } from "./products-entity";
import { IProductRepository, makeProductsRepository} from "./products-repository";

interface ICreateProps {
    user: User
    productsDTO: ProductsDTO
}

export interface IFindProps {
    userID: number
    limitOffset: LimitOffsetDTO
    productsFilterDTO: ProductsFilterDTO
}

export interface IProductsService {
    create(props: ICreateProps): Promise<Product>
    update(id: number, productsDTO: ProductsDTO): Promise<Product | null>
    findById(id: number): Promise<Product | null>
    find(props: IFindProps): Promise<Product[]>
}

export class ProductsService implements IProductsService {

    constructor(
        private productsRepository: IProductRepository
    ){}

    async create(props: ICreateProps): Promise<Product>{
        
        const { user, productsDTO } = props;
    
        const createProducts = Product.fromCreate({
            userID: user.id,
            productsDTO
        });

        return this.productsRepository.create(createProducts);
    }

    async update(id: number, productsDTO: ProductsDTO): Promise<Product | null> {
        
        let product = await this.productsRepository.findById(id);

        if(!product){
            throw new HttpException("Product not found!", HttpStatus.NOT_FOUND);
        }

        const updateProducts = Product.fromUpdate({
            userID: id,
            productsDTO
        });

        await this.productsRepository.update(id, updateProducts);

        return await this.productsRepository.findById(id);

    }

    async findById(id: number): Promise<Product | null> {
        return this.productsRepository.findById(id);
    }

    async find(props: IFindProps): Promise<Product[]>{

        const { userID, limitOffset, productsFilterDTO } = props;
    
        return this.productsRepository.find({
            userID,
            limitOffset,
            productsFilterDTO
        })
    }
}

export const makeProductsService = (): IProductsService => {
    return new ProductsService(
        makeProductsRepository()
    )
}