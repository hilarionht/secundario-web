import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';
import { UsuarioService } from '../../../services/service.index';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    user: any;
    constructor(
        public userblockService: UserblockService,
        public userService:UsuarioService,
        public router: Router
    ) {

        this.user = {
            picture: 'assets/img/user/01.jpg',
            username: '',
            profile: ''
        };
        if(!userService.isAuthenticated()){
            console.log('paso el guard');
            this.router.navigate(['/login']);
        }
            
    }

    ngOnInit() {
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }

}
