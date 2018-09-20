import { AhorrosComponent } from './ahorros/ahorros.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { Ng2TableModule } from 'ng2-table';
import { AgGridModule } from 'ag-grid-angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DirectosComponent } from './directos/directos.component';
import { PlanesComponent } from './planes/planes.component';
const routes: Routes = [
  { path: '', redirectTo: 'credito' },
  { path: 'planes', component: PlanesComponent },
  // { path: 'producto/:id', component: ProductoComponent },
  // { path: 'tipoProducto/:id', component: TipoProductoComponent },
  { path: 'directos', component: DirectosComponent }
  
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    Ng2TableModule
    // AgGridModule.withComponents([AngulargridComponent]),
    // NgxDatatableModule,
   
  ],
  declarations: [
    PlanesComponent,
    DirectosComponent,
    AhorrosComponent
  ],
  exports: [
      RouterModule
  ]
})
export class CreditosModule { }
