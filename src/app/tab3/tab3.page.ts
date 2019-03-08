import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiciosService } from '../servicios/servicios.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ServCategoriaService } from '../servicios/serv-categoria.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public cat: FormGroup; //Instancia del FormGroup de nueva.page.html
  myloading: any; //mejorable con un servicio destinado a estos menesteres...
  //Lo usamos para mostrar un cargando mientras se realiza la operación.

  /**
   * 
   * @param formBuilder 
   * @param servC 
   * @param toastController 
   * @param loadingController 
   */
  constructor(private formBuilder: FormBuilder,//sin el formbuilder no se pueden crear los campos dentro del formulario
    private servC: ServCategoriaService,
    private toastController: ToastController,
    public loadingController: LoadingController) {
    /* Creamos la relación entre el formulario de nueva.page.html y cat; además
   asociamos los validares y valores iniciales */
    this.cat = this.formBuilder.group({
      descripcion: ['', Validators.required],
      sistema: ['', Validators.required]
    });
  }
  /* Se ejecuta al submit el formulario. Crea un objeto proveniente del formulario (sería
 igual que this.cat.value) y llama a la función agcataNota del servicio. Gestiona la
 Promise para sincronizar la interfaz. */
  logForm() {
    let data = {
      descripcion: this.cat.get("descripcion").value,
      sistema: this.cat.get("sistema").value
    };
    /* Mostramos el cargando... */
    this.myloading = this.presentLoading();
    this.presentToast();
    this.servC.agregaCategoria(data)//envia la funcion
      .then((docRef) => {
        //console.log("ID insertado", docRef.id);//ultimo id
        /* Ponemos en blanco los campos del formulario*/
        this.cat.setValue({
          descripcion: '',
          sistema: ''
        });
        /* Cerramos el cargando...*/
        this.loadingController.dismiss();//cierra el loading
        /*Podríamos ir a la página de listado*/
        //this.router.navigateByUrl('/tabs/(tab1:tab1)');
      })
      .catch((error) => {
        console.error("Error insertando documento: ", error);
        /* Cerramos el cargando...*/
        this.loadingController.dismiss();
        /* Mostramos un mensaje de error */
        /* A desarrollar, se aconseja emplear un componente denominado toast */
      });
  }
  
  /**
   * 
   * @returns devuelve un modal
   * Es un componente de la interfaz IONIC v4
   * 
   */
  async presentLoading() {
    this.myloading = await this.loadingController.create({
      message: 'Guardando'
    });
    return await this.myloading.present();
  }

  /*muestra un mensaje para confirmar que se ha añadido una nueva Categoria*/
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Categoria añadida',
      duration: 2000
    });
    toast.present();
  }

}
