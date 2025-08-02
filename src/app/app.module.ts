import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { LoginformComponent } from './components/auth/loginform/loginform.component';
import { DashMainComponent } from './components/dashboard/dash-main/dash-main.component';
import { TestComponent } from './components/testing/test/test.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { DOCUMENT } from '@angular/common';
import { AdrComponent } from './components/metrics/revenue/adr/adr.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { ChartComponent } from 'ng-apexcharts';
import { UsersTestComponent } from './components/metrics/users-test/users-test.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import Aura from '@primeng/themes/aura';
import { ConfirmedReservationsComponent } from './components/metrics/reservations-checks/confirmed-reservations/confirmed-reservations.component';
import { CanceledReservationsComponent } from './components/metrics/reservations-checks/canceled-reservations/canceled-reservations.component';
import { OccupiedRoomsComponent } from './components/metrics/rooms-info/occupied-rooms/occupied-rooms.component';
import { ReservationsInfoComponent } from './components/metrics/reservations-checks/reservations-info/reservations-info.component';
import { CleanDirtyComponent } from './components/metrics/rooms-info/clean-dirty/clean-dirty.component';
import { TotalRoomsComponent } from './components/metrics/rooms-info/total-rooms/total-rooms.component';
import { CheckInsOutsComponent } from './components/metrics/reservations-checks/check-ins-outs/check-ins-outs.component';
import { CalendarComponent } from './components/dashboard/calendar/calendar.component';
import { HotelDropdownComponent } from './components/dashboard/hotel-dropdown/hotel-dropdown.component';



@NgModule({
  declarations: [
    AppComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    HttpClientModule,
    LoginformComponent,
    DashMainComponent,
    TestComponent,
    SidebarComponent,
    ReservationsInfoComponent,
    AdrComponent,
    TotalRoomsComponent,
    UsersTestComponent,
    CalendarComponent,
    NgSelectModule,
    FormsModule
  ],
  providers: [
     
    provideClientHydration(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'dashboardamekdev2',
        appId: '1:255865880746:web:59349d6d74727602a0d0d3',
        storageBucket: 'dashboardamekdev2.firebasestorage.app',
        apiKey: 'AIzaSyBhrcg-VnHKiFcpjFzM2njv_IXsz0C921I',
        authDomain: 'dashboardamekdev2.firebaseapp.com',
        messagingSenderId: '255865880746',
      })
    ),
    provideAuth(() => getAuth()),
    provideAnimationsAsync(), //primeng
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
