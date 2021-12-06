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
<!-- para crear carpeta android -->
npx cap add android
<!-- abre el proyecto en android studio -->
npx cap open android
***
ionic build --> para cambios
npx cap copy 
***
<!-- instalar geolocatio -->
npm install @capacitor/geolocation
npx cap sync
***
ionic capacitor run android --livereload
***
<!-- instalar googlemaps nativo con capacitor -->
npm i @capacitor-community/capacitor-googlemaps-native
***
<!-- deployment en telefono -->
ionic cap run android --livereload --external --source-map
***

