import { ISignUpService } from '../interfaceService/iSignUp.service';
import { UserViewModel } from 'src/app/viewModels/user.viewModel';
import { Inject, Injectable } from '@angular/core';
import { VmToModelService } from './vmToModel.service';
import { ISignUpRepository } from 'src/app/infrastructure/interfaceRepository/IsignUp.repository';

@Injectable()
export class SignUpService implements ISignUpService{
    constructor(@Inject('ISignUpRepository') private signUpRepository: ISignUpRepository,
    private convertService: VmToModelService){}

    insert(user : UserViewModel){
        return this.signUpRepository.insert(this.convertService.userViewModelToUser(user));
    }
}