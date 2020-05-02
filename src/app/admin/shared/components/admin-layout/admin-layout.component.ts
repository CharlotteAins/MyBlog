import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styles: []
})
export class AdminLayoutComponent implements OnInit {

  constructor(private router: Router,
              public authService: AuthService) { }

  ngOnInit() {
  }

  logout(event: Event) {
    this.authService.logout();
    this.router.navigate(['/admin', 'login'])
  }
}
