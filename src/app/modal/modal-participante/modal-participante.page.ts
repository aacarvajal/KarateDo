import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, LoadingController, NavParams } from '@ionic/angular';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { environment } from 'src/environments/environment';
import { PuntosParticipantePage } from '../puntos-participante/puntos-participante.page';
import { ServCategoriaService } from 'src/app/servicios/serv-categoria.service';
import { NivelGrado } from '../../model/nivelGrado';

@Component({
  selector: 'app-modal-participante',
  templateUrl: './modal-participante.page.html',
  styleUrls: ['./modal-participante.page.scss'],
})
export class ModalParticipantePage implements OnInit {

  //se crea un array que contendra todas las opciones
  //de una lista desplegable del modelo NivelGrado
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

  //estas variables se recuperaran de tab1 para que se pueda actualizar el participante
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
    public modalController: ModalController,
    public loadingController: LoadingController,
    public navparams: NavParams) {

    //recupera todos los datos de la BBDD para despues insertarlos
    //en el formulario, cada uno en su campo correspondiente
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
  //recoge todos los datos para despues sobreescribir lo que ya hay en la BBDD
  actualizarFormulario() {

    let data = {
      nombre: this.registro.get("nombre").value,//se recoge el valor del nombre
      apellido: this.registro.get("apellido").value,//se recoge el valor de apellido
      edad: this.registro.get("edad").value,//se recoge el valor de edad
      grado: this.registro.get("grado").value,//se recoge el valor de grado
      categoria: this.registro.get("categoria").value//se recoge el valor de categoria
    };

    //console.log("Id insertado", this.id)
    //se muestra el cartel de cargando
    this.myloading = this.presentLoading();

    //se llama al metodo de actualizar del servicio serv-categoria, 
    //al que se le pasaran los datos que se van a modificar
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

  //ejercuta un cartel asincronico de guardando
  async presentLoading() {
    this.myloading = await this.loadingController.create({
      message: 'Guardando'
    });
    return await this.myloading.present();
  }

  //este metodo se encarga de mostrar las categorias guardadas en la BBDD
  ionViewDidEnter() {//es igual que el ngInit
    this.show("Cargando");//texto de el loading
    //categoria
    this.servCat.leeCategorias()
      .subscribe((querySnapshot) => {
        this.listCateg = [];
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

  //este metodo se encarga de recoger el valor tanto el nombre como el apellido del participante
  //para despues mostrarlo en la siguiente ventana donde se añadiran puntos a ese participante.
  async anadirPuntos() {
    console.log(this.registro.value.nombre);
    const modal = await this.modalController.create({
      component: PuntosParticipantePage,
      componentProps: {
        'nombre': this.registro.value.nombre, 'apellido': this.registro.value.apellido
      }
    });

    return await modal.present();

  }

}