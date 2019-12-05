import { User } from "src/app/domain/models/user.models";

export interface IProfileRepository {
  updateProfile(usuario: User, key: string);
}
