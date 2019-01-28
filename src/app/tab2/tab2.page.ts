import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios/servicios.service';
import { ServCategoriaService } from '../servicios/serv-categoria.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  listCateg = [];
  listPanelCat = [];
  timeout;
  private reg: FormGroup; //Instancia del FormGroup de nueva.page.html
  myloading: any; //mejorable con un servicio destinado a estos menesteres...
  //Lo usamos para mostrar un cargando mientras se realiza la operación.

  constructor(private formBuilder: FormBuilder,//sin el formbuilder no se pueden crear los campos dentro del formulario
    private serv: ServiciosService,
    private servCat: ServCategoriaService,
    private router: Router,
    public loadingController: LoadingController) {
    /* Creamos la relación entre el formulario de nueva.page.html y reg; además
   asociamos los validares y valores iniciales */
    this.reg = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: [''],
      edad: [''],
      grado: [''],
      categoria: ['']
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
  /* Es un componente de la interfaz IONIC v4 */
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

  //Esta función es llamada por el componente Refresher de IONIC v4
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

}
