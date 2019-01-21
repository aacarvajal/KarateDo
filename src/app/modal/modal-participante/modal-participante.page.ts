import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, LoadingController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/servicios/servicios.service';

@Component({
  selector: 'app-modal-participante',
  templateUrl: './modal-participante.page.html',
  styleUrls: ['./modal-participante.page.scss'],
})
export class ModalParticipantePage implements OnInit {

  //estas variables se recuperaran de tab1 para que se pueda actualizar la nota
  id: any;
  nombre: any;
  apellido: any;
  edad: any;
  grado: any;
  public registro: FormGroup;
  myloading: any;//muestra un cartel de cargando

  constructor(public modalcontroller: ModalController,
    private formBuilder: FormBuilder,
    private serv: ServiciosService,
    private router: Router,
    public loadingController: LoadingController,
    public navparams: NavParams) {

    this.navparams.get('id');

    this.registro = this.formBuilder.group({

      nombre: [this.navparams.get('nombre'), Validators.required],
      apellido: [this.navparams.get('apellido')],
      edad: [this.navparams.get('edad')],
      grado: [this.navparams.get('grado')],

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
      grado: this.registro.get("grado").value
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

}
