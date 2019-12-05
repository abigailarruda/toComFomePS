import { Recipe } from 'src/app/domain/models/recipe.models';
import { Ingredient } from 'src/app/domain/models/ingredient.models';

export interface IIndexRepository {
    insetRecipe(recipe : Recipe);

    getRecipes();

    insertIngredient(ingredient : Ingredient);

    getIngredients();

}