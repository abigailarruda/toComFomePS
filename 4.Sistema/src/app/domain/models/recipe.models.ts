import { Ingredient } from './ingredient.models';

export class Recipe {
    usernameCriator : string;
    keyCriator : string;
    key : string;
    instructions : string;
    cookTime : string;
    views : number;
    ingredients : Array<Ingredient>;
    url : string;
    name : string;
}