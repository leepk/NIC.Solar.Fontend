import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-my',
  templateUrl: './my.page.html',
  styleUrls: ['./my.page.scss'],
})
export class MyPage implements OnInit {
    username: string;
    constructor(private router: Router, private userService: UsersService) { }

    ngOnInit() {
        this.username = localStorage.getItem('username');
    }

    changePw() {
        this.router.navigate([`change-password`]);
    }

    logout() {
        this.userService.logout();
    }
}
