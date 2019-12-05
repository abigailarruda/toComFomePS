import { SignInRepository } from "../infrastructure/repository/signIn.repository";
import { NgModule } from "@angular/core";
import { IndexRepository } from "../infrastructure/repository/index.repository";
import { SignUpRepository } from "../infrastructure/repository/signup.repository";
import { ProfileRepository } from "../infrastructure/repository/profile.repository";

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    [
      { provide: "IDadosToken", useClass: SignInRepository },
      { provide: "IIndexRepository", useClass: IndexRepository },
      { provide: "IProfileRepository", useClass: ProfileRepository },
      { provide: "ISignUpRepository", useClass: SignUpRepository }
    ]
  ],
  bootstrap: []
})
export class DomainModule {}
