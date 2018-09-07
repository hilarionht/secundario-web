import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  personas = [];
  personasCols  = [
    { prop: 'Codigo' },
    { name: 'Nombre' },
    { name: 'Direccion' },
    { name: 'Telefono' },
    { name: 'email' }
  ];
  Instituciones = [];

  InstitucionesCols  = [
    { prop: 'Codigo' },
    { name: 'Nombre' },
    { name: 'direccion' },
    { name: 'Telefono' },
    { name: 'Departamento' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
