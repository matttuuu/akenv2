import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ButtonDirective } from '@coreui/angular';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UsersTestComponent } from '../../metrics/users-test/users-test.component';
// import { CButton } from '';


@Component({
    selector: 'app-dash-main',
    templateUrl: './dash-main.component.html',
    styleUrl: './dash-main.component.css',
    standalone: true,
    imports: [SidebarComponent, UsersTestComponent, ButtonDirective,],
})
export class DashMainComponent {


  constructor(
    protected authService: AuthService
  ) {}
  

  signOff(){
    this.authService.logout();
  }
}
