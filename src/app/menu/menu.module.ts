import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';
import { MenuRoutingModule } from './menu-routing.module';
import { Tab1PageModule } from '../tab1/tab1.module';
import { Tab2PageModule } from '../tab2/tab2.module';
import { Tab3PageModule } from '../tab3/tab3.module';

/*const routes: Routes = [
  {
    path: '',
    component: MenuPage
  }
];*/

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuRoutingModule,
    Tab1PageModule,
    Tab2PageModule,
    Tab3PageModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
