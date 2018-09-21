import { Component, OnInit } from '@angular/core';
import { CandidataService } from '../../../services/candidata/candidata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';
import { Candidata } from '../../../models/candidata.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit {
  candidatas: Candidata[]= [];
  constructor(
    public candidataService: CandidataService,
    public routeActivate: ActivatedRoute,
    public _modalUploadService: ModalUploadService,
    public router: Router
  ) { 
    this.candidataService.list().subscribe((response:any) => this.candidatas = response.entities );
  }

  ngOnInit() {
  }
  delete(id:string){
    this.candidataService.delete(id).subscribe((resp:any) =>{
      console.log(resp);
      
    });
  }
}
