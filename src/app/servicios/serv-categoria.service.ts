import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServCategoriaService {

  myCollection: any;

  constructor(private fireStore: AngularFirestore) {

    this.myCollection =
      fireStore.collection<any>(environment.firebaseconfig.catColeccion);

  }

  /*
    Recibe un objeto y lo guarda como un documento nuevo en la colección 'todo'
    Devuelve un Promise
    */
  agregaCategoria(datos) {
    return this.myCollection.add(datos);
  }
  /*
  Recupera todos los documentos (notas) de la colección 'todo'
  Devuelve un Observable
  */
  leeCategorias() {
    return this.myCollection.get();
  }
  /*
  Recupera todos los campos de un documento concreto identificado por la clave id de la
  colección 'todo'
  Devuelve un Observable
  */
  leeCategoria(id) {
    return this.myCollection.doc(id).get();
  }
  /*
  Actualiza los campos (sobreescribe y añade) determinados por el objeto data en el
  documento identificado por id de la colección 'todo'
  Devuelve un Promise
  */
  actualizaCategoria(id, data) {
    
    return this.myCollection.doc(id).set(data);

  }

  borraCategoria(id) {

    return this.myCollection.doc(id).delete();

  }
}
