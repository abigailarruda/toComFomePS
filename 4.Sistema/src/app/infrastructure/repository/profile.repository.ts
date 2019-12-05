import { AngularFireDatabase } from "@angular/fire/database";
import { IProfileRepository } from "../interfaceRepository/IProfile.repository";
import { Injectable } from "@angular/core";
import { User } from "src/app/domain/models/user.models";

@Injectable()
export class ProfileRepository implements IProfileRepository {
  constructor(private firebase: AngularFireDatabase) {}

  updateProfile(usuario: User, key: string) {
    this.firebase
      .list("user")
      .update(key, usuario)
      .catch((error: any) => {
        console.error(error);
      });
  }
}
