import { SqlDataSource } from "../../infra/create-conn";
import { LimitOffsetDTO } from "../../shared/models/dtos/limit-offset.dto";
import { Product } from "./products-entity";
import { IFindProps } from "./products-service";

export interface IProductRepository {
    create(product: Product): Promise<Product>
    update(id: number, product: Product): Promise<void>
    findById(id: number): Promise<Product | null>
    find(props: IFindProps): Promise<Product[]>
}

export class ProductionRepository implements IProductRepository {

    private get repository(){
        return SqlDataSource.getRepository(Product);
    }

    create(product: Product): Promise<Product>{
        return this.repository.save(product);
    }

    async update(id: number, product: Product): Promise<void> {
        await this.repository.update(id, {
            name: product.name,
            company: product.company,
            quantity: product.quantity,
            unit: product.unit,
            description: product.description,
            category: product.category,
            subCategory: product.subCategory
        })
    }

    async findById(id: number): Promise<Product | null> {
        return this.repository.findOne({
            where: { id}
        })
    }

    async find(props: IFindProps): Promise<Product[]>{
        
        const { userID, limitOffset, productsFilterDTO } = props;
    
        const queryBuilder = this.repository.createQueryBuilder("product")
            
        queryBuilder.where("product.userId = : userID", {userID});

        if(productsFilterDTO.name){
            queryBuilder.andWhere("product.name = : name", { name: `${productsFilterDTO.name}`});
        }

        if(productsFilterDTO.company){
            queryBuilder.andWhere("product.company = : company", { company : `${productsFilterDTO.company}`});
        }

        if(productsFilterDTO.category){
            queryBuilder.andWhere("product.category = : category", { category: `${productsFilterDTO.category}`});
        }

        if(productsFilterDTO.subCategory){
            queryBuilder.andWhere("product.subCategory = : subCategory", { subCategory: `${productsFilterDTO.subCategory}`});
        }
        
        if(limitOffset){
            queryBuilder.take(limitOffset.limit).skip(limitOffset.offset);
        }

        return queryBuilder.getMany();
    }
} 

export const makeProductsRepository = (): IProductRepository => {
    return new ProductionRepository();
}