import { User } from "src/app/domain/models/user.models";

export interface ISignInRepository {
  insert(user: User): any;

  get();

  UpdatetUserOnline(user: User, key: string);

  getUserOnline();
}
