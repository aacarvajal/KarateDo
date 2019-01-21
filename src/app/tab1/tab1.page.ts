import { Component, ViewChild } from '@angular/core';
import { LoadingController, AlertController, ModalController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios/servicios.service';
import { ServCategoriaService } from '../servicios/serv-categoria.service';
import { ModalParticipantePage } from '../modal/modal-participante/modal-participante.page';
import { ModalCategoriaPage } from '../modal/modal-categoria/modal-categoria.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('dynamicList') dynamicList;
  listPartic = [];
  listCateg = [];
  listPanelPartic = [];
  listPanelCat = [];

  karate: string = "participante";
  isAndroid: boolean = false;

  constructor(private serv: ServiciosService,
    private servCat: ServCategoriaService,
    public loadingController: LoadingController,
    private router: Router,
    private alertController: AlertController,
    public modalController: ModalController,
    platform: Platform) {

    this.initializeItems();
    this.isAndroid = platform.is('android');

  }

  //Analizar el ciclo de vida de los componentes: justo cuando se hace activa
  ionViewDidEnter() {//es igual que el ngInit
    this.presentLoading("Cargando");//texto de el loading
    this.serv.leeParticipantes()
      .subscribe((querySnapshot) => {
        this.listPartic = [];
        //this.delete();
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          this.listPartic.push({ id: doc.id, ...doc.data() });
        });
        //console.log(this.listPartic);
        this.listPanelPartic = this.listPartic;
        this.loadingController.dismiss();
      });

      this.presentLoading("Cargando");//texto de el loading
      this.servCat.leeCategorias()
        .subscribe((querySnapshot) => {
          this.listCateg = [];
          //this.delete();
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            this.listCateg.push({ id: doc.id, ...doc.data() });
          });
          //console.log(this.listPartic);
          this.listPanelCat = this.listCateg;
          this.loadingController.dismiss();
        });

  }

  //Esta función es llamada por el componente Refresher de IONIC v4
  doRefresh(refresher) {
    this.serv.leeParticipantes()
      .subscribe(querySnapshot => {
        this.listPartic = [];
        //this.delete(); //Es un hack para solucionar un bug con el refresher y las listas
        // dinámicas (ngFor) 
        querySnapshot.forEach((doc) => {
          //console.log(doc.data());//.data devuelve un objeto
          //paydata devuelve un objeto de un array
          this.listPartic.push({ id: doc.id, ...doc.data() });//push=añadir elementos a un array
          //los 3 puntos en typescript convierte un objeto a json
        });
        this.listPanelPartic = this.listPartic;
        refresher.target.complete();//para que se cierre el refresh
      });

      this.servCat.leeCategorias()
      .subscribe(querySnapshot => {
        this.listCateg = [];
        //this.delete(); //Es un hack para solucionar un bug con el refresher y las listas
        // dinámicas (ngFor) 
        querySnapshot.forEach((doc) => {
          //console.log(doc.data());//.data devuelve un objeto
          //paydata devuelve un objeto de un array
          this.listCateg.push({ id: doc.id, ...doc.data() });//push=añadir elementos a un array
          //los 3 puntos en typescript convierte un objeto a json
        });
        this.listPanelCat = this.listCateg;
        refresher.target.complete();//para que se cierre el refresh
      });
  }

  /*async delete() { //para solucionar el tema de list-items-sliding con ngfor
    await this.dynamicList.closeSlidingItems();
  }*/

  async presentLoading(msg) {
    let myloading = await this.loadingController.create({
      message: msg
    });
    return await myloading.present();
  }

  //edita una Participante ya creada
  async editarParticipante(id: any, nombre: any, apellido: any, edad: any, grado: any) {
    const modal = await this.modalController.create({
      component: ModalParticipantePage,
      componentProps: { id, nombre, apellido, edad, grado}
    });

    //actualiza el tab1 que mostrara la Participante modificada
    modal.onDidDismiss()
      .then(() => {//se ejecuta cuando tiene exito

        this.ionViewDidEnter();

      });

    await modal.present();

  }

  async editarCategoria(id: any, descripcion: any, sistema: any) {
    const modal = await this.modalController.create({
      component: ModalCategoriaPage,
      componentProps: { id, descripcion, sistema}
    });

    //actualiza el tab1 que mostrara la Participante modificada
    modal.onDidDismiss()
      .then(() => {//se ejecuta cuando tiene exito

        this.ionViewDidEnter();

      });

    await modal.present();

  }

  /*irNueva() {
    console.log("Ir a Nueva")
    this.router.navigateByUrl('/tabs/(tab2:tab2)');
  }*/

  borrarParticipante(id) {

    this.serv.borraParticipante(id);

  }

  borrarCategoria(id) {

    this.servCat.borraCategoria(id);

  }

  async presentAlertConfirm(id: any) {
    const alert = await this.alertController.create({
      header: '!Atención!',
      message: '¿Quiere borrar la Participante?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',

        }, {
          text: 'Aceptar',
          handler: () => {
            this.borrarParticipante(id);
            this.ionViewDidEnter();//refresca automaticamente despues de borrar
            //console.log('Confirmar');
          }
        }
      ]
    });

    await alert.present();
  }


  //inicializa el array de filtrar
  initializeItems(): void {

    this.listPartic = this.listPanelPartic;
    this.listCateg = this.listPanelCat;

  }

  getFilteredParticipante($event) {
    // resetea serv los objetos y pone el array de nuevo con serv los elementos
    this.initializeItems();

    // Establece el valor del search bar
    const val = $event.target.value;

    // si el valor esta vacio no filtra 
    if (val && val.trim() != '') {
      this.listPanelPartic = this.listPartic.filter((item) => {
        //console.log(item.grado);
        return (item.grado.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getFilteredCategoria($event) {
    // resetea serv los objetos y pone el array de nuevo con serv los elementos
    this.initializeItems();

    // Establece el valor del search bar
    const val = $event.target.value;

    // si el valor esta vacio no filtra 
    if (val && val.trim() != '') {
      this.listPanelCat = this.listCateg.filter((item) => {
        //console.log(item.grado);
        return (item.sistema.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
