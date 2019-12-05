import { Injectable } from '@angular/core';
import { Login } from '../entidades/login.model';
import { Usuario } from '../entidades/usuario.model';

@Injectable({ providedIn: 'root' })
export class   DataService {
    private paises = new Array<string>();

    getUsuario(id : number){
        var jsonTarefa = window.localStorage.getItem(id.toString());
        console.dir(JSON.parse(jsonTarefa))
        return JSON.parse(jsonTarefa);
    }

    setUsuario(usuario : Usuario){
        this.SalvarUsuario(usuario);
        return true;
    }

     SalvarUsuario( usuario : Usuario){
        var jsonAux = JSON.stringify(usuario);
        window.localStorage.setItem(usuario.id.toString(), jsonAux);
    }

    setUsuarioLogado( id : number){
        window.localStorage.removeItem('logado');
        window.localStorage.setItem('logado',id.toString());
    }

    getUsuarioLogado(){
      return  parseInt(window.localStorage.getItem('logado'));
    }


    getPaises(){
        return this.paises;
    }

    private criarPaises(){
        this.paises.push("Brasil");
        this.paises.push("Argentina");
        this.paises.push("França");
        this.paises.push("Cuba");
        }
        
}


