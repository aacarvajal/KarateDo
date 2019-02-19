import { Injectable } from '@angular/core';
import { iProps } from '../model/iProps';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  props: iProps = {};

  /**
   * 
   * @param storage 
   */
  constructor(private storage: Storage) { 

    this.props.lang = environment.idiomaXDefecto;
    this.props.skin = environment.temaXDefecto;

  }

  getSkin() {
    return this.props.skin;
  }

  /**
   * 
   * @param val 
   * @returns 
   * devuelve un string que nos dira que skin esta activa
   */
  setSkin(val) {
    this.props.skin = val;
    return this.storage.set("props", this.props);
  }

  getLang() {
    return this.props.lang;
  }

  /**
   * 
   * @param val 
   * @returns 
   * nos devolvera un string que nos dira que idioma esta activo
   */
  setLang(val) {
    this.props.lang = val;
    return this.storage.set("props", this.props);
  }
  
}
