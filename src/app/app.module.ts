import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';



@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({"projectId":"dashboardamekdev2","appId":"1:255865880746:web:59349d6d74727602a0d0d3","storageBucket":"dashboardamekdev2.firebasestorage.app","apiKey":"AIzaSyBhrcg-VnHKiFcpjFzM2njv_IXsz0C921I","authDomain":"dashboardamekdev2.firebaseapp.com","messagingSenderId":"255865880746"})),
    provideAuth(() => getAuth())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
