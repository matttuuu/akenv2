import { Component, OnInit } from '@angular/core';
import { DailyMetricsService } from '../../../../services/daily-metrics.service';
import { DateService } from '../../../../services/date.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-previous-day',
  standalone: true,
  templateUrl: './previous-day.component.html',
  styleUrl: './previous-day.component.css',
  imports: [CommonModule, NgIf],
})
export class PreviousDayComponent implements OnInit {
  todayShort!: string;
  yesterdayShort!: string;
  todayDB!: string;
  yesterdayDB!: string;

  hotelDataYesterday: any = null;

  constructor(
    private dailyMetricsService: DailyMetricsService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    const today = this.dateService.getToday();
    const yesterday = this.dateService.getYesterday();
    this.todayShort = this.dateService.formatShort(today);
    this.yesterdayShort = this.dateService.formatShort(yesterday);
    this.todayDB = this.dateService.formatDB(this.dateService.getToday());
    this.yesterdayDB = this.dateService.formatDB(
      this.dateService.getYesterday()
    );

    // console.log('Fecha de hoy:', today);
    // console.log('Fecha de ayer:', yesterday);
    // console.log('Fecha de hoy corta:', this.todayShort);
    // console.log('Fecha de ayer corta:', this.yesterdayShort);
    // console.log('Fecha de hoy para DB:', this.todayDB); //
    // console.log('Fecha de ayer para DB:', this.yesterdayDB); //
    //Todo esto para probar, borrar luego
    this.dailyMetricsService.yesterdayData$.subscribe((data) => {
     
      this.hotelDataYesterday = data && data.length > 0 ? data[0] : null;

      
    });
  }

  //funciones para usar en componentes
}
