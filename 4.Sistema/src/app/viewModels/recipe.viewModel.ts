import { IngredientViewModel } from './ingredient.ViewModel';

export class RecipeViewModel {
    usernameCriator : string;
    keyCriator : string;
    key : string;
    instructions : string;
    cookTime : string;
    views : number;
    ingredients : Array<IngredientViewModel>;
    url : string;
    name : string;
}