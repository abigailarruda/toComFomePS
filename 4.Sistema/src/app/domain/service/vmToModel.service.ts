import { Injectable } from "@angular/core";
import { RecipeViewModel } from "src/app/viewModels/recipe.viewModel";
import { Recipe } from "../models/recipe.models";
import { IngredientViewModel } from "src/app/viewModels/ingredient.ViewModel";
import { Ingredient } from "../models/ingredient.models";
import { UserViewModel } from "src/app/viewModels/user.viewModel";
import { User } from "../models/user.models";

@Injectable({ providedIn: "root" })
export class VmToModelService {
  public recipeViewModelToRecipe(recipeVm: RecipeViewModel) {
    var recipe = new Recipe();
    recipe.cookTime = recipeVm.cookTime;
    recipe.ingredients = recipeVm.ingredients;
    recipe.instructions = recipeVm.instructions;
    recipe.keyCriator = recipeVm.keyCriator;
    recipe.url = recipeVm.url;
    recipe.name = recipeVm.name;
    return recipe;
  }

  public ingredientViewModelToIngredient(ingredientVm: IngredientViewModel) {
    var ingredient = new Ingredient();
    ingredient.name = ingredientVm.name;
    return ingredient;
  }

  public userViewModelToUser(userVm: UserViewModel) {
    var user = new User();
    user.country = userVm.country;
    user.dateOfBirth = userVm.dateOfBirth;
    user.email = userVm.email;
    user.name = userVm.name;
    user.password = userVm.password;
    user.username = userVm.username;
    if (userVm.key != null) user.key = userVm.key;
    return user;
  }
}
