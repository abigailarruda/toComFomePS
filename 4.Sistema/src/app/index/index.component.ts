import { Component, OnInit, AfterViewInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { IIndexService } from "../domain/interfaceService/iIndex.service";
import { ISignInService } from "../domain/interfaceService/iSignIn.service";
import { UserViewModel } from "../viewModels/user.viewModel";
import { RecipeViewModel } from "../viewModels/recipe.viewModel";
import { IngredientViewModel } from "../viewModels/ingredient.ViewModel";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"]
})
export class IndexComponent implements OnInit, AfterViewInit {
  public users = new Array<UserViewModel>();
  public currentUser: UserViewModel;
  public igredients = new Array<IngredientViewModel>();
  public recipes = new Array<RecipeViewModel>();
  public recipeFilter = new Array<RecipeViewModel>();
  public ingredientsFilter = new Array<IngredientViewModel>();
  public filter: string;
  flagRecipes: boolean = false;
  constructor(
    @Inject("IIndexService") private indexService: IIndexService,
    @Inject("IDadosService") private userService: ISignInService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.userService.getUserOnline().subscribe(res => {
      this.getUsers(res[0].key);
      this.getIngredients();
    });
  }

  getIngredients() {
    this.indexService.getIngredients().subscribe(res => {
      this.igredients = res;
    });
  }

  getRecipes() {
    this.indexService.getRecipes().subscribe(res => {
      this.recipeFilter = res;
      this.recipes.push(...res);
      this.recipeFilter.forEach(recipe => {
        recipe.usernameCriator = this.users.find(
          user => user.key == recipe.keyCriator
        ).username;
        this.flagRecipes = true;
      });
    });
  }

  getUsers(keyuser: string) {
    this.userService.get().subscribe(res => {
      this.users = res;
      this.getRecipes();
      this.currentUser = res.find(x => x.key === keyuser);
    });
  }

  selecionarIgredient(index: number) {
    this.igredients[index].check = !this.igredients[index].check;
    var INDEX = this.ingredientsFilter.findIndex(
      x => this.igredients[index].key == x.key
    );
    if (this.igredients[index].check) {
      if (INDEX == -1) {
        this.ingredientsFilter.push(this.igredients[index]);
      }
    } else {
      this.ingredientsFilter.splice(INDEX, 1);
    }
    this.recipeFilter.splice(0, this.recipeFilter.length);
    this.recipeFilter = this.buscarPorIngredientCheck();
  }

  buscarPorIngredientCheck() {
    let receitas: Array<RecipeViewModel> = new Array<RecipeViewModel>();
    this.recipes.forEach(r => {
      let total: number = 0;
      r.ingredients.forEach(ingredientesReceita => {
        this.ingredientsFilter.forEach(i => {
          if (ingredientesReceita.key == i.key) {
            ++total;
          }
        });
      });
      if (total == this.ingredientsFilter.length) {
        receitas.push(r);
      }
    });
    return receitas;
  }

  buscarPorNome() {
    this.recipeFilter.splice(0, this.recipeFilter.length);
    this.recipeFilter = this.recipes.filter(receita => {
      var contador = 0;
      receita.ingredients.forEach(ingedient => {
        if (ingedient.name.indexOf(this.filter) != -1) {
          ++contador;
        }
      });
      if (contador > 0) {
        return receita;
      }
    });
  }

  abrirConta() {
    this.router.navigate(["acc"]);
  }
}
