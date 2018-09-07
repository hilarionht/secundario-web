import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Candidata } from '../../models/candidata.model';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidataService {

  candidata:Candidata;
  token:string;

  constructor(
    public http: HttpClient, 
    public router: Router,
    private toastr: ToastrService
    
  ) { }
  create( candidata: Candidata ) {
    let url = URL_SERVICIOS + '/candidata';
    console.log(candidata);
    return this.http.post(url, candidata ,  { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`)})
      .map((res: any) => {
        this.toastr.success( res.nombre + ' ' + res.apellido , 'candidata Exitosa!',{ timeOut: 3000,positionClass: 'toast-top-right'});
        return res;
      }).catch( err => {
        console.log(err);
        this.toastr.warning( err.error.errors.message , 'Error en generar la candidata!',{ timeOut: 3000,positionClass: 'toast-top-right'});
        return Observable.throw( err );
      });;
  }

  update( candidata: Candidata ) {

    let url = URL_SERVICIOS + '/candidata';
    console.log(url);
    
    return this.http.put( url, candidata ,  { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`) } )
                .map( (resp: any) => {
                  this.toastr.success( resp.nombre, 'candidata Actualizado!',{ timeOut: 3000,positionClass: 'toast-top-right'});
                  return true;
                });

  }
  
  get(id: string){
    let url = URL_SERVICIOS + '/candidata/' + id;
    return this.http.get( url, { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`)} )
                    .map(resp => resp);
  }

  delete( id: string ) {
    let url = URL_SERVICIOS + '/candidata/' + id;
    //url += '?token=' + this.token;
    return this.http.delete( url ,  { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`) } )
                .map( resp => {
                  this.toastr.success( 'El candidata a sido eliminado correctamente', 'candidata BORRADO!',{ timeOut: 3000,positionClass: 'toast-top-right'});
                  return true;
                });

  }
  
  uploadImage( id:string,data:FormData){
    let url = URL_SERVICIOS + '/candidata/uploadImage/' + id;
    return this.http.put( url, data ,  { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`) } )
                .map( (resp: any) => {
                  return true;
                });
  }
  list( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/candidata';//?desde=' + desde;
    return this.http.get( url, { headers:new HttpHeaders().append('Authorization', `Bearer ${  localStorage.getItem('token') }`)} );
  }
}
