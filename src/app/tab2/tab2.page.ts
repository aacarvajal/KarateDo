import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios/servicios.service';
import { ServCategoriaService } from '../servicios/serv-categoria.service';
import { environment } from 'src/environments/environment';
import { NivelGrado } from '../model/nivelGrado';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  //se crea un array que contendra todas las opciones
  //de una lista desplegable del modelo NivelGrado
  grado: NivelGrado[] = [

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

  listCateg = [];
  listPanelCat = [];
  timeout;
  public reg: FormGroup; //Instancia del FormGroup de nueva.page.html
  myloading: any; //mejorable con un servicio destinado a estos menesteres...
  //Lo usamos para mostrar un cargando mientras se realiza la operación.

  /**
   * 
   * @param formBuilder 
   * @param serv 
   * @param servCat 
   * @param toastController 
   * @param loadingController 
   * 
   */
  constructor(private formBuilder: FormBuilder,//sin el formbuilder no se pueden crear los campos dentro del formulario
    private serv: ServiciosService,
    private servCat: ServCategoriaService,
    private toastController: ToastController,
    public loadingController: LoadingController) {
    /* Creamos la relación entre el formulario de tab2.page.html y reg; además
   asociamos los validares y valores iniciales */
    this.reg = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      grado: ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }

  /* Se ejecuta al submit el formulario. Crea un objeto proveniente del formulario (sería
 igual que this.reg.value) y llama a la función agregaNota del servicio. Gestiona la
 Promise para sincronizar la interfaz. */
  logForm() {
    let data = {
      nombre: this.reg.get("nombre").value,
      apellido: this.reg.get("apellido").value,
      edad: this.reg.get("edad").value,
      grado: this.reg.get("grado").value,
      categoria: this.reg.get("categoria").value
    };
    /* Mostramos el cargando... */
    this.myloading = this.presentLoading();
    this.presentToast();
    this.serv.agregaParticipante(data)//envia la funcion
      .then((docRef) => {
        //console.log("ID insertado", docRef.id);//ultimo id
        /* Ponemos en blanco los campos del formulario*/
        this.reg.setValue({
          nombre: '',
          apellido: '',
          edad: '',
          grado: '',
          categoria: ''
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

  /*muestra un mensaje para confirmar que se ha añadido un nuevo participante*/
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Participante añadido',
      duration: 2000
    });
    toast.present();
  }

  //se encarga de leer las categorias para despues mostrarlas en una lista desplegable.
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

  /**
   * 
   * @param refresher 
   * 
   * Esta función es llamada por el componente Refresher de IONIC v4
   */
  doRefresh(refresher) {
    //categoria
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

  /**
   * 
   * @param msg 
   * 
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

}
