import { Recipe } from '../models/recipe.models';
import { IngredientViewModel } from 'src/app/viewModels/ingredient.ViewModel';
import { RecipeViewModel } from 'src/app/viewModels/recipe.viewModel';

export interface IIndexService {
    insetRecipe(recipe : RecipeViewModel);

    getRecipes();

    insertIngredient(ingredient : IngredientViewModel);

    getIngredients();
}