import { Injectable } from '@angular/core';
import { User } from 'src/app/domain/models/user.models';
import { AngularFireDatabase } from '@angular/fire/database';
import { ISignUpRepository } from '../interfaceRepository/IsignUp.repository';
@Injectable()
export class SignUpRepository implements ISignUpRepository{
    
    constructor(private firebase : AngularFireDatabase){ }
   
    insert ( user : User) : any {
        console.dir(user)
        this.firebase.list('user').push(user)
        .then((result : any) => {
            return result.key;
        })
    }


}