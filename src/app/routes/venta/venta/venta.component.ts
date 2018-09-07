import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto/producto.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styles: []
})
export class VentaComponent implements OnInit {

  ventas = [];
  ventasCols  = [
    { prop: 'Codigo' },
    { name: 'Producto' },
    { name: 'PrecioUnitario' },
    { name: 'Cantidad' },
    { name: 'Total' }
  ];
  productos = [];

  productosCols  = [
    { prop: 'Codigo' },
    { name: 'Producto' },
    { name: 'PrecioUnitario' },
    { name: 'Cantidad' },
    { name: 'Total' }
  ];
  constructor(
    private prodService: ProductoService, 
    private http: HttpClient) { }

  ngOnInit() {
    this.prodService.cargarProductos().subscribe(
      (resp:any) => {
        this.productos = resp.productos
        console.log('data',resp);
        
      });
  }

}
