import { Persona } from './../../../models/persona.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html'
})
export class PersonaComponent implements OnInit {

  
  persona: Persona;
  id : any;
  constructor() { }

  ngOnInit() {
  }
  addPerson(){
    
  }
}
