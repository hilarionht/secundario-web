import { PipesModule } from './../../pipes/pipes.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidataComponent } from './candidata/candidata.component';
import { CriterioComponent } from './criterio/criterio.component';
import { CalificacionComponent } from './calificacion/calificacion.component';


import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { CandidatasComponent } from './candidatas/candidatas.component';


const routes: Routes = [
  { path: '', redirectTo: 'eleccion' },
  { path: 'calificacion/:id', component: CalificacionComponent },
  { path: 'criterio/:id', component: CriterioComponent },
  { path: 'criterios', component: CriterioComponent },
  { path: 'calificaciones', component: CalificacionComponent },
  { path: 'candidatas', component: CandidatasComponent },
  { path: 'candidata/:id', component: CandidataComponent }
];
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [
    CandidataComponent, 
    CriterioComponent, 
    CalificacionComponent, CandidatasComponent
  ]
})
export class EleccionModule { }
