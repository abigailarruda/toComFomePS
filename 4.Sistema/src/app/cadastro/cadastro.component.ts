import { Component, OnInit, AfterViewInit, Inject } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";
import { ISignUpService } from "../domain/interfaceService/iSignUp.service";
import { Router } from "@angular/router";
import { UserViewModel } from "../viewModels/user.viewModel";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"]
})
export class CadastroComponent implements OnInit, AfterViewInit {
  public submitted = false;
  formulario: FormGroup;
  erro: string;
  paises = ["Brasil", "Estados Unidos", "Inglaterra", "França", "Irlanda"];
  paisSelecionado: string;
  ngAfterViewInit(): void {}

  constructor(
    @Inject("ISignUpService") private singUpService: ISignUpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setupForm(new UserViewModel());
  }

  private setupForm(user: UserViewModel) {
    this.formulario = new FormGroup({
      id: new FormControl({ value: user.key }),
      email: new FormControl(
        { value: user.email, disabled: false },
        Validators.required
      ),
      senha: new FormControl(
        { value: user.password, disabled: false },
        Validators.required
      ),
      nome: new FormControl(
        { value: user.name, disabled: false },
        Validators.required
      ),
      pais: new FormControl(
        { value: user.country, disabled: false },
        Validators.required
      ),
      usuario: new FormControl(
        { value: user.username, disabled: false },
        Validators.required
      ),
      data: new FormControl(
        { value: this.defineData(user), disabled: false },
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          ValidateData
        ])
      )
    });
  }

  get form() {
    return this.formulario.controls;
  }

  defineData(user: UserViewModel): string {
    if (user == null || user.dateOfBirth == null) {
      return "";
    }
    return user.dateOfBirth;
  }

  salvar() {
    this.form.pais.setValue(this.paisSelecionado);
    this.submitted = true;
    if (this.formulario.invalid) {
      return;
    }
    var user = new UserViewModel();
    user.country = this.form.pais.value;
    user.dateOfBirth = this.form.data.value;
    user.email = this.form.email.value;
    user.name = this.form.nome.value;
    user.password = this.form.senha.value;
    user.username = this.form.usuario.value;
    this.singUpService.insert(user);
    this.router.navigate([""]);
  }
}

export function ValidateData(control: AbstractControl) {
  if (
    parseInt(control.value.substr(2, 2)) > 12 ||
    parseInt(control.value.substr(4, 6)) < 1900 ||
    parseInt(control.value.substr(0, 2)) > 31 ||
    parseInt(control.value.substr(4, 6)) > 2019
  ) {
    return { validDate: true };
  }
  return null;
}
