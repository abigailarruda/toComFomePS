import { ISignInService } from "../interfaceService/iSignIn.service";
import { ISignInRepository } from "src/app/infrastructure/interfaceRepository/iSignIn.repository";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserViewModel } from "src/app/viewModels/user.viewModel";
import { VmToModelService } from "./vmToModel.service";
import { User } from "../models/user.models";
@Injectable()
export class SigInService implements ISignInService {
  constructor(
    @Inject("IDadosToken") private siginRepository: ISignInRepository,
    private convertService: VmToModelService
  ) {}

  get() {
    var users = new Observable<UserViewModel>();
    users = this.siginRepository.get();
    return users;
  }

  UpdatetUserOnline(user: UserViewModel, key: string) {
    var entny = new User();
    entny.name = user.name;
    entny.chave = user.chave;
    return this.siginRepository.UpdatetUserOnline(entny, key);
  }

  getUserOnline() {
    var key = new Observable<UserViewModel>();
    key = this.siginRepository.getUserOnline();
    return key;
  }
}
