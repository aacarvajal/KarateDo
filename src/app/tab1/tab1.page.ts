import { Component, ViewChild } from '@angular/core';
import { LoadingController, AlertController, ModalController, Platform, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios/servicios.service';
import { ServCategoriaService } from '../servicios/serv-categoria.service';
import { ModalParticipantePage } from '../modal/modal-participante/modal-participante.page';
import { ModalCategoriaPage } from '../modal/modal-categoria/modal-categoria.page';
import { environment } from 'src/environments/environment';
import { PuntosParticipantePage } from '../modal/puntos-participante/puntos-participante.page';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('dynamicList') dynamicList;
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: IonSlides;
  //@ViewChild('infiniteScroll') ionInfiniteScroll: IonInfiniteScroll;

  SwipedTabsIndicator: any = null;
  tabs = ["selectTab(0)", "selectTab(1)"];
  listPartic = [];
  listCateg = [];
  listPanelPartic = [];
  listPanelCat = [];
  myloading: any;
  timeout;
  public category: any = "0";
  ntabs = 2;

  karate: string = "participante";
  isAndroid: boolean = false;

  constructor(public serv: ServiciosService,
    public servCat: ServCategoriaService,
    public loadingController: LoadingController,
    public router: Router,
    public alertController: AlertController,
    public modalController: ModalController,
    public platform: Platform) {

    this.initializeItems();
    this.isAndroid = platform.is('android');

  }

  dismiss() {
    this.modalController.dismiss();
  }

  ionViewWillEnter() {
    this.category = "0";
    this.SwipedTabsSlider.length().then(l => {  //no sería necesario aquí, solo en ngOnInit
      this.ntabs = l;
    });
  }

  //Analizar el ciclo de vida de los componentes: justo cuando se hace activa
  ionViewDidEnter() {//es igual que el ngInit
    this.show("Cargando");//texto de el loading
    this.SwipedTabsIndicator = document.getElementById("indicator");
    this.serv.leeParticipantes()
      .subscribe((querySnapshot) => {
        this.listPartic = [];
        //this.delete();
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          this.listPartic.push({ id: doc.id, ...doc.data() });
        });
        //console.log(this.listPartic);
        this.listPanelPartic = this.listPartic;
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

        //this.SwipedTabsIndicator = document.getElementById("indicator");

      });

  }

  //Esta función es llamada por el componente Refresher de IONIC v4
  doRefresh(refresher) {
    this.serv.leeParticipantes()
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

  //edita un Participante ya creado
  //manda los datos que se mostraran en la pagina
  async editarParticipante(id: any, nombre: any, apellido: any, edad: any, grado: any, categoria: any ) {
    const modal = await this.modalController.create({
      component: ModalParticipantePage,
      componentProps: { id, nombre, apellido, edad, grado, categoria }
    });

    //actualiza el tab1 que mostrara la Participante modificada
    modal.onDidDismiss()
      .then(() => {//se ejecuta cuando tiene exito

        this.ionViewDidEnter();

      });

    await modal.present();

  }

  //muestra los datos que se mostraran en la pagina.
  async editarCategoria(id: any, descripcion: any, sistema: any) {
    const modal = await this.modalController.create({
      component: ModalCategoriaPage,
      componentProps: { id, descripcion, sistema }
    });

    //actualiza el tab1 que mostrara la Categoria modificada
    modal.onDidDismiss()
      .then(() => {//se ejecuta cuando tiene exito

        this.ionViewDidEnter();

      });

    await modal.present();

  }

  borrarParticipante(id) {

    this.serv.borraParticipante(id);

  }

  borrarCategoria(id) {

    this.servCat.borraCategoria(id);

  }


  //inicializa el array de filtrar
  initializeItems(): void {

    this.listPartic = this.listPanelPartic;
    this.listCateg = this.listPanelCat;

  }

  getFilteredParticipante($event) {
    // resetea todos los objetos y pone el array de nuevo con todos los elementos
    this.initializeItems();

    // Establece el valor del search bar
    const val = $event.target.value;

    // si el valor esta vacio no filtra 
    if (val && val.trim() != '') {
      this.listPanelPartic = this.listPartic.filter((item) => {
        //console.log(item.grado);
        return (item.grado.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  getFilteredCategoria($event) {
    // resetea todos los objetos y pone el array de nuevo con todos los elementos
    this.initializeItems();

    // Establece el valor del search bar
    const val = $event.target.value;

    // si el valor esta vacio no filtra 
    if (val && val.trim() != '') {
      this.listPanelCat = this.listCateg.filter((item) => {
        //console.log(item.grado);
        return (item.sistema.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  /* Actualiza la categoría que esté en ese momento activa*/
  updateCat(cat: Promise<any>) {
    cat.then(dat => {
      this.category = dat;
      this.category = +this.category; //to int;
      /*if (this.category == 1) {
        if (this.cloud.isInfinityScrollEnabled()) {
          this.ionInfiniteScroll.disabled = false;
        } else {
          this.ionInfiniteScroll.disabled = true;
        }
      } else {
        this.ionInfiniteScroll.disabled = false;
      }*/
    });
  }
  /* El método que permite actualizar el indicado cuando se cambia de slide*/
  updateIndicatorPosition() {
    this.SwipedTabsSlider.getActiveIndex().then(i => {
      if (this.ntabs > i) {  // this condition is to avoid passing to incorrect index
        this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (i * 100) + '%,0,0)';
      }
    });
  }
  /* El método que anima la "rayita" mientras nos estamos deslizando por el slide*/
  animateIndicator(e) {
    //console.log(e.target.swiper.progress);
    if (this.SwipedTabsIndicator)
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' +
        ((e.target.swiper.progress * (this.ntabs - 1)) * 100) + '%,0,0)';
  }

}
