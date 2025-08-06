import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
} from 'ng-apexcharts';
import { forkJoin, Subscription } from 'rxjs';
import { LiveMetricsService } from '../../../../services/live-metrics.service';
import { HotelConfigService } from '../../../../services/hotel-config.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-check-ins-outs',
  templateUrl: './check-ins-outs.component.html',
  styleUrl: './check-ins-outs.component.css',
  imports: [ChartComponent],
})
export class CheckInsOutsComponent implements OnInit, OnDestroy {
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
      confirmedCheckIns: this.liveMetricService.getTotalCheckIns(),
      confirmedCheckOuts: this.liveMetricService.getTotalCheckOuts(),
    }).subscribe(({ confirmedCheckIns, confirmedCheckOuts }) => {
      this.chartOptions = {
        series: [confirmedCheckIns, confirmedCheckOuts],
        chart: { height: 350, width: 500, type: 'donut' },
        labels: ['Check Ins', 'Check Outs'],
        responsive: [
          {
            breakpoint: 600,
            options: {
              chart: { width: 300 },
              legend: { position: 'bottom' },
              title: { text: 'Check Ins / Check Outs' },
              align: 'center',
            },
          },
        ],
      };
    });
  }
}
