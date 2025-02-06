import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UnitTypeEnum } from "./models/enums/unit-type.enum";
import { Expenses } from "../expenses/expenses-entity";
import { User } from "../user/user-entity";
import { ProductsDTO } from "./models/dtos/products.dto";

interface IFromCreateProps {
  userID: number;
  productsDTO: ProductsDTO;
}

interface IFromUpdateProps {
  userID: number;
  productsDTO: ProductsDTO;
}

@Entity({ name: "product" })
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  name!: string;

  @Column()
  company!: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  quantity!: number;

  @Column({ type: "enum", enum: UnitTypeEnum, nullable: false })
  unit!: UnitTypeEnum;

  @Column({ nullable: true })
  description!: string;

  @Column()
  category!: string;

  @Column()
  subCategory!: string;

  @OneToMany(() => Expenses, (expenses) => expenses.product)
  expenses!: Expenses[];

  static fromCreate(props: IFromCreateProps): Product {
    const { userID, productsDTO } = props;

    const products = new Product();

    products.name = productsDTO.name;
    products.company = productsDTO.company;
    products.userId = userID;
    products.quantity = productsDTO.quantity;
    products.unit = productsDTO.unit;
    products.description = productsDTO.description || "";
    products.category = productsDTO.category;
    products.subCategory = productsDTO.subCategory;

    return products;
  }

  static fromUpdate(props: IFromUpdateProps): Product {
    const { userID, productsDTO } = props;

    const products = new Product();

    products.name = productsDTO.name;
    products.company = productsDTO.company;
    products.userId = userID;
    products.quantity = productsDTO.quantity;
    products.unit = productsDTO.unit;
    products.description = productsDTO.description || "";
    products.category = productsDTO.category;
    products.subCategory = productsDTO.subCategory;

    return products;
  }
}
