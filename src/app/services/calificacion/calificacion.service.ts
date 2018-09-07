import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { URL_SERVICIOS } from '../../config/config';
import { Calificacion } from '../../models/calificacion.model';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  calificacion:Calificacion;

  constructor(
    public http: HttpClient, 
    public router: Router,
    private toastr: ToastrService
  ) { }
  create( calificacion: Calificacion ) {
 
    
    let url = URL_SERVICIOS + '/calificacion';
    console.log(calificacion);
    return this.http.post(url, calificacion ,  { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`)})
      .map((res: any) => {
        this.toastr.success( calificacion.puntos, 'calificacion Exitosa!',{ timeOut: 3000,positionClass: 'toast-top-right'});
        return res.calificacion;
      }).catch( err => {
        console.log(err);
        this.toastr.warning( err.error.errors.message , 'Error en generar la calificacion!',{ timeOut: 3000,positionClass: 'toast-top-right'});
        return Observable.throw( err );
      });;
  }
  
  update( calificacion: Calificacion ) {

    let url = URL_SERVICIOS + '/calificacion';
    console.log(url);
    
    return this.http.put( url, calificacion ,  { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`) } )
                .map( (resp: any) => {
                  if ( calificacion.id === this.calificacion.id ) {
                    let calificacionDB: Calificacion = resp.calificacion;
                  }
                  console.log('update....in calificacion', resp);
                  this.toastr.success( this.calificacion.id, 'calificacion Actualizado!',{ timeOut: 3000,positionClass: 'toast-top-right'});
                  return true;
                });

  }
  
  get(id: string){
    let url = URL_SERVICIOS + '/calificacion/' + id;
    return this.http.get( url, { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`)} )
                    .map(resp => resp);
  }

  delete( id: string ) {
    let url = URL_SERVICIOS + '/calificacion/' + id;
    //url += '?token=' + this.token;
    return this.http.delete( url ,  { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`) } )
                .map( resp => {
                  this.toastr.success( 'El calificacion a sido eliminado correctamente', 'calificacion BORRADO!',{ timeOut: 3000,positionClass: 'toast-top-right'});
                  return true;
                });

  }
  
  list( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/calificacion';//?desde=' + desde;
    return this.http.get( url, { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`)} );
  }
  result() {
    let url = URL_SERVICIOS + '/premiacion/calculateScore';//?desde=' + desde;
    return this.http.get( url, { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`)} );
  }
}
