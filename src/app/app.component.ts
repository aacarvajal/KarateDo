import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './servicios/authentication.service';
import { ThemeSwitcherService } from './servicios/theme-switcher.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    {
      title: 'Listado',
      url: '',
      icon: 'home'
    },
    {
      title: 'Añadir participantes',
      url: '/tab2',
      icon: 'person-add'
    },
    {
      title: 'Añadir categorias',
      url: '/tab3',
      icon: 'add-circle'
    }
  ];

  langmenu: any;
  skinmenu: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private authS: AuthenticationService,
    private themeS: ThemeSwitcherService,
    private translate: TranslateService,
    private vibration: Vibration,
    private statusBar: StatusBar
  ) {

    this.skinmenu = (environment.temaXDefecto == "light" ? false : true);
    this.langmenu = (environment.idiomaXDefecto == "es" ? false : true);

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      /*Gestionamos el idioma del sistema: en función del lenguaje por defecto o
            el idioma del navegador si está disponible.
            */
      /*this.translate.addLangs(environment.idiomaDisponible);  //add all languages
      this.translate.setDefaultLang(environment.idiomaXDefecto); //use default language
      if (this.translate.getBrowserLang) {  //if browsers's language is avalaible is set up as default
        if (environment.idiomaDisponible.includes(this.translate.getBrowserLang())) {
          this.translate.use(this.translate.getBrowserLang());
        }
      }*/

      //Cargamos el estilo por defecto
      this.themeS.setTheme(environment.temaXDefecto);

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  changeSkin(e) {
    if (e.detail.checked) {
      this.authS.setSkin("dark");
      this.themeS.setTheme("dark");
    } else {
      this.authS.setSkin("light");
      this.themeS.setTheme("light");
    }
  }

  changeLang(e) {
    //console.log(e.detail.checked);
    if (e.detail.checked) {
      this.authS.setLang("en");
      this.translate.use("en");
    } else {
      this.authS.setLang("es");
      this.translate.use("es");
    }
  }

  vibracion() {
    console.log("vibra");
    this.vibration.vibrate([5000, 1500, 5000]);

  }

}
