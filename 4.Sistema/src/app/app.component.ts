import { Component } from '@angular/core';
import { Usuario } from './entidades/usuario.model';
import { DataService } from './database/data.service.component';
import { Login } from './entidades/login.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tocomfome';
  private logins = new Array<Login>();
  constructor(private service : DataService) { 
    this.criarLogins();
    }
    
  private criarUsuarios(){
    console.dir("asduhasuh")
    var usuario = new Usuario();
    usuario.id = 1;
    usuario.email = this.getEmailLogin(usuario.id);
    usuario.senha = this.getEmailSenha(usuario.id);
    usuario.nome = "Victor de Melo";
    usuario.usuario = "victor01";
    usuario.data = new Date(20,4,1998);
    usuario.pais = "Brasil";
    this.service.SalvarUsuario(usuario)

    var usuario2 = new Usuario();
    usuario2.id = 2;
    usuario2.email = this.getEmailLogin(usuario2.id);
    usuario2.senha = this.getEmailSenha(usuario2.id);
    usuario2.nome = "Abigail Arruda";
    usuario2.usuario = "bilinda";
    usuario2.data = new Date(17,4,2000);
    usuario2.pais = "Brasil";

    this.service.SalvarUsuario(usuario2);

    var usuario3 = new Usuario();
    usuario3.id = 3;
    usuario3.email = this.getEmailLogin(usuario3.id);
    usuario3.senha = this.getEmailSenha(usuario3.id);
    usuario3.nome = "Jacob Ferraz";
    usuario3.usuario = "poiaq";
    usuario3.data = new Date(7,4,1998);
    usuario3.pais = "Brasil";
    this.service.SalvarUsuario(usuario3);

    }

    private criarLogins(){
    var login = new Login();
    login.email = "victor01@hotmail.com";
    login.senha = "159";
    login.id = 1;
    this.logins.push(login);

    var login2 = new Login();
    login2.email = "bilinda@hotmail.com";
    login2.senha = "deusa";
    login2.id = 2;
    this.logins.push(login2);

    var login3 = new Login();
    login3.email = "poiaq@hotmail.com";
    login3.senha = "123";
    login3.id = 3;
    this.logins.push(login3);
    
    this.criarUsuarios();
    }

    getLogin(email : string , senha : string){
      const INDEX = this.logins.findIndex ( login => login.email == email && login.senha == senha);
      if(INDEX != -1) return this.logins[INDEX].id;
      return 0;
  }
    
  getEmailLogin(id : number){
      return this.logins.find( x => x.id == id).email;
  }

  getEmailSenha(id : number){
      return this.logins.find( x => x.id == id).senha;
  }


}

