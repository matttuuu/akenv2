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
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { TestComponent } from "../../testing/test/test.component";
import { PreviousDayComponent } from '../../metrics/daily-container/previous-day/previous-day.component';
import { SingleDayCardComponent } from "../../metrics/daily-container/single-day-card/single-day-card.component";
import { CompareRangeCardComponent } from "../../metrics/daily-container/compare-range-card/compare-range-card.component";


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
    TestComponent,
    PreviousDayComponent,
    SingleDayCardComponent,
    CompareRangeCardComponent
],
})
export class DashMainComponent implements OnInit {
  currentUser$: Observable<User | null>; //Por convencion, todo lo que lleva un  "$" es un observable (puede cambiar su valor con el tiempo)

  // This gives you todays date.
 
  // This also gives you todays date if you don't alter it on init.
  private dateToday: Date = new Date();
  private dateYesterday: Date = new Date();

  constructor(
    private authService: AuthService,
    private hotelConfigService: HotelConfigService
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  currentUser = '';
  activeTab: 'live' | 'daily' = 'live';

  ngOnInit() {
    // this.hotelConfigService.onTokensChange().subscribe(() => {
    //   // this.loadMetrics() // 'aca' se deberia ejecutar la funcionalidad que carga las metricas
    // });
    // this.getCurrentUserName()
    this.dateYesterday = new Date(
      this.dateToday.setDate(this.dateToday.getDate() - 1)
    );
    console.log(this.dateYesterday)
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

  selectTab(tab: 'live' | 'daily') {
    this.activeTab = tab;
  }

  toggleUserMenu() {
    console.log('Se apretó el svg');
  }
  // onHotelChange(selectedHotel: string) {
  //   this.hotelConfigService
  //     .getHotelTokensByName(selectedHotel)
  //     .subscribe((tokens) => {
  //       // Guarda los tokens y actualiza la información en pantalla
  //     });
  // }
}
