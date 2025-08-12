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
import { TestComponent } from '../../testing/test/test.component';
import { PreviousDayComponent } from '../../metrics/daily-container/previous-day/previous-day.component';
import { SingleDayCardComponent } from '../../metrics/daily-container/single-day-card/single-day-card.component';
import { CompareRangeCardComponent } from '../../metrics/daily-container/compare-range-card/compare-range-card.component';
import { DailyDropdownComponent } from '../../metrics/daily-container/daily-dropdown/daily-dropdown.component';

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
    CompareRangeCardComponent,
    DailyDropdownComponent,
  ],
})
export class DashMainComponent implements OnInit {
  currentUser$: Observable<User | null>; //Por convencion, todo lo que lleva un  "$" es un observable (puede cambiar su valor con el tiempo)

  // This gives you todays date.

  // This also gives you todays date if you don't alter it on init.
  private dateToday: Date = new Date();
  private dateYesterday: Date = new Date();
  formattedDateYesterday!: string;

  constructor(
    private authService: AuthService,
    private hotelConfigService: HotelConfigService
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  logoPath = 'assets/ameklogo-side.png';

  currentUser = ''; //Se usa?
  activeTab: 'live' | 'daily' = 'live'; //Para saber que tab esta activo
  selectedRangeMode: 'range' | 'single' = 'range'; // Para saber que modo de rango esta activo

  ngOnInit() {
    // this.hotelConfigService.onTokensChange().subscribe(() => {
    //   // this.loadMetrics() // 'aca' se deberia ejecutar la funcionalidad que carga las metricas
    // });
    // this.getCurrentUserName()
    // Calcular ayer
    this.dateYesterday = new Date();
    this.dateYesterday.setDate(this.dateToday.getDate() - 1);
    // Formatear como d/m/yyyy
    this.formattedDateYesterday =
      this.dateYesterday.toLocaleDateString('es-AR');

    // Mostrar en consola
    console.log(this.formattedDateYesterday); // Ejemplo: "8/8/2025"

    
    // // Si lo querés enviar al backend como YYYY-MM-DD
    // const isoFormatted = this.dateYesterday.toISOString().split('T')[0]; 
    // console.log(isoFormatted); // "2025-08-08"
  }

  showCompareModal = false;

  openModal() {
    //Abro el modal
    this.showCompareModal = true;
  }

  closeModal() {
    //Cierro el modal
    this.showCompareModal = false;
  }

  onCalendarModeChange(mode: 'range' | 'single') {
    this.selectedRangeMode = mode;
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

  ////////////////TEST DE MODALES (funciones consumidas por calendar.component.ts)////////////////////
  /////DEBERIAN TENER EL MISMO NOMBRE?

  openModalWithSingleDay() {
    // Lógica para abrir el modal de día
    this.showCompareModal = true; // Aquí podrías abrir un modal específico para el día
  }

  openModalWithRange() {
    // Lógica para abrir el modal de rango
    this.showCompareModal = true; // Aquí podrías abrir un modal específico para el rango
  }
}
