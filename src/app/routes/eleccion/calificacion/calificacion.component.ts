import { UsuarioService } from './../../../services/usuario/usuario.service';
import { CandidataService } from './../../../services/candidata/candidata.service';
import { Candidata } from './../../../models/candidata.model';
import { Calificacion } from './../../../models/calificacion.model';
import { CalificacionService } from './../../../services/calificacion/calificacion.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.scss']
})
export class CalificacionComponent implements OnInit {

  id:string;
  calificacion: Calificacion;
  candidata:Candidata;
  calificacionItem : Object = {
    simpatia:  null,
    elegancia: null,
    belleza: null
  }
  constructor(
    public calificacionService: CalificacionService, 
    public candidataService: CandidataService,
    public usuarioService: UsuarioService,
    public routeActivate: ActivatedRoute,
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

  ngOnInit() {
    this.candidata = new Candidata('','','','','','','','','',true,'0','');
  }
  save(form?: NgForm) {
    console.log('value form', form.value);
    if(!form.value.belleza){
      alert('Califique con un valor BELLEZA!!');
      return;
    }
    if(!form.value.elegancia){
      alert('Califique con un valor ELEGANCIA!!');
      return;
    } 
    if(!form.value.simpatia){
      alert('Califique con un valor SIMPATIA!!');
      return;
    }
    this.calificacion = new Calificacion(form.value.belleza, 'belleza',this.usuarioService.usuario.id,this.candidata.id, '1', '0');
    this.calificacionService.create(this.calificacion).subscribe(resp => 
      {console.log('calificado belleza')}
    );
    this.calificacion = new Calificacion(form.value.simpatia, 'simpatia',this.usuarioService.usuario.id,this.candidata.id, '3', '0');
    this.calificacionService.create(this.calificacion).subscribe(resp => 
      {
        console.log('calificado simpatia')
      }
    );
    this.calificacion = new Calificacion(form.value.elegancia, 'elegancia',this.usuarioService.usuario.id,this.candidata.id, '2', '0');
    this.calificacionService.create(this.calificacion).subscribe(resp => {
      console.log('calificado elegancia');
      this.resetForm(form);
      this.router.navigate(['eleccion/candidatas']);
    });
// 1	belleza	belleza	
// 2	elegancia	elegancia	
// 3	simpatia	simpatia
    
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      //this.getUsers();
    }
  }

}
