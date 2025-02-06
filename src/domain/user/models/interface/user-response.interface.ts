import { AccountStatusEnum } from "../enums/account-status.enum";

export interface UserInterface {
    id: number
    firstName: string
    middleName: string
    lastName: string
    email: string
    phoneNumber: number
    accountStatus: AccountStatusEnum
}