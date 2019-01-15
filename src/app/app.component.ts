import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './servicios/authentication.service';
import { ThemeSwitcherService } from './servicios/theme-switcher.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';


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
    private statusBar: StatusBar
  ) {

    this.skinmenu = (environment.temaXDefecto == "light" ? false : true);
    this.langmenu = (environment.idiomaXDefecto == "es" ? false : true);

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
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

}
