import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MenuPage } from './menu.page';
import { Tab1Page } from '../tab1/tab1.page';
import { Tab2Page } from '../tab2/tab2.page';
import { Tab3Page } from '../tab3/tab3.page';

/*const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,

    children: [
      {

        path: 'tab1',
        outlet: 'menucontent',
        component: Tab1Page

      },
      {

        path: 'tab2',
        outlet: 'menucontent',
        component: Tab2Page

      },
      {

        path: 'tab3',
        outlet: 'menucontent',
        component: Tab3Page

      }
    ]
  },
  {

    path: '',
    redirectTo: '/menu/(menucontent:tab1)'

  }

];*/


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class MenuRoutingModule { }
