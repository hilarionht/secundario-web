import { Candidata } from './../../../models/candidata.model';
import { Component, OnInit } from '@angular/core';
import { CandidataService } from '../../../services/candidata/candidata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-candidata',
  templateUrl: './candidata.component.html',
  styleUrls: ['./candidata.component.scss']
})
export class CandidataComponent implements OnInit {
  id:string;
  candidata: Candidata;
  candidatas: Candidata[]= [];
  selectedFile: File = null;
  constructor(
    public candidataService: CandidataService, 
    public routeActivate: ActivatedRoute,
    public _modalUploadService: ModalUploadService,
    public router: Router
  ) { 

    this.routeActivate.params.subscribe(param => {
      console.log('parametro ',param);
      this.id = param['id'];
      if (this.id !== '0') {
        this.candidataService.get(this.id).subscribe((candidata:any) => this.candidata = candidata)
      }else{
        this.candidata = new Candidata('','','','','','','','','',true,'0','');
      }
    })
  }
  onFileSeelected(event){
  console.log(event);
  this.selectedFile = <File>event.target.files[0];
}
  ngOnInit() {
  }
  save(form?: NgForm) {
    const fd = new FormData();
    fd.append('foto',this.selectedFile );
    if(form.value.id=='0') {
      this.candidataService.create(form.value)
        .subscribe(res => {
          console.log('nuevo',res);
          
          this.id = res.id;
          this.resetForm(form);
          //this.router.navigate(['/eleccion/candidatas']);
        });
    } else {
      this.candidataService.update(form.value)
      .subscribe(res => {
        this.resetForm(form);
        //this.router.navigate(['/eleccion/candidatas']);
      });
    }
    this.candidataService.uploadImage(this.id, fd).subscribe(
      resp => {
        console.log(resp);
        
      }
    );
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }
  cargarFoto() {

    this._modalUploadService.mostrarModal( 'usuario', this.id );

  }
}
