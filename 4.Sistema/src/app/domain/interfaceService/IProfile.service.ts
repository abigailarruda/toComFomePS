import { UserViewModel } from "src/app/viewModels/user.viewModel";

export interface IProfileService {
  updateProfile(usuario: UserViewModel, key: string);
}
