import { Account, Session, User, Verification } from "better-auth";

export interface Database {
  user: User;
  session: Session;
  account: Account;
  verification: Verification;
}
