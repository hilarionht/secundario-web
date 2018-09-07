import { ListComponent } from './persona/list.component';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { Ng2TableModule } from 'ng2-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RegionComponent } from './region/region.component';
import { InstitucionComponent } from './institucion/institucion.component';
import { LoginGuard } from '../../services/service.index';
import { PersonaComponent } from './persona/persona.component';
import { TelefonoComponent } from './telefono/telefono.component';
import { TipotelefonosComponent } from './tipotelefonos/tipotelefonos.component';
const routes: Routes = [
  { path: '', redirectTo: 'personal' },
  { path: 'regiones', component: RegionComponent },
  { path: 'instituciones', component: InstitucionComponent , canActivate: [LoginGuard]},
  { path: 'telefono/:id', component: TelefonoComponent , canActivate: [LoginGuard]},
  { path: 'tipotelefono', component: TipotelefonosComponent , canActivate: [LoginGuard]},
  { path: 'persona/:id', component: PersonaComponent , canActivate: [LoginGuard]},
  { path: 'personalist', component: ListComponent , canActivate: [LoginGuard]},
  
];

@NgModule({
  imports: [
    SharedModule,
      RouterModule.forChild(routes),
      Ng2TableModule,
     // AgGridModule.withComponents([AngulargridComponent]),
      NgxDatatableModule
  ],
  declarations: [
    RegionComponent,
    InstitucionComponent,
    TelefonoComponent,
    TipotelefonosComponent,
    PersonaComponent,
    ListComponent
  ],
  exports: [
    RouterModule
]
})
export class PersonalModule { }





