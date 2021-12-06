LEEME
Proyecto para aplicaciones móviles en su versión 2 para la corrección de errores y orden de los elementos.

<!-- Dependencias -->
npm install -g json-server
npm install @ionic/storage-angular
***
<!-- Librerias -->
npm install geolib
***
npm install @capacitor/android
npx cap add android
npx cap open android
***
ionic build --> para cambios
npx cap copy 
***
npm install @capacitor/geolocation
npx cap sync
***
ionic capacitor run android --livereload
***
npm i @capacitor-community/capacitor-googlemaps-native
***
<!-- deployment en telefono -->
ionic cap run android --livereload --external --source-map
***