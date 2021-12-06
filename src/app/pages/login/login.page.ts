import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StorageService } from 'src/app/services/bd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //se declara la estructura de usuario
  usuario = {
    id: null,
    user: 'ja.aravena',
    password: 'ja123',
    fullname: '',
    phone: '',
    email: '',
    role: ''
  }

  usuarios: any; //este será el arreglo que refleje la información del json
  encontrado = false; //este boolean se utiliza en la autenticación
  autenticado = false;
  userlength: any;

  constructor(public toast:ToastController,
              public alertController:AlertController,
              private api: UsuarioService,
              private storage: StorageService,
              private router: Router,
              ) { }

  async ngOnInit() {
    this.getUsuarios();
    //este if evalua si al entrar al login hay datos en el local storage
    //de haber datos, los va a borrar
    if(await this.storage.get("username")!== ""){
      this.storage.clear();
    }
  }

  async ionViewWillEnter() {
    this.getUsuarios();
    this.usuario.user="";
    this.usuario.password="";
  }


  //aquí se crea el componente Alert que se utilizará para recuperar la contraseña, consiste en una ventana emergente que se superpone al login
  async presentAlert() {
    const alert = await this.alertController.create({
      //aquí se asignan todas las propiedades que tiene el alert, como las clases de estilo, mensajes, input, botones, etc
      cssClass: 'font-monR',
      message: 'Para recuperar tu contraseña, ingresa tu usuario y te la enviaremos por correo electrónico.',
      backdropDismiss: false, //esta propiedad impide que cuando el usuario toque fuera del alert este desaparezca, permitiendo que desaparezca solo al presionar 'Cancelar'
      inputs: [
        {
          //aquí se declaran los input y sus propiedades, en este caso solo tenemos el nombre de usuario, que es lo que necesitamos para recuperar la contraseña
          type: 'text',
          name: 'user',
          label: 'Usuario',
          placeholder: 'ej.ejemplo',
        }
      ],
      buttons: [
        {
          //en los botones, tenemos el de envíar y el de cancelar, en este caso, se genera el mensaje de error dentro del botón de 'Enviar' usando lógica
          text: 'Enviar',
          role: 'submit',
          handler: (formData: { user: string }) => {
            if (formData.user && this.validarUsuario(formData.user).isValid) { //aquí estamos validando con un método creado mas abajo
              this.mostrarToast();
              return formData;
            } else {
              if (!alert.getElementsByClassName('mensaje-error').length) {
                const input = alert.getElementsByTagName('input')[0]; //aquí le estoy diciendo que input es el que tiene que enfocar
    
                const validationErrors = document.createElement('div');
                validationErrors.className = 'mensaje-error'; //aquí le digo que elemento HTML debe crear para contener el mensaje de error
    
                const errorMessage = document.createElement('small'); //aquí creamos otro elemento HTML que contendrá el mensaje
                errorMessage.classList.add('mensaje-error');
                errorMessage.textContent = 'El nombre de usuario no es válido.';
    
                validationErrors.appendChild(errorMessage);
    
                input.insertAdjacentElement('afterend', validationErrors);
              }
    
              return false;
            }
          }
        },
      {
        text: 'Cancelar',
        role: 'cancel',    
      }
      ]
    });
    await alert.present();
  }

  validarUsuario(user: string) {
    if(user.length >=3){
      return {
        isValid: true,
      };
    } else {
        return {
          isValid: false,
        }
    }
  }

  async mostrarToast() {
    await this.toast.create({
      cssClass: 'font-monR-blanca',
      message: 'Tu contraseña fue enviada a tu correo',
      duration: 3000,
      position: 'bottom'
    }).then(res => res.present())
  } 

  getUsuarios(){
    //recorrer el json, buscando el usuario y la password para compararlos con los ingresados
    this.api.getUsuarios().subscribe(
      (dato)=>{
        this.usuarios = dato;
      }
    )
  }
  //esta función nos permite validar que los campos usuario y password no esten vacíos y no tengan menos de 3 caracteres
  validarCredenciales(){
    if(this.usuario.user.length >=3){
      if(this.usuario.password.length >=3){
        this.autenticar()
      } else {
        this.toast.create({
          cssClass: 'font-monR mensaje-error',
          message: 'La contraseña debe tener al menos 3 caracteres',
          duration: 2500,
          position: 'middle'
        }).then(res => res.present())
      }  
    } else {
      this.toast.create({
        cssClass: 'font-monR mensaje-error',
        message: 'El nombre de usuario debe tener al menos 3 caracteres',
        duration: 2500,
        position: 'middle'
      }).then(res => res.present())
    }
  }

  autenticar(){
    this.encontrado = false;
    //este ciclo for recorre el array de usuarios que se carga con los datos del json
    for (let i = 0; i < this.usuarios.length; i++) {
      //aquí se compara que el usuario y la password sean iguales a las del json
      if(this.usuario.user===this.usuarios[i].user && this.usuario.password===this.usuarios[i].password){
        //aquí se guarda toda la información necesaria en el local storage, utilizando el servicio creado para ello
        this.storage.set('username', this.usuario.user)
        this.storage.set('password', this.usuario.password)
        this.storage.set('fullname', this.usuarios[i].fullname)
        this.storage.set('email', this.usuarios[i].email)
        this.storage.set('phone', this.usuarios[i].phone)
        this.storage.set('role', this.usuarios[i].role)
        this.storage.set('auth', true)
        this.storage.set('trip', "N")
        this.storage.set('tripid', 0)
        //falta cambiar el estado a activo en el json, o eliminar esa lógica
        //luego de guardar la información, se redirecciona al home
        this.router.navigate(['/home'])
        //este boolean se utiliza para la lógica del alert de error en caso de que no se pueda validar al usuario
        this.encontrado=true
        return 
      }
    }
    //este alert se muestra cuando el for termina de buscar y no encuentra el usuario
    if(this.encontrado==false){
      this.toast.create({
        cssClass: 'font-monR mensaje-error',
        message: 'Las credenciales no son válidas',
        duration: 2500,
        position: 'middle'
      }) .then(res => res.present())

    }
  }

}
