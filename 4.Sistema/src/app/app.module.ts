import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  NgbModule,
  NgbDatepickerModule,
  NgbDatepickerI18n
} from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { IndexComponent } from "./index/index.component";
import { ProductListComponent } from "./products/product-list/product-list.component";
import { ProductDetailsComponent } from "./products/product-details/product-details.component";
import { OverviewComponent } from "./products/product-details/overview/overview.component";
import { AuthGuardService } from "./guards/auth-guard.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialAngularSelectModule } from "material-angular-select";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { DomainModule } from "./domain/domain.module";
import { SigInService } from "./domain/service/signIn.service";
import { IndexService } from "./domain/service/index.service";
import { I18n, CustomDatepickerI18n } from "./helpers/CustomDatepickerI18n";
import { NgxMaskModule, IConfig } from "ngx-mask";
import { NgSelectModule } from "@ng-select/ng-select";
import { SignUpService } from "./domain/service/signup.service";
import { ProfileService } from "./domain/service/profile.service";
import { ProfileComponent } from "./acc/acc.component";

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    CadastroComponent,
    IndexComponent,
    ProductListComponent,
    ProductDetailsComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MaterialAngularSelectModule,
    NgbDatepickerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    DomainModule,
    NgbDatepickerModule,
    NgxMaskModule.forRoot(options),
    NgSelectModule
  ],
  providers: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    CadastroComponent,
    IndexComponent,
    AuthGuardService,
    [
      { provide: "IDadosService", useClass: SigInService },
      { provide: "IIndexService", useClass: IndexService },
      { provide: "ISignUpService", useClass: SignUpService },
      { provide: "IProfileService", useClass: ProfileService },
      [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }]
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
