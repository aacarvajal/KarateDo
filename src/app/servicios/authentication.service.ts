import { Injectable } from '@angular/core';
import { iProps } from '../model/iProps';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  props: iProps = {};

  constructor(private storage: Storage) { 

    this.props.lang = environment.idiomaXDefecto;
    this.props.skin = environment.temaXDefecto;

  }

  getSkin() {
    return this.props.skin;
  }

  setSkin(val) {
    this.props.skin = val;
    return this.storage.set("props", this.props);
  }

  getLang() {
    return this.props.lang;
  }

  setLang(val) {
    this.props.lang = val;
    return this.storage.set("props", this.props);
  }
  
}
