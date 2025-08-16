import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
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
import { HotelConfigService } from '../../../../services/hotel-config.service';
import { forkJoin, Subscription } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  title: ApexTitleSubtitle;
  labels: any;
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-reservations-info',
  templateUrl: './reservations-info.component.html',
  styleUrls: ['./reservations-info.component.css'],
  imports: [ChartComponent],
})
export class ReservationsInfoComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {};
  private tokensSub?: Subscription;

  constructor(
    private liveMetricService: LiveMetricsService,
    private hotelConfigService: HotelConfigService
  ) {}

  ngOnInit(): void {
    if (
      this.hotelConfigService.getClientToken() &&
      this.hotelConfigService.getAccessToken()
    ) {
      this.loadChart();
    }
    this.tokensSub = this.hotelConfigService.onTokensChange().subscribe(() => {
      this.loadChart();
    });
  }

  ngOnDestroy(): void {
    this.tokensSub?.unsubscribe();
  }

  private loadChart() {
    forkJoin({
      confirmedReservations:
        this.liveMetricService.getTotalConfirmedReservations(),
      canceledReservations:
        this.liveMetricService.getTotalCanceledReservations(),
    }).subscribe(({ confirmedReservations, canceledReservations }) => {
      this.chartOptions = {
        series: [confirmedReservations, canceledReservations],
        chart: { height: 350, width: 500, type: 'donut' },
        labels: ['Confirmed reservations', 'Canceled reservations'],
        responsive: [
          {
            breakpoint: 600,
            options: {
              chart: { width: 300 },
              legend: { position: 'bottom' },
              title: { text: 'Check Ins / Check Outs' },
             align: 'center'
            },
          },
        ],
      };
    });
  }
}
