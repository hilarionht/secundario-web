import { PipesModule } from './../../pipes/pipes.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidataComponent } from './candidata/candidata.component';
import { CriterioComponent } from './criterio/criterio.component';
import { CalificacionComponent } from './calificacion/calificacion.component';


import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { CandidatasComponent } from './candidatas/candidatas.component';
import { CalificacionesComponent } from './calificacion/calificaciones/calificaciones.component';


const routes: Routes = [
  { path: '', redirectTo: 'candidatas' },
  { path: 'calificacion/:id', component: CalificacionComponent },
  { path: 'criterio/:id', component: CriterioComponent },
  { path: 'criterios', component: CriterioComponent },
  { path: 'calificaciones', component: CalificacionesComponent },
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
    CalificacionComponent, CandidatasComponent, CalificacionesComponent
  ]
})
export class EleccionModule { }
