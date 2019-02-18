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
   */
  setLang(val) {
    this.props.lang = val;
    return this.storage.set("props", this.props);
  }
  
}
