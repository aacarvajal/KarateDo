import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ServPuntosService } from 'src/app/servicios/serv-puntos.service';
import { LoadingController, NavParams, AlertController, ModalController, Platform } from '@ionic/angular';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ModalParticipantePage } from '../modal-participante/modal-participante.page';

@Component({
  selector: 'app-puntos-participante',
  templateUrl: './puntos-participante.page.html',
  styleUrls: ['./puntos-participante.page.scss'],
})
export class PuntosParticipantePage implements OnInit {
  ngOnInit(): void { }

  private puntos: FormGroup;
  myloading: any;
  id: any;
  /*nombre: any;
  apellido: any;
  p1: any;
  p2: any;
  p3: any;*/
  timeout;
  listPuntos = [];
  listPanelPuntos = [];
  @Input() nombre: any;


  constructor(public serv: ServiciosService,
    public servPuntos: ServPuntosService,
    public loadingController: LoadingController,
    public router: Router,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    public modalController: ModalController,
    public navparams: NavParams,
    public platform: Platform) {

    this.initializeItems();

    this.navparams.get('id');

    this.puntos = this.formBuilder.group({

      nombre: [this.navparams.get('nombre'), Validators.required],
      apellido: [this.navparams.get('apellido'), Validators.required],
      p1: [this.navparams.get('p1')],
      p2: [this.navparams.get('p2')],
      p3: [this.navparams.get('p3')],

    });

  }

  dismiss() {
    this.modalController.dismiss();
  }

  actualizarFormulario() {

    let data = {
      nombre: this.puntos.get("nombre").value,
      apellido: this.puntos.get("apellido").value,
      p1: this.puntos.get("p1").value,
      p2: this.puntos.get("p2").value,
      p3: this.puntos.get("p3").value,
    };

    //console.log("Id insertado", this.id)
    //se muestra el cartel de cargando
    this.myloading = this.presentLoading();

    //se llama al metodo de actualizar del servicio ToDo, al que se le pasaran los datos que se van a modificar
    this.servPuntos.actualizaPunto(this.id, data)

      .then((docRef) => {

        //se cierra el cartel de cargando
        this.loadingController.dismiss();

        this.dismiss();
      })
      .catch((error) => {

        //muestra un mensaje de error
        console.error("Error al insertar: ", error);
        //se cierra el cartel de cargando
        this.loadingController.dismiss();

      });
  }

  //ejercuta un cartel de guardando
  async presentLoading() {
    this.myloading = await this.loadingController.create({
      message: 'Guardando'
    });
    return await this.myloading.present();
  }

  //Analizar el ciclo de vida de los componentes: justo cuando se hace activa
  ionViewDidEnter() {//es igual que el ngInit
    this.show("Cargando");//texto de el loading
    this.serv.leeParticipantes()
      .subscribe((querySnapshot) => {
        this.listPuntos = [];
        //this.delete();
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          this.listPuntos.push({ id: doc.id, ...doc.data() });
        });
        //console.log(this.listPuntos);
        this.listPanelPuntos = this.listPuntos;

        this.myloading.dismiss();
      });


  }

  //Esta función es llamada por el componente Refresher de IONIC v4
  doRefresh(refresher) {
    this.serv.leeParticipantes()
      .subscribe(querySnapshot => {
        this.listPuntos = [];
        //this.delete(); //Es un hack para solucionar un bug con el refresher y las listas
        // dinámicas (ngFor) 
        querySnapshot.forEach((doc) => {
          //console.log(doc.data());//.data devuelve un objeto
          //paydata devuelve un objeto de un array
          this.listPuntos.push({ id: doc.id, ...doc.data() });//push=añadir elementos a un array
          //los 3 puntos en typescript convierte un objeto a json
        });
        this.listPanelPuntos = this.listPuntos;
        refresher.target.complete();//para que se cierre el refresh

      });

  }

  //muestra el loading al iniciar
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

  // async anadirPuntos(id: any, nombre: any, apellido: any,p1: any, p2:any, p3:any) {
  //   const modal = await this.modalController.create({
  //     component: PuntosParticipantePage,
  //     componentProps: { id, nombre, apellido, p1, p2, p3 }
  //   });

  //   modal.onDidDismiss()
  //     .then(() => {//se ejecuta cuando tiene exito

  //       this.ionViewDidEnter();

  //     });

  //   await modal.present();

  // }

  //inicializa el array de filtrar
  initializeItems(): void {

    this.listPuntos = this.listPanelPuntos;

  }

}
