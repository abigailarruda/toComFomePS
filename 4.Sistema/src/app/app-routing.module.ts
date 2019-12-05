import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { IndexComponent } from "./index/index.component";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { ProfileComponent } from "./acc/acc.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "cadastro",
    component: CadastroComponent
  },

  { path: "acc", component: ProfileComponent },
  { path: "index", component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
