import { CalificacionResult } from './../../../../models/calificacionResult';
import { CalificacionService } from './../../../../services/calificacion/calificacion.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
})
export class CalificacionesComponent implements OnInit {
  reinas:CalificacionResult[]=[];
  simpatias:CalificacionResult[]=[];
  elegancia:CalificacionResult[]=[];
  constructor(
    public _calificacionService: CalificacionService
  ) 
  { 
    this._calificacionService.result().subscribe((res:any) => {
       this.reinas = res.reinaAndPrincesas;
        this.simpatias = res.missSimpatia;
        this.elegancia = res.reinaAndPrincesas;
      console.log(res);
      
    });
  }

  ngOnInit() {
  }

}
