import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LiveMetricsService } from './live-metrics.service';
import { HotelConfigService } from './hotel-config.service';
import { forkJoin } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DailyMetricsService {
  private yesterdayDataSubject = new BehaviorSubject<any>(null); //Observable para notificar cambios en los datos del día anterior, puesto en false por defecto
  yesterdayData$ = this.yesterdayDataSubject.asObservable();

  private apiURL = 'http://localhost:3000/api/dailyMetrics';
  constructor(
    private http: HttpClient,
    private hotelConfig: HotelConfigService,
    private liveMetrics: LiveMetricsService
  ) {}

  setYesterdayData(data: any) {
    // Método para actualizar los datos del día anterior
    this.yesterdayDataSubject.next(data);
  }

  insertDailyMetricsToDB(clientToken: string, accessToken: string): void {
    forkJoin({
      checkIns: this.liveMetrics.getTotalCheckIns(),
      checkOuts: this.liveMetrics.getTotalCheckOuts(),
      confirmedReserves: this.liveMetrics.getTotalConfirmedReservations(),
      cancelledReserves: this.liveMetrics.getTotalCanceledReservations(),
      adr: this.liveMetrics.getADR(),
      cleanRooms: this.liveMetrics.getTotalCleanRooms(),
      dirtyRooms: this.liveMetrics.getTotalDirtyRooms(),
      occupiedRooms: this.liveMetrics.getTotalOccupiedRooms(),
    }).subscribe({
      next: (metrics: any) => {
        const payload = {
          ...metrics,
          clientToken,
          accessToken,
        };

        this.http
          .post(
            'http://localhost:3000/api/dailyMetrics/addDailyMetric',
            payload
          )
          .subscribe({
            next: (res) => console.log('Datos enviados correctamente', res),
            error: (err) => console.error('Error al insertar métricas:', err),
          });
      },
      error: (err: any) => {
        console.error('Error al calcular métricas:', err);
      },
    });
  }

  getHotelInfoByDate(hotelId: string, date: string) { //Me devuelve la informacion de un dia especifico
    return this.http.get<any>(
      `${this.apiURL}/getDailyMetricByDate?hotelId=${hotelId}&date=${date}`
    );
  }

  getHotelInfoByRange(hotelId: string, startDate: string, endDate: string) { //Me devuelve la informacion de un rango de fechas
    return this.http.get<any>(
      `${this.apiURL}/getDailyMetricsByRange?hotelId=${hotelId}&startDate=${startDate}&endDate=${endDate}`
    );

  }

  
}
