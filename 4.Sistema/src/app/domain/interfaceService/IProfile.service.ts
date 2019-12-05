import { Usuario } from "src/app/entidades/usuario.model";
import { UserViewModel } from "src/app/viewModels/user.viewModel";

export interface IProfileService {
  updateProfile(usuario: UserViewModel, key: string);
}
