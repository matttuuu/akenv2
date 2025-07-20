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
    imports: [ChartComponent]
})
export class CheckInsOutsComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {}; // Inicializamos vacío

  constructor(private liveMetricService: LiveMetricsService) {}
  ngOnInit(): void {
  this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
}
