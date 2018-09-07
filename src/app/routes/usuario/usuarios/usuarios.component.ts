import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ColorsService } from '../../../shared/colors/colors.service';
import { UsuarioService } from '../../../services/service.index';
import { Usuario } from '../../../models/usuario.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

    usuarios: Usuario[] = [];

    totalRegistros: number = 0;
    cargando: boolean = true;
    dtTrigger: Subject<any> = new Subject();
    datosTabla: Usuario[];
    // public dtOptions: DataTables.Settings = {};
    public loading: false;
    // @ViewChildren(DataTableDirective)
    min:number;
    max:number;
    // datatableElement: DataTableDirective;
    sparkOptions1 = {
    barColor: this.colors.byName('primary'),
    height: 20,
    barWidth: 5,
    barSpacing: 2,
    resize: true
}

sparkOptions2 = {
    barColor: this.colors.byName('purple'),
    height: 20,
    barWidth: 5,
    barSpacing: 2,
    resize: true
}

sparkOptions3 = {
    barColor: this.colors.byName('info'),
    height: 20,
    barWidth: 5,
    barSpacing: 2,
    resize: true
}
constructor(
    public colors: ColorsService, 
    public _usrService: UsuarioService,
    public router: Router
) { }

ngOnInit() {
    this._usrService.cargarUsuarios().subscribe((resp:any)=> {
        this.usuarios =resp.entities;
        console.log(resp);
        
    });
}
editUser(usuario:Usuario){

    console.log(usuario);
    this.router.navigate(['/usuario', usuario.id]);
}
deleteUser(usuario: Usuario){

}
}
