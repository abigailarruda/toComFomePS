import { Component, OnInit, AfterViewInit, Inject } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { UserViewModel } from "../viewModels/user.viewModel";
import { ISignInService } from "../domain/interfaceService/iSignIn.service";
import { IProfileService } from "../domain/interfaceService/IProfile.service";

@Component({
  selector: "app-acc",
  templateUrl: "./acc.component.html",
  styleUrls: ["./acc.component.scss"]
})
export class ProfileComponent implements OnInit, AfterViewInit {
  public submitted = false;
  public users = new Array<UserViewModel>();
  formulario: FormGroup;
  mensagem: string;
  paises = ["Brasil", "Estados Unidos", "Inglaterra", "França", "Irlanda"];
  paisSelecionado: string;
  userLogado: UserViewModel;
  ngAfterViewInit(): void {}

  constructor(
    @Inject("IDadosService") private userService: ISignInService,
    @Inject("IProfileService") private profileService: IProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setupForm(new UserViewModel());
    this.userService.getUserOnline().subscribe(online => {
      online[0];
      this.userService.get().subscribe(res => {
        this.users = res;
        this.userLogado = res.find(x => x.key === online[0].key);
        this.form.pais.setValue(this.userLogado.country);
        this.form.email.setValue(this.userLogado.email);
        this.form.senha.setValue(this.userLogado.password);
        this.form.nome.setValue(this.userLogado.name);
        this.form.usuario.setValue(this.userLogado.username);
        this.form.id.setValue(this.userLogado.key);
        this.form.data.setValue(this.userLogado.dateOfBirth);
      });
    });
  }

  private setupForm(user: UserViewModel) {
    this.formulario = new FormGroup({
      id: new FormControl({ value: user.key }),
      email: new FormControl(
        { value: "", disabled: false },
        Validators.required
      ),
      senha: new FormControl(
        { value: "", disabled: false },
        Validators.required
      ),
      nome: new FormControl(
        { value: "", disabled: false },
        Validators.required
      ),
      pais: new FormControl(
        { value: "", disabled: false },
        Validators.required
      ),
      usuario: new FormControl(
        { value: "", disabled: false },
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

    this.profileService.updateProfile(user, this.form.id.value);
    this.mensagem = "Perfil atualizado com sucesso.";
  }

  limparAlerta() {
    this.mensagem = "";
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
