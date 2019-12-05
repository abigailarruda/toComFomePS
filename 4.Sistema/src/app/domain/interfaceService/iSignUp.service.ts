import { UserViewModel } from 'src/app/viewModels/user.viewModel';

export interface ISignUpService {
    
    insert(user : UserViewModel);
}