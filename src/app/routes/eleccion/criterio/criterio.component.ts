import { Criterio } from './../../../models/criterio.model';
import { CriterioService } from './../../../services/criterio/criterio.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-criterio',
  templateUrl: './criterio.component.html',
  styleUrls: ['./criterio.component.scss']
})
export class CriterioComponent implements OnInit {
  id: number;
  criterio: Criterio;
  criterios: Criterio[] = [];
  constructor(
    public criterioService: CriterioService, 
    public routeActivate: ActivatedRoute,
    public router: Router
  ) { 
    this.criterio = new Criterio('' ,'' , null);
    this.getCrts();
  }

  ngOnInit() {
  }
  save(form?: NgForm) {
    
    
    if(form.value.id) {
      this.criterioService.update(form.value)
      .subscribe(res => {
        this.resetForm(form);
        this.getCrts();
      });
    } else {
      this.criterioService.create(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.getCrts();
        });
    }
    
  }
  edit(criterio:Criterio){
    this.criterio = criterio;
  }
  remove(id: string, form: NgForm) {
    if(confirm('Seguro que desea eliminar?')) {
      this.criterioService.delete(id)
        .subscribe(res => {
          this.getCrts();
          this.resetForm(form);
        });
    }
  }
  getCrts(){
    this.criterioService.list().subscribe((resp:any) => {

      this.criterios = resp.entities as Criterio[];
    });
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }
}
