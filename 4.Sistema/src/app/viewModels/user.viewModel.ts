import { PersonViewModel } from "./person.viewModel";

export class UserViewModel extends PersonViewModel {
  username: string;
  status: boolean;
  country: string;
  chave: string;
}
