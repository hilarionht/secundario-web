import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { URL_SERVICIOS } from '../../config/config';

import { Observable } from 'rxjs';
import { Criterio } from '../../models/criterio.model';


@Injectable({
  providedIn: 'root'
})
export class CriterioService {
  criterio: Criterio
  constructor(
    public http: HttpClient, 
    public router: Router,
    private toastr: ToastrService
  ) { }
  create( criterio: Criterio ) {
    let url = URL_SERVICIOS + '/criterio';
    console.log(' create criterio: ',criterio);
    return this.http.post(url, criterio ,  { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`)})
      .map((res: any) => {
        this.toastr.success( criterio.nombre + ' ' + criterio.descripcion , 'criterio Exitosa!',{ timeOut: 3000,positionClass: 'toast-top-right'});
        return res.criterio;
      }).catch( err => {
        console.log(err);
        this.toastr.warning( err.error.errors.message , 'Error en generar la criterio!',{ timeOut: 3000,positionClass: 'toast-top-right'});
        return Observable.throw( err );
      });;
  }
  update( criterio: Criterio ) {

    let url = URL_SERVICIOS + '/criterio';
    console.log(url);
    
    return this.http.put( url, criterio ,  { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`) } )
                .map( (resp: any) => {
                  this.toastr.success( resp.nombre, 'criterio Actualizado!',{ timeOut: 3000,positionClass: 'toast-top-right'});
                  return true;
                });

  }
  
  get(id: string){
    let url = URL_SERVICIOS + '/criterio/' + id;
    return this.http.get( url, { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`)} )
                    .map(resp => resp);
  }

  delete( id: string ) {
    let url = URL_SERVICIOS + '/criterio/' + id;
    //url += '?token=' + this.token;
    return this.http.delete( url ,  { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`) } )
                .map( resp => {
                  this.toastr.success( 'El criterio a sido eliminado correctamente', 'criterio BORRADO!',{ timeOut: 3000,positionClass: 'toast-top-right'});
                  return true;
                });

  }
  
  list( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/criterio';//?desde=' + desde;
    return this.http.get( url, { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`)} );
  }
}
