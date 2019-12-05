import { ISignInRepository } from "../interfaceRepository/iSignIn.repository";
import { Injectable } from "@angular/core";
import { User } from "src/app/domain/models/user.models";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";
@Injectable()
export class SignInRepository implements ISignInRepository {
  constructor(private firebase: AngularFireDatabase) {}

  insert(user: User): any {
    this.firebase
      .list("user")
      .push(user)
      .then((result: any) => {
        return result.key;
      });
  }

  get() {
    return this.firebase
      .list("user")
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  UpdatetUserOnline(user: User, key: string) {
    this.firebase
      .list("userOnline")
      .update(key, user)
      .catch((error: any) => {
        console.error(error);
      });
  }

  getUserOnline() {
    return this.firebase
      .list("userOnline")
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }
}
