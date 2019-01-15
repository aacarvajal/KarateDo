import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  rutaSelec = '';

  pages = [
    {

      title: 'Listado',
      url: '/menu/(menucontent:tab1)',

    },
    {

      title: 'Añadir participante',
      url: '/menu/(menucontent:tab2)',

    },
    {

      title: 'Añadir Categorias',
      url: '/menu/(menucontent:tab3)',

    }

  ];

  constructor(private router: Router) {

    this.router.events.subscribe((event: RouterEvent) => {

      this.rutaSelec = event.url;

    });

  }

  ngOnInit() {
  }

}
