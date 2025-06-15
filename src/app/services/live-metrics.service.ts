import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HotelConfigService } from './hotel-config.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LiveMetricsService {
  private apiURL = '/api/connector/v1/';
  

  //Variables de token y clave de acceso aqui, para usar en cada metodo

  constructor(
    private http: HttpClient,
    private currentHotel: HotelConfigService
  ) {}

  private getTokensPayload() {
    return {
      ClientToken: this.currentHotel.getClientToken(),
      AccessToken: this.currentHotel.getAccessToken(),
    };
  }

  private getTestingTokensPayload() {
    //metodo de prueba para verificar que se devuelva un objeto con ambos strings
    return {
      ClientToken: this.currentHotel.getTestingClientToken(),
      AccessToken: this.currentHotel.getTestingAccessToken(),
    };
  }

  //total available rooms?

  getAllReservationsInfo(): Observable<any[]> {
    const payload = {
      ...this.getTestingTokensPayload(), //Reemplazar por variables autenticas cuando se verifique que funcione
      StartUtc: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
      EndUtc: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
    };
    const headers = {
  'Content-Type': 'application/json',
};
    return this.http.post<any>(`${this.apiURL}reservations/getAll`, payload, {headers}) ;
    
  } //Reservas que se han creado en el dia...

  getTotalCheckIns(): Observable<number> {
    //Devuelve la cantidad de checkIns en base a la respuesta del metodo 'getAllReservationsInfo()'
    return this.getAllReservationsInfo().pipe(
      map(
        (res) =>
          res.filter((r) => r.state === 'Started' && r.IsCheckedIn).length
      ) ///Leer respuesta en postman para saber que filtrar!
    );
  }

  getTotalCheckOuts(): Observable<number> {
    return this.getAllReservationsInfo().pipe(
      map(
        (res) =>
          res.filter((r) => r.State === 'Processed' && r.IsCheckedOut).length
      )
    );
  }

  getTotalOccupiedRooms(): Observable<number> { //No se hizo check in, pero la habitacion ya esta ocupada por una reserva
    return this.getAllReservationsInfo().pipe(
      map((res) => res.filter((r) => r.State === 'Started').length)
    );
  }

  getTotalFreeRooms() {}

  getCurrentOccupationRate() {}

  makeGetTokensSpeak() {
    console.log(this.getTestingTokensPayload());
  }


  getAllLiveMetrics(): Observable<any>{
    return forkJoin({
      checkIns: this.getTotalCheckIns(),
      checkOuts: this.getTotalCheckOuts(),
      occuppied: this.getTotalOccupiedRooms(),
    })
  }
}
