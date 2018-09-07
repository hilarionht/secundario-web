import { UsuarioService } from './../../../services/usuario/usuario.service';
import { Usuario } from './../../../models/usuario.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CropperSettings, Bounds, ImageCropperComponent } from 'ng2-img-cropper';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {
  //prop de imagen
  
  name: string;
  data1: any;
  cropperSettings: CropperSettings;

  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  //porp de imagen end
  usuario: Usuario;
  id : any;
  accion:string='Alta';
  constructor(
    public userService: UsuarioService, 
    public routeActivate: ActivatedRoute,
    public router: Router
  ) {
    this.routeActivate.params.subscribe( param => {
      this.id = param['id'];
      this.usuario = new Usuario(null,null,null,null,null,null,null,null,true,this.id);
      if(this.id !== 'nuevo'){
        this.userService.obtenerUsuario(this.id).subscribe((usuario:any) => {
          this.usuario = usuario;
          this.accion='Edicion';
        } );
        
      }

    })
        this.name = 'Angular2';
        this.cropperSettings = new CropperSettings();

        this.cropperSettings.noFileInput = true;

        this.cropperSettings.width = 100;
        this.cropperSettings.height = 100;

        this.cropperSettings.croppedWidth = 100;
        this.cropperSettings.croppedHeight = 100;

        this.cropperSettings.canvasWidth = 220;
        this.cropperSettings.canvasHeight = 200;

        this.cropperSettings.minWidth = 100;
        this.cropperSettings.minHeight = 100;

        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(0,0,0,.25)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

        this.cropperSettings.rounded = false;

        this.data1 = {};
   }

  addUser(form?: NgForm) {
    console.log('clicked'+ this.id, 'FormValue: '+ form.value.id );
    
    if(form.value.id ==="nuevo") {
      this.userService.crearUsuario(form.value)
        .subscribe(res => {
          this.resetForm(form);
          //this.getUsers();
          this.router.navigate(['config/list']);
        });
    } else {
      this.userService.actualizarUsuario(form.value)
      .subscribe(res => {
        //this.getUsers();
        this.resetForm(form);
        this.router.navigate(['config/list']);
      });
    }
    
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      //this.getUsers();
    }
  }

  //imagen
  
  setRoundedMethod(value: boolean) {
    this.cropperSettings.rounded = value;
}

cropped(bounds: Bounds) {
    //console.log(bounds);
}

fileChangeListener($event) {
    let image: any = new Image();
    let file: File = $event.target.files[0];
    let myReader: FileReader = new FileReader();
    let that = this;
    myReader.onloadend = function(loadEvent: any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
}
  //end imagen
  
  ngOnInit() {
  }
}
