import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HotelConfigService } from './hotel-config.service';
import { LiveMetricsService } from './live-metrics.service';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor(private hotelConfig: HotelConfigService, private liveMetrics: LiveMetricsService) { }


}
