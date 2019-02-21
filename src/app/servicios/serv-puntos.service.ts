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
   * 
   */
  constructor(private fireStore: AngularFirestore) {

    this.myCollection =
      fireStore.collection<any>(environment.firebaseconfig.puntosColeccion);

  }

  /**
   * 
   * @param datos 
   * 
   */
  agregaPunto(datos) {

    return this.myCollection.add(datos);

  }

  /**
   * 
   * @returns Devuelve un Observable
   * Recupera todos los documentos (puntos) de la colección 'puntos'
   * 
   */
  leePuntos() {

    return this.myCollection.get();

  }

  /**
   * 
   * @param id 
   * @returns Devuelve un Observable
   * Recupera todos los campos de un documento concreto identificado por la clave id de la
   * colección 'participantes'
   * 
   */
  leePunto(id) {
    return this.myCollection.doc(id).get();
  }

  /**
   * 
   * @param id 
   * @param data
   * @returns Devuelve un Promise
   * sobrescribe los datos de un doc de un id en concreto
   * Actualiza los campos (sobreescribe y añade) determinados por el objeto data en el
   * documento identificado por id de la colección 'participante'
   *  
   */
  actualizaPunto(id, data) {

    return this.myCollection.doc(id).set(data);

  }

  //devuelve el id del elemento de la coleccion que se ha borrado
  /*borraPunto(id) {

    return this.myCollection.doc(id).delete();

  }*/
}
