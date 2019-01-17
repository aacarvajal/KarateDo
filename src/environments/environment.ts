// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseconfig : {
    apiKey: "AIzaSyCyJQEty1Ud83AIqzdrttQBxopOl7g3zTg",
    authDomain: "karatedo-3969f.firebaseapp.com",
    databaseURL: "https://karatedo-3969f.firebaseio.com",
    projectId: "karatedo-3969f",
    storageBucket: "karatedo-3969f.appspot.com",
    messagingSenderId: "539042406581",
    regisColeccion: "registro",
    catColeccion: "Categorias"
  },

  temaXDefecto:"light",  //tema por defecto
  idiomaDisponible:['es','en'], //idiomas disponibles de la aplicación
  idiomaXDefecto:"es",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
