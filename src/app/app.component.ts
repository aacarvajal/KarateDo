import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './servicios/authentication.service';
import { ThemeSwitcherService } from './servicios/theme-switcher.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Router } from '@angular/router';
import { Flashlight } from '@ionic-native/flashlight/ngx';

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
    },
    {
      title: 'Puntuacion',
      url: '/puntos',
      icon: 'add-circle'
    }
  ];

  langmenu: any;
  lint: any;
  skinmenu: any;

  /**
   * 
   * @param platform 
   * @param splashScreen 
   * @param authS 
   * @param router 
   * @param sensor 
   * @param themeS 
   * @param translate 
   * @param flashlight 
   * @param vibration 
   * @param statusBar 
   */
  constructor(private platform: Platform,
    private splashScreen: SplashScreen,
    private authS: AuthenticationService,
    private router: Router,
    private themeS: ThemeSwitcherService,
    private translate: TranslateService,
    private flashlight: Flashlight,
    private vibration: Vibration,
    private statusBar: StatusBar,
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
      this.translate.addLangs(environment.idiomaDisponible);  //add all languages
      this.translate.setDefaultLang(environment.idiomaXDefecto); //use default language
      if (this.translate.getBrowserLang) {  //if browsers's language is avalaible is set up as default
        if (environment.idiomaDisponible.includes(this.translate.getBrowserLang())) {
          this.translate.use(this.translate.getBrowserLang());
        }
      }

      //Cargamos el estilo por defecto
      this.themeS.setTheme(environment.temaXDefecto);

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  lista() {

    this.router.navigate(['']);

  }

  partic() {

    this.router.navigate(['tab2']);

  }

  categ() {

    this.router.navigate(['tab3']);

  }

  puntos() {

    this.router.navigate(['puntos']);

  }

/**
 * 
 * @param e 
 */
  changeSkin(e) {
    if (e.detail.checked) {
      this.authS.setSkin("dark");
      this.themeS.setTheme("dark");
    } else {
      this.authS.setSkin("light");
      this.themeS.setTheme("light");
    }

    this.vibration.vibrate(500);

  }

  /**
   * 
   * @param e 
   */
  changeLang(e) {
    //console.log(e.detail.checked);
    if (e.detail.checked) {
      this.authS.setLang("en");
      this.translate.use("en");
    } else {
      this.authS.setLang("es");
      this.translate.use("es");
    }

    this.vibration.vibrate(500);

  }

  vibracion() {
    console.log("vibra");
    this.vibration.vibrate([5000, 1500, 5000]);

  }

  /**
   * 
   * @param e 
   */
  linterna(e){

    if (e.detail.checked) {
      this.flashlight.switchOn();
    } else {
      this.flashlight.switchOff();
    }

    this.vibration.vibrate(500);
    
  }

}
