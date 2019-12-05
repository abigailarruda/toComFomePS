import { IIndexRepository } from '../interfaceRepository/Iindex.repository';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Recipe } from 'src/app/domain/models/recipe.models';
import { map } from 'rxjs/operators';
import { Ingredient } from 'src/app/domain/models/ingredient.models';
@Injectable()

export class IndexRepository implements IIndexRepository{

    constructor(private firebase : AngularFireDatabase){ }

    insetRecipe(recipe : Recipe){
        this.firebase.list('recipe').push(recipe)
        .then((result : any) => {
            return result.key;
        })
    }

    insertIngredient(ingredient : Ingredient){
        this.firebase.list('ingredient').push(ingredient)
        .then((result : any) => {
            return result.key;
        })
    }

    getIngredients(){
        return this.firebase.list('ingredient').
        snapshotChanges()
        .pipe(
            map(changes => {
                return changes.map( c=> ({key : c.payload.key,...c.payload.val()}))
            })
        )
    }

    getRecipes(){
        return this.firebase.list('recipe')
        .snapshotChanges()
        .pipe(
            map(changes =>{
               return changes.map( c=>({key : c.payload.key,...c.payload.val()}))
            })
        )
    }
}