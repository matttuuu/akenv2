import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dash-main',
  templateUrl: './dash-main.component.html',
  styleUrl: './dash-main.component.css'
})
export class DashMainComponent {


  constructor(
    protected authService: AuthService
  ) {}
  

  signOff(){
    this.authService.logout();
  }
}
