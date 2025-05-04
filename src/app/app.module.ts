import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { LoginformComponent } from './components/auth/loginform/loginform.component';
import { DashMainComponent } from './components/dashboard/dash-main/dash-main.component';
import { TestComponent } from './components/testing/test/test.component';
import { SidebarComponent } from './components/dashboard/sidebar/sidebar.component';
import { MetricContainerComponent } from './components/dashboard/metric-container/metric-container.component';
import { AvgCleaningTimeComponent } from './components/metrics/avg-cleaning-time/avg-cleaning-time.component';
import { AdrComponent } from './components/metrics/adr/adr.component';
import { CheckInsComponent } from './components/metrics/check-ins/check-ins.component';
import { CheckOutsComponent } from './components/metrics/check-outs/check-outs.component';
import { DailyPickupsComponent } from './components/metrics/daily-pickups/daily-pickups.component';
import { DirtyRoomsComponent } from './components/metrics/dirty-rooms/dirty-rooms.component';
import { EarlyDeparturesComponent } from './components/metrics/early-departures/early-departures.component';
import { HskProductivityComponent } from './components/metrics/hsk-productivity/hsk-productivity.component';
import { NoShowsComponent } from './components/metrics/no-shows/no-shows.component';
import { OccupiedRoomsComponent } from './components/metrics/occupied-rooms/occupied-rooms.component';
import { OutOfOrderRoomsComponent } from './components/metrics/out-of-order-rooms/out-of-order-rooms.component';
import { TotalCurrentGuestsComponent } from './components/metrics/total-current-guests/total-current-guests.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    DashMainComponent,
    TestComponent,
    SidebarComponent,
    MetricContainerComponent,
    AvgCleaningTimeComponent,
    AdrComponent,
    CheckInsComponent,
    CheckOutsComponent,
    DailyPickupsComponent,
    DirtyRoomsComponent,
    EarlyDeparturesComponent,
    HskProductivityComponent,
    NoShowsComponent,
    OccupiedRoomsComponent,
    OutOfOrderRoomsComponent,
    TotalCurrentGuestsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({"projectId":"dashboardamekdev2","appId":"1:255865880746:web:59349d6d74727602a0d0d3","storageBucket":"dashboardamekdev2.firebasestorage.app","apiKey":"AIzaSyBhrcg-VnHKiFcpjFzM2njv_IXsz0C921I","authDomain":"dashboardamekdev2.firebaseapp.com","messagingSenderId":"255865880746"})),
    provideAuth(() => getAuth())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
