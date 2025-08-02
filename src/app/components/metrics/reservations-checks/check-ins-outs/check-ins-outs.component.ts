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
import { forkJoin } from 'rxjs';
import { LiveMetricsService } from '../../../../services/live-metrics.service';

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
export class CheckInsOutsComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {}; // Inicializamos vacío

  constructor(private liveMetricService: LiveMetricsService) {}
  ngOnInit(): void {
    forkJoin({
      confirmedCheckIns: this.liveMetricService.getTotalCheckIns(),
      confirmedCheckOuts: this.liveMetricService.getTotalCheckOuts(),
    }).subscribe(({ confirmedCheckIns, confirmedCheckOuts }) => {
      this.chartOptions = {
        series: [confirmedCheckIns, confirmedCheckOuts],
        chart: {
          width: 380,
          type: 'donut',
        },
        labels: ['Check Ins', 'Check Outs'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: 'bottom',
              },
              title: {
                text: "Check Ins / Check Outs"
              }
            },
          },
        ],
      };
    });
  }
}
