import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LiveMetricsService } from './live-metrics.service';
import { HotelConfigService } from './hotel-config.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DailyMetricsService {
  constructor(
    private http: HttpClient,
    private hotelConfig: HotelConfigService,
    private liveMetrics: LiveMetricsService
  ) {}

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
        .post('http://localhost:3000/api/dailyMetrics/addDailyMetric', payload)
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


}
