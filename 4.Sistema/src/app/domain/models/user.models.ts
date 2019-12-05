import { Person } from "./person.models";

export class User extends Person {
  username: string;
  status: boolean;
  country: string;
  chave: string;
}
