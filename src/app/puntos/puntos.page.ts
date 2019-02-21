import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiciosService } from '../servicios/servicios.service';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ServPuntosService } from '../servicios/serv-puntos.service';
import { PuntosParticipantePage } from '../modal/puntos-participante/puntos-participante.page';

@Component({
  selector: 'app-puntos',
  templateUrl: './puntos.page.html',
  styleUrls: ['./puntos.page.scss'],
})
export class PuntosPage implements OnInit {

  @ViewChild('dynamicList') dynamicList;
  myloading: any;
  timeout;
  listPartic = [];
  listPanelPartic = [];

  /**
   * 
   * @param servPuntos 
   * @param loadingController 
   * 
   */
  constructor(public servPuntos: ServPuntosService,
    public loadingController: LoadingController) { }

  ngOnInit() {
  }

  //Analizar el ciclo de vida de los componentes: justo cuando se hace activa
  ionViewDidEnter() {//es igual que el ngInit
    this.show("Cargando");//texto de el loading
    this.servPuntos.leePuntos()
      .subscribe((querySnapshot) => {
        this.listPartic = [];
        //this.delete();
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          this.listPartic.push({ id: doc.id, ...doc.data() });
        });
        //console.log(this.listPuntos);
        this.listPanelPartic = this.listPartic;
        this.myloading.dismiss();
      });

  }

  /**
   * 
   * @param refresher recarga los datos que se recogen la base de datos
   * Esta función es llamada por el componente Refresher de IONIC v4
   */
  doRefresh(refresher) {
    this.servPuntos.leePuntos()
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

  }

  /**
   * 
   * @param msg muestra un modal
   * muestra el loading al iniciar
   */
  async show(msg) {
    this.myloading = await this.loadingController.create({
      message: msg,
      spinner: "bubbles",
      //animated: true,
      leaveAnimation: null
    });
    this.timeout = setTimeout(() => {
      this.myloading.dismiss();
      //this.toast.show(this.translate.instant("errorloading"));
    }, environment.tiempoMaxCarga);
    await this.myloading.present();
  }
  hide() {
    if (this.myloading) {
      clearTimeout(this.timeout);
      this.myloading.dismiss();
    }
  }

  //se guardara el metodo para futuros cambios en el caso de que se añada un editar puntos
  /*async editarPuntos(id: any, nombre: any, apellido: any, p1: any, p2: any, p3: any) {
    const modal = await this.modalController.create({
      component: PuntosParticipantePage,
      componentProps: { id, nombre, apellido, p1, p2, p3 }
    });

    modal.onDidDismiss()
      .then(() => {//se ejecuta cuando tiene exito

        this.ionViewDidEnter();

      });

    await modal.present();

  }*/

}

