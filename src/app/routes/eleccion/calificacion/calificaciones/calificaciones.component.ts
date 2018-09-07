import { CalificacionResult } from './../../../../models/calificacionResult';
import { CalificacionService } from './../../../../services/calificacion/calificacion.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
})
export class CalificacionesComponent implements OnInit {
  calificaiones:CalificacionResult[]=[];
  constructor(
    public _calificacionService: CalificacionService
  ) 
  { 
    this._calificacionService.result().subscribe((res:any) => {
      this.calificaiones = res
    });
  }

  ngOnInit() {
  }

}
