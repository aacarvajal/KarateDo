import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServPuntosService } from 'src/app/servicios/serv-puntos.service';
import { LoadingController, NavParams, ModalController, Platform } from '@ionic/angular';
import { ServiciosService } from 'src/app/servicios/servicios.service';

@Component({
  selector: 'app-puntos-participante',
  templateUrl: './puntos-participante.page.html',
  styleUrls: ['./puntos-participante.page.scss'],
})
export class PuntosParticipantePage implements OnInit {
  ngOnInit(): void { }

  private puntos: FormGroup;
  myloading: any;
  listPuntos = [];
  listPanelPuntos = [];
  @Input() nombre: any;
  @Input() apellido: any;

  /**
   * se crea un objeto por cada clase necesaria
   * @param serv 
   * @param servPuntos 
   * @param loadingController 
   * @param formBuilder 
   * @param modalController 
   * @param navparams 
   * @param platform 
   */
  constructor(public serv: ServiciosService,
    public servPuntos: ServPuntosService,
    public loadingController: LoadingController,
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    public navparams: NavParams,
    public platform: Platform) {

    this.initializeItems();

    this.navparams.get('id');

    //recupera los datos
    this.puntos = this.formBuilder.group({

      nombre: [this.navparams.get('nombre')],
      apellido: [this.navparams.get('apellido')],
      p1: [this.navparams.get('p1'), Validators.required],
      p2: [this.navparams.get('p2'), Validators.required],
      p3: [this.navparams.get('p3'), Validators.required]

    });

  }

  dismiss() {
    this.modalController.dismiss();
  }

  //se ejecuta en el onsubmit
  //recoge todos los datos para despues sobreescribir lo que ya hay en la BBDD
  actualizarFormulario() {

    let data = {
      nombre: this.puntos.get("nombre").value,//se recoge el valor del nombre
      apellido: this.puntos.get("apellido").value,//se recoge el valor de apellido
      p1: this.puntos.get("p1").value,//se recoge el valor de p1
      p2: this.puntos.get("p2").value,//se recoge el valor de p2
      p3: this.puntos.get("p3").value,//se recoge el valor de p3
    };

    //console.log("Id insertado", this.id)
    //se muestra el cartel de cargando
    this.myloading = this.presentLoading();

    //se llama al metodo de actualizar del servicio serv-puntos, 
    //al que se le pasaran los datos del formulario anterior
    //para que pueda añadir puntos
    this.servPuntos.agregaPunto(data)

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

  /**
   * @returns devuelve un modal
   * 
   * ejercuta un cartel asincrono de guardando
   */
  async presentLoading() {
    this.myloading = await this.loadingController.create({
      message: 'Guardando'
    });
    return await this.myloading.present();
  }

  //inicializa el array de filtrar
  initializeItems(): void {

    this.listPuntos = this.listPanelPuntos;

  }

}
