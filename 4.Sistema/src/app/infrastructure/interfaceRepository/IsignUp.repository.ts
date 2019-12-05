import { User } from 'src/app/domain/models/user.models';

export interface ISignUpRepository{
    
    insert (user : User): any;

}