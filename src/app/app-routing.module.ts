import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },
  { path: 'tab3', loadChildren: './tab3/tab3.module#Tab3PageModule' },
  { path: 'modal-participante', loadChildren: './modal/modal-participante/modal-participante.module#ModalParticipantePageModule' },
  { path: 'modal-categoria', loadChildren: './modal/modal-categoria/modal-categoria.module#ModalCategoriaPageModule' },
  { path: 'puntos', loadChildren: './puntos/puntos.module#PuntosPageModule' },
  { path: 'puntos-participante', loadChildren: './modal/puntos-participante/puntos-participante.module#PuntosParticipantePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
