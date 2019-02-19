import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  //es un servicio que se podra usar en cualquier componente
  myCollection: any;

  /**
   * 
   * @param fireStore 
   */
  constructor(private fireStore: AngularFirestore) {

    this.myCollection =
      fireStore.collection<any>(environment.firebaseconfig.regisColeccion);

  }

  /**
   * 
   * @param datos 
   * Recibe un objeto y lo guarda como un documento nuevo en la colección 'participante'
   * @returns
   * Devuelve un Promise
   */
  agregaParticipante(datos) {
    return this.myCollection.add(datos);
  }

 /**
  * Recupera participantes los documentos (participante) de la colección 'participante'
  * @returns
  * Devuelve un Observable
  */
  leeParticipantes() {
    return this.myCollection.get();
  }

  /**
   * 
   * @param id 
   * Recupera participantes los campos de un documento concreto 
   * identificado por la clave id de la colección 'participante'
   * @returns
   * Devuelve un Observable
   */
  leeParticipante(id) {
    return this.myCollection.doc(id).get();
  }

  /**
   * 
   * @param id 
   * @param data 
   * Actualiza los campos (sobreescribe y añade) determinados por el 
   * objeto data en el documento identificado por id de la colección 'participante'
   * @returns
   * Devuelve un Promise
   */
  actualizaParticipante(id, data) {
    return this.myCollection.doc(id).set(data);
  }

  /**
   * 
   * @param id 
   */
  borraParticipante(id) {

    return this.myCollection.doc(id).delete();

  }

}
