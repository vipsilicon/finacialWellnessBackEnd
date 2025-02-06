import { Exclude, Expose } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserDTO } from "./models/dtos/user.dto";
import { AccountStatusEnum } from "./models/enums/account-status.enum";
import { UserInterface } from "./models/interface/user-response.interface";
import { Expenses } from "../expenses/expenses-entity";

interface IFromCreateProps {
  userDTO: UserDTO;
  passwordSalt: string;
  passwordHash: string;
}

interface IForResponse {
  user: User;
}

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  middleName!: string;

  @Column()
  lastName!: string;

  @Column()
  accountStatus!: string;

  @Column()
  email!: string;

  @Column()
  phoneNumber!: number;

  @Column()
  @Exclude()
  passwordSalt!: string;

  @Column()
  @Exclude()
  passwordHash!: string;

  @Column()
  @Exclude()
  resetPassword!: boolean;

  @Column()
  @Exclude()
  resetPasswordExpires!: Date;

  @Column()
  @Exclude()
  resetPasswordToken!: string;

  @OneToMany(() => Expenses, (expenses) => expenses.user)
  expenses!: Expenses[];

  static fromCreate(props: IFromCreateProps): User {
    const { userDTO, passwordSalt, passwordHash } = props;

    const user = new User();

    user.firstName = userDTO?.firstName;
    user.middleName = userDTO?.middleName;
    user.lastName = userDTO?.lastName;
    user.accountStatus = AccountStatusEnum.initialized;
    user.email = userDTO?.email;
    user.phoneNumber = userDTO?.phoneNumber;
    user.passwordSalt = passwordSalt;
    user.passwordHash = passwordHash;

    return user;
  }

  static forResponse(props: IForResponse): UserInterface {
    const { user } = props;

    const userResponse: UserInterface = {
      id: user?.id,
      firstName: user?.firstName,
      middleName: user?.middleName,
      lastName: user?.lastName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      accountStatus:
        AccountStatusEnum[user.accountStatus as keyof typeof AccountStatusEnum],
    };

    return userResponse;
  }
}
