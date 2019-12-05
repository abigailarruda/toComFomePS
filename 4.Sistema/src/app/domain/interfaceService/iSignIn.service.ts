import { UserViewModel } from "src/app/viewModels/user.viewModel";

export interface ISignInService {
  get();

  UpdatetUserOnline(user: UserViewModel, key: string);

  getUserOnline();
}
