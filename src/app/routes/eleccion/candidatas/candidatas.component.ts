import { Router } from '@angular/router';
import { UsuarioService } from './../../../services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Candidata } from '../../../models/candidata.model';
import { CandidataService } from '../../../services/candidata/candidata.service';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-candidatas',
  templateUrl: './candidatas.component.html'
})
export class CandidatasComponent implements OnInit {

  candidatas: Candidata[]= [];
  constructor(
    public candidataService:CandidataService,
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService,
    public router:Router
  ) { 
    this.candidataService.list().subscribe((response:any) => this.candidatas = response.entities );
    // if(this.candidatas.length> 0){
    //   this.candidatas.forEach(cand => {
    //      this.candidataService.isRated(cand.id,this._usuarioService.usuario.id).subscribe((res:boolean) => {
    //        cand.permite = res});
    //   });
    // for (let cand = 0; cand < this.candidatas.length; cand++) {
    //   console.log('actualizado');
    //   const candidata = this.candidatas[cand];
    //     this.candidataService.isRated(candidata.id,this._usuarioService.usuario.id).subscribe(
    //       (res:boolean) => {
    //     candidata[cand].permite = res
    //     console.log('actualizado', res);
          
    //   }
    //     );
    //   }
    // }
    this.calificacion();
  }
  
  ngOnInit() {
  }
  calificacion(){
    for (let cand = 0; cand < this.candidatas.length; cand++) {
        console.log('actualizado');
        const candidata = this.candidatas[cand];
          this.candidataService.isRated(candidata.id,this._usuarioService.usuario.id).subscribe(
            (res:boolean) => {
          candidata[cand].permite = res
          console.log('actualizado', res);
            
        }
          );
        }
      
  }
  cambiarFoto(id:string) {
    console.log(id);
    
    this._modalUploadService.mostrarModal( 'usuario', id );
  }
  calificar(id:string){
    this.candidataService.isRated(id,this._usuarioService.usuario.id).subscribe(
            (res:boolean) => {
              if(res==true){
                alert('No puede volver a calificar');
              }else{
                this.router.navigate(['/eleccion/calificacion', id ]);
              }
          // console.log('calificado....', res);
        });//['/eleccion/calificacion', candidata.id ]
  }
}
