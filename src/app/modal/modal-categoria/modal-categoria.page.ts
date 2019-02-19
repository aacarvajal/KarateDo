import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, LoadingController, NavParams } from '@ionic/angular';
import { ServiciosService } from 'src/app/servicios/servicios.service';
import { Router } from '@angular/router';
import { ServCategoriaService } from 'src/app/servicios/serv-categoria.service';

@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.page.html',
  styleUrls: ['./modal-categoria.page.scss'],
})
export class ModalCategoriaPage implements OnInit {

  //estas variables se recuperaran de tab1 para que se pueda actualizar la categoria
  id: any;
  public Categoria: FormGroup;
  myloading: any;//muestra un cartel de cargando

  /**
   * 
   * @param modalcontroller 
   * @param formBuilder 
   * @param servCat 
   * @param loadingController 
   * @param navparams 
   */
  constructor(public modalcontroller: ModalController,
    private formBuilder: FormBuilder,
    private servCat: ServCategoriaService,
    public loadingController: LoadingController,
    public navparams: NavParams) {

    this.navparams.get('id');

    //rellena el formulario con los datos recogidos de la BBDD
    this.Categoria = this.formBuilder.group({

      descripcion: [this.navparams.get('descripcion'), Validators.required],
      sistema: [this.navparams.get('sistema')],

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
      descripcion: this.Categoria.get("descripcion").value,//se recoge el valor del titulo
      sistema: this.Categoria.get("sistema").value//se recoge el valor de descripcion
    };

    //console.log("Id insertado", this.id)
    //se muestra el cartel de cargando
    this.myloading = this.presentLoading();

    //se llama al metodo de actualizar del servicio ToDo, al que se le pasaran los datos que se van a modificar
    this.servCat.actualizaCategoria(this.id, data)

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

  //
  /**
   * @returns
   * ejercuta un cartel asincrono de guardando
   */
  async presentLoading() {
    this.myloading = await this.loadingController.create({
      message: 'Guardando'
    });
    return await this.myloading.present();
  }

}
