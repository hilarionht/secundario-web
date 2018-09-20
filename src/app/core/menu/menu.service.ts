import { Injectable } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { log } from 'util';

@Injectable()
export class MenuService {

    menuItems: Array<any>;

    constructor(public _userService: UsuarioService) {
        this.menuItems = [];
    }

    addMenu(items: Array<{
        text: string,
        heading?: boolean,
        link?: string,     // internal route links
        elink?: string,    // used only for external links
        target?: string,   // anchor target="_blank|_self|_parent|_top|framename"
        icon?: string,
        alert?: string,
        submenu?: Array<any>
    }>) {

        items.forEach((item) => {
            // console.log(item, 'item de menu');
            // console.log(this._userService, 'servicio de usuario');
            
            // if(this._userService.usuario.rol=="admin"){
            //     this.menuItems.push(item);
            // }
            
            // item.submenu.forEach((subitem)=> {
            //     //if(subitem.role != this._userService.usuario.rol){
            //         let rols = new Array();
            //         rols = subitem.role;
            //         let existe = false;
            //         console.log('roles en let______', rols, 'texto delsubmenu :  ', subitem.text,'arreglo:  ' ,rols.length, ' subitem: ' , subitem.role);
            //         for (let i = 0 ; i <= rols.length; i++){
            //             console.log(i);
                        
            //             if(parseFloat(rols[i]) === parseFloat(this._userService.usuario.rol)){
            //                 existe = true;
            //                 console.log('role in for:  ', rols[i], existe,'RolUser: ', parseFloat(this._userService.usuario.rol), 'rolsubmenu: ', rols[i]);
            //                 break;
            //             }
            //         }
            //        // console.log('existe despues del for________:   ', existe);
            //         if(existe == false){
            //             console.log(subitem, 'removiendo.......');
                        
            //             item.submenu.splice(subitem,1);
            //         }
            //         existe = false;
            //         console.log('subitem: ', subitem, 'user                :', this._userService.usuario.rol, 'existe:   ', existe);
            // })
            this.menuItems.push(item);
            //console.log(this.menuItems,'menu');
            
        });
    }

    getMenu() {
        this.menuItems.forEach((menu)=>{
            
            menu.submenu.forEach((submenu)=> {
                //console.log('SUBMENU; ',submenu);
                let existe = false;
                submenu.role.forEach((rol)=>{
                  //  console.log(rol);
                    if(parseInt(rol) === parseInt(this._userService.usuario.rol)){
                        existe = true;
                    }
                });
                if(!existe){
                   menu.submenu.splice(submenu,1);
                    //item.submenu.splice(subitem,1);
                }
            });
           
        });
        for (let i = 0; i < this.menuItems.length; i++) {
            const element = this.menuItems[i];
            let rol = new Array();
            rol = element.role;
            let existe = false;
            for (let j = 0; j < rol.length; j++) {
                const r = rol[j];
                if(parseInt(r) === parseInt(this._userService.usuario.rol)){
                    existe = true;
                }
            }
            // if(!existe){
            //     console.log('remover elemento: ', element);
            //     this.menuItems.splice(element,1)
            // }
            // console.log(element);
            
        }
        // this.menuItems.forEach((menu)=>{
            
        //     let permite = false;console.log('MENU ss: ',menu, permite);
        //     menu.role.forEach((rol)=>{
        //         console.log(rol,parseInt(this._userService.usuario.rol));
        //         if(parseInt(rol) === parseInt(this._userService.usuario.rol)){
        //             permite = true;
        //         }
        //     });
        //     console.log(permite);
            
        //     if(permite===false){
        //        this.menuItems.splice(menu,1);
        //         //item.submenu.splice(subitem,1);
        //     }
        // });
       // console.log('MENU LIST:' , this.menuItems);
        
        return this.menuItems;
    }

}
