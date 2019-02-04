import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, LoadingController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { environment } from 'src/environments/environment';
import { PuntosParticipantePage } from '../puntos-participante/puntos-participante.page';
import { ServPuntosService } from 'src/app/servicios/serv-puntos.service';
import { ServCategoriaService } from 'src/app/servicios/serv-categoria.service';
import { NivelGrado } from '../../model/nivelGrado';

@Component({
  selector: 'app-modal-participante',
  templateUrl: './modal-participante.page.html',
  styleUrls: ['./modal-participante.page.scss'],
})
export class ModalParticipantePage implements OnInit {

  grados: NivelGrado[] = [

    { id: 1, grado: "Blanco" },
    { id: 2, grado: "Blanco-Amarillo" },
    { id: 3, grado: "Amarillo" },
    { id: 4, grado: "Amarillo-Naranja" },
    { id: 5, grado: "Naranja" },
    { id: 6, grado: "Naranja-Verde" },
    { id: 7, grado: "Verde" },
    { id: 8, grado: "Verde-Azul" },
    { id: 9, grado: "Azul" },
    { id: 10, grado: "Azul-Marron" },
    { id: 11, grado: "Marron" },
    { id: 12, grado: "Negro" }

  ];

  //estas variables se recuperaran de tab1 para que se pueda actualizar la nota
  id: any;
  public registro: FormGroup;
  myloading: any;//muestra un cartel de cargando
  timeout;
  listPartic = [];
  listPanelPartic = [];
  listCateg = [];
  listPanelCat = [];

  constructor(public modalcontroller: ModalController,
    private formBuilder: FormBuilder,
    private servCat: ServCategoriaService,
    private serv: ServiciosService,
    public servPuntos: ServPuntosService,
    public modalController: ModalController,
    public loadingController: LoadingController,
    public navparams: NavParams) {

    //this.navparams.get('id');

    this.registro = this.formBuilder.group({

      nombre: [this.navparams.get('nombre'), Validators.required],
      apellido: [this.navparams.get('apellido')],
      edad: [this.navparams.get('edad')],
      grado: [this.navparams.get('grado')],
      categoria: [this.navparams.get('categoria')]

    });
  }

  ngOnInit() {
  }

  //este metodo se encarga de deshabilitar el modal
  dismiss() {

    this.modalcontroller.dismiss();

  }

  //se ejecuta en el onsubmit

  actualizarFormulario() {

    let data = {
      nombre: this.registro.get("nombre").value,//se recoge el valor del titulo
      apellido: this.registro.get("apellido").value,//se recoge el valor de descripcion
      edad: this.registro.get("edad").value,
      grado: this.registro.get("grado").value,
      categoria: this.registro.get("categoria").value
    };

    //console.log("Id insertado", this.id)
    //se muestra el cartel de cargando
    this.myloading = this.presentLoading();

    //se llama al metodo de actualizar del servicio ToDo, al que se le pasaran los datos que se van a modificar
    this.serv.actualizaParticipante(this.id, data)

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

  ionViewDidEnter() {//es igual que el ngInit
    this.show("Cargando");//texto de el loading
    //categoria
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
        //no loading
        this.myloading.dismiss();
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

  async anadirPuntos() {
    console.log(this.registro.value.nombre);
    const modal = await this.modalController.create({
      component: PuntosParticipantePage,
      componentProps: {
        'nombre': this.registro.value.nombre, 'apellido': this.registro.value.apellido/*,
        'p1': this.registro.value.p1, 'p2': this.registro.value.p2, 'p3': this.registro.value.p3*/
      }
    });

    return await modal.present();

  }

}