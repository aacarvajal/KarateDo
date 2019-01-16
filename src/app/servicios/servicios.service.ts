import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  //es un servicio que se podra usar en cualquier componente
  myCollection: any;

  constructor(private fireStore: AngularFirestore) { 

    this.myCollection =
      fireStore.collection<any>(environment.firebaseconfig.regisColeccion);

  }

  /*
    Recibe un objeto y lo guarda como un documento nuevo en la colección 'todo'
    Devuelve un Promise
    */
  agregaParticipante(datos) {
    return this.myCollection.add(datos);
  }
  /*
  Recupera todos los documentos (notas) de la colección 'todo'
  Devuelve un Observable
  */
  leeParticipantes() {
    return this.myCollection.get();
  }
  /*
  Recupera todos los campos de un documento concreto identificado por la clave id de la
  colección 'todo'
  Devuelve un Observable
  */
  leeParticipante(id) {
    return this.myCollection.doc(id).get();
  }
  /*
  Actualiza los campos (sobreescribe y añade) determinados por el objeto data en el
  documento identificado por id de la colección 'todo'
  Devuelve un Promise
  */
  actualizaParticipante(id, data) {
    return this.myCollection.doc(id).set(data);
  }

  borraParticipante(id) {

    return this.myCollection.doc(id).delete();

  }

}
