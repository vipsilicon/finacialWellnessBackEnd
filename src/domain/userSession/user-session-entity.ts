import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user/user-entity";
import { UserSessionMetadata } from "./classes/user-session-metadata";

interface IFromCreateProps {
  user: User;
  metadata?: UserSessionMetadata;
}

@Entity({ name: "userSession" })
export class UserSession {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  userID!: number;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "userID", referencedColumnName: "id" })
  user!: User;

  @Column()
  ipAddress!: string;

  @Column()
  browser!: string;

  @Column()
  device!: string;

  @Column()
  createDate!: Date;

  static fromCreate(props: IFromCreateProps): UserSession {
    const { user, metadata } = props;

    const userSession = new UserSession();
    userSession.userID = user.id;
    userSession.browser = metadata?.browser || "";
    userSession.device = metadata?.device || "";
    userSession.ipAddress = metadata?.ip || "";
    userSession.createDate = new Date();

    return userSession;
  }
}
