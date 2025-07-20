import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ButtonDirective } from '@coreui/angular';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UsersTestComponent } from '../../metrics/users-test/users-test.component';
import { ReservationsInfoComponent } from "../../metrics/reservations-checks/reservations-info/reservations-info.component";
import { CheckInsOutsComponent } from '../../metrics/reservations-checks/check-ins-outs/check-ins-outs.component';
import { OccupiedRoomsComponent } from "../../metrics/rooms-info/occupied-rooms/occupied-rooms.component";
import { TotalRoomsComponent } from "../../metrics/rooms-info/total-rooms/total-rooms.component";
import { CleanDirtyComponent } from "../../metrics/rooms-info/clean-dirty/clean-dirty.component";
import { CalendarComponent } from "../calendar/calendar.component";




// import { CButton } from '';

@Component({
    selector: 'app-dash-main',
    templateUrl: './dash-main.component.html',
    styleUrl: './dash-main.component.css',
    imports: [SidebarComponent, UsersTestComponent, ButtonDirective, ReservationsInfoComponent, CheckInsOutsComponent, OccupiedRoomsComponent, TotalRoomsComponent, CleanDirtyComponent, CalendarComponent]
})
export class DashMainComponent {
  constructor(protected authService: AuthService) {}

  signOff() {
    this.authService.logout();
  }
}
