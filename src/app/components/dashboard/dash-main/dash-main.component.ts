import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ButtonDirective } from '@coreui/angular';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UsersTestComponent } from '../../metrics/users-test/users-test.component';
import { ReservationsInfoComponent } from '../../metrics/reservations-checks/reservations-info/reservations-info.component';
import { CheckInsOutsComponent } from '../../metrics/reservations-checks/check-ins-outs/check-ins-outs.component';
import { OccupiedRoomsComponent } from '../../metrics/rooms-info/occupied-rooms/occupied-rooms.component';
import { TotalRoomsComponent } from '../../metrics/rooms-info/total-rooms/total-rooms.component';
import { CleanDirtyComponent } from '../../metrics/rooms-info/clean-dirty/clean-dirty.component';
import { CalendarComponent } from '../calendar/calendar.component';
// import { NavbarComponent } from "../../../../../node_modules/@coreui/angular/lib/navbar/navbar.component";
import { AdrComponent } from '../../metrics/revenue/adr/adr.component';
import { CommonModule } from '@angular/common';
import { HotelDropdownComponent } from '../hotel-dropdown/hotel-dropdown.component';
import { HotelConfigService } from '../../../services/hotel-config.service';

// import { CButton } from '';

@Component({
  selector: 'app-dash-main',
  templateUrl: './dash-main.component.html',
  styleUrl: './dash-main.component.css',
  imports: [
    SidebarComponent,
    CommonModule,
    UsersTestComponent,
    ButtonDirective,
    ReservationsInfoComponent,
    CheckInsOutsComponent,
    OccupiedRoomsComponent,
    TotalRoomsComponent,
    CleanDirtyComponent,
    CalendarComponent,
    AdrComponent,
    HotelDropdownComponent,
  ],
})
export class DashMainComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private hotelConfigService: HotelConfigService
  ) {}


  ngOnInit() {
    this.hotelConfigService.onTokensChange().subscribe(() => {
      // this.loadMetrics() // 'aca' se deberia ejecutar la funcionalidad que carga las metricas
    })
  }

  


  showCompareModal = false;

  openModal() {
    this.showCompareModal = true;
  }

  closeModal() {
    this.showCompareModal = false;
  }

  signOff() {
    this.authService.logout();
  }
}
