import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServPuntosService {

  myCollection: any;

  /**
   * 
   * @param fireStore 
   */
  constructor(private fireStore: AngularFirestore) {

    this.myCollection =
      fireStore.collection<any>(environment.firebaseconfig.puntosColeccion);

  }

  /**
   * 
   * @param datos 
   */
  agregaPunto(datos) {
    return this.myCollection.add(datos);
  }

 /**
  * @returns
  * Recupera todos los documentos (puntos) de la colección 'puntos'
  * Devuelve un Observable
  */
  leePuntos() {
    return this.myCollection.get();
  }

  /**
   * 
   * @param id 
   * @returns 
   * Recupera todos los campos de un documento concreto identificado por la clave id de la
   * colección 'todo'
   * Devuelve un Observable
   */
  leePunto(id) {
    return this.myCollection.doc(id).get();
  }

  /**
   * 
   * @param id 
   * @param data
   * @returns sobrescribe los datos de un doc de un id en concreto
   * Actualiza los campos (sobreescribe y añade) determinados por el objeto data en el
   * documento identificado por id de la colección 'todo'
   * Devuelve un Promise
   *  
   */
  actualizaPunto(id, data) {

    return this.myCollection.doc(id).set(data);

  }

  /**
   * 
   * @param id 
   * @returns devuelve el id del elemento de la coleccion que se ha borrado
   */
  borraPunto(id) {

    return this.myCollection.doc(id).delete();

  }
}
