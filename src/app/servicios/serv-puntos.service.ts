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
  /*
  Recupera todos los documentos (notas) de la colección 'todo'
  Devuelve un Observable
  */
  leePuntos() {
    return this.myCollection.get();
  }
  /*
  Recupera todos los campos de un documento concreto identificado por la clave id de la
  colección 'todo'
  Devuelve un Observable
  */
  /**
   * 
   * @param id 
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
   */
  borraPunto(id) {

    return this.myCollection.doc(id).delete();

  }
}
