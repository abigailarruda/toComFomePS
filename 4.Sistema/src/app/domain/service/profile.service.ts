import { VmToModelService } from "./vmToModel.service";
import { UserViewModel } from "src/app/viewModels/user.viewModel";
import { Injectable, Inject } from "@angular/core";
import { IProfileRepository } from "src/app/infrastructure/interfaceRepository/IProfile.repository";
import { IProfileService } from "../interfaceService/IProfile.service";

@Injectable()
export class ProfileService implements IProfileService {
  constructor(
    @Inject("IProfileRepository") private ProfileRepository: IProfileRepository,
    private convertService: VmToModelService
  ) {}

  updateProfile(usuarioViewModel: UserViewModel, key: string) {
    var usuario = this.convertService.userViewModelToUser(usuarioViewModel);
    return this.ProfileRepository.updateProfile(usuario, key);
  }
}
