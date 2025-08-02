import { Component, ViewChild, OnInit } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

import { LiveMetricsService } from '../../../../services/live-metrics.service';
import { forkJoin } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  title: ApexTitleSubtitle;
};

@Component({
    selector: 'app-reservations-info',
    templateUrl: './reservations-info.component.html',
    styleUrls: ['./reservations-info.component.css'],
    imports: [ChartComponent]
})
export class ReservationsInfoComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {}; // Inicializamos vacío

  constructor(private liveMetricService: LiveMetricsService) {}

  ngOnInit(): void {
    // Obtenemos el valor confirmado
    forkJoin({
      confirmedReservations:
        this.liveMetricService.getTotalConfirmedReservations(),
      canceledReservations:
        this.liveMetricService.getTotalCanceledReservations(),
    }).subscribe(({ confirmedReservations, canceledReservations }) => {
      // Una vez recibido el valor, se asigna a chartOptions
      this.chartOptions = {
        series: [
          {
            name: 'Reservas confirmadas',
            data: [confirmedReservations],
          },
          {
            name: 'Reservas canceladas',
            data: [canceledReservations], // Puedes hacer esto dinámico también
          },
        ],
        chart: {
          type: 'bar',
          height: 350,
          width: 500,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            columnWidth: '55%',
            borderRadius: 4,
          },
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: [''],
        },
        title: {
          text: 'Reservas',
        },
        
      };
    });
  }
}
