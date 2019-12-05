import { IIndexService } from '../interfaceService/iIndex.service';
import { Injectable, Inject } from '@angular/core';
import { Recipe } from '../models/recipe.models';
import { IIndexRepository } from 'src/app/infrastructure/interfaceRepository/Iindex.repository';
import { RecipeViewModel } from 'src/app/viewModels/recipe.viewModel';
import { VmToModelService } from './vmToModel.service';
import { IngredientViewModel } from 'src/app/viewModels/ingredient.ViewModel';

@Injectable()
export class IndexService implements IIndexService{
    constructor(@Inject('IIndexRepository') private indexRepository: IIndexRepository,
    private convertService: VmToModelService){}
    
    insetRecipe(recipeVm : RecipeViewModel){
        var recipe = this.convertService.recipeViewModelToRecipe(recipeVm);
        return this.indexRepository.insetRecipe(recipe);      
    }

    getRecipes(){
        return this.indexRepository.getRecipes();
    }
    insertIngredient(ingredientVm: IngredientViewModel) {
        var ingredient = this.convertService.ingredientViewModelToIngredient(ingredientVm);
        return this.indexRepository.insertIngredient(ingredient);
    }
    getIngredients() {
        return this.indexRepository.getIngredients();
    }
}