import { Component, OnInit } from '@angular/core';
import { Candidata } from '../../../models/candidata.model';
import { CandidataService } from '../../../services/candidata/candidata.service';
import { ModalUploadService } from '../../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-candidatas',
  templateUrl: './candidatas.component.html',
  styleUrls: ['./candidatas.component.scss']
})
export class CandidatasComponent implements OnInit {

  candidatas: Candidata[]= [];
  constructor(
    public candidataService:CandidataService,
    public _modalUploadService: ModalUploadService
  ) { 
    this.candidataService.list().subscribe((response:any) => this.candidatas = response.entities );
  }

  ngOnInit() {
  }
  cambiarFoto(id:string) {
    console.log(id);
    
    this._modalUploadService.mostrarModal( 'usuario', id );
  }
}
