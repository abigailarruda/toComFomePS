import { Component, OnInit, AfterViewInit, Inject } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { ISignInService } from "../domain/interfaceService/iSignIn.service";
import { UserViewModel } from "../viewModels/user.viewModel";
import { AngularFireDatabase } from "@angular/fire/database";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, AfterViewInit {
  public users = new Array<UserViewModel>();
  public submitted = false;
  formulario: FormGroup;
  erro: string;
  constructor(
    @Inject("IDadosService") private siginService: ISignInService,
    private router: Router,
    private firebase: AngularFireDatabase
  ) {
    this.users = [];
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.setupForm(new UserViewModel());
    this.siginService.get().subscribe(res => {
      this.users = res;
    });
  }

  private setupForm(user: UserViewModel) {
    this.formulario = new FormGroup({
      email: new FormControl(
        { value: user.email, disabled: false },
        Validators.required
      ),
      senha: new FormControl(
        { value: user.password, disabled: false },
        Validators.required
      )
    });
  }

  get form() {
    return this.formulario.controls;
  }

  logar() {
    this.submitted = true;
    if (this.formulario.invalid) return;
    var userCurrent = this.users.find(
      x =>
        x.email == this.form.email.value && x.password == this.form.senha.value
    );
    if (userCurrent != null) {
      this.siginService.getUserOnline().subscribe(res => {
        var usuario = new UserViewModel();
        usuario.name = userCurrent.name;
        usuario.chave = userCurrent.key;
        this.siginService.UpdatetUserOnline(usuario, res[0].key);
        this.router.navigate(["index"]);
      });
    } else {
      this.erro = "Email ou senha incorretos.";
    }
  }

  limparAlerta() {
    this.erro = "";
  }
}
