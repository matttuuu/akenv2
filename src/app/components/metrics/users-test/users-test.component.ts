import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
} from 'ng-apexcharts';
import { Observable } from 'rxjs';
import { TestUsersService } from '../../../services/test-users.service';
import { UsersService } from '../../../services/users.service';
import { LiveMetricsService } from '../../../services/live-metrics.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-users-test',
  templateUrl: './users-test.component.html',
  styleUrl: './users-test.component.css',
  standalone: true,
  imports: [ChartComponent],
})
export class UsersTestComponent implements OnInit {
  fakeUsersData: any[] = [];
  fakeUserName: string[] = [];
  fakeAge: number[] = [];

  @ViewChild('chart')
  chart!: ChartComponent; // ! : non null assertion operator, es un operador que usamos para decirle a angular que estamos seguros de que vamos a darle un valor a una variable, o que esta será inicalizada mas adelante
  public chartOptions!: Partial<ChartOptions>;

  ngOnInit(): void {
    this.testUsersService.getUsers().subscribe((data) => {
      console.log('Lista de usuarios de prueba: ', data);

      this.fakeUsersData = data; // me guardo toda la respuesta de la peticion en esta variable
      //Extraigo la info necesaria
      this.fakeUserName = data.map(
        (u: { username: any; age: number }) => u.username
      );
      this.fakeAge = data.map((u: { username: any; age: number }) => u.age); //Si esto funciona, deberia usar cada array de resultados en mi chart y llenarlo
      //Posteriormente, utilizaria mas llamadas a mi api, para que se comunique con la DB, y que sea esta en donde se almacene la informacion
      // (Dicha informacion se deberia actualizar: 1-Al inicio de cada dia, automaticamente   / 2-Cuando el usuario (Admin o gerente) actualiza o inserta algo mediante la app / 3-Cuando se detecte un cambio de ciertas metricas (como habitaciones actualmente ocupadas, por ej) )
      console.log('Lista de nombres: ', this.fakeUserName);
      console.log('Lista de edades: ', this.fakeAge); //Funciona

      this.liveMetricService.makeGetTokensSpeak(); //Que dice??

      // console.log("INFO PRIMER TEST LIVE METRICS: " + this.liveMetricService.getAllLiveMetrics() )
      // this.liveMetricService.getAllLiveMetrics().subscribe((data) => {
      //   console.log('Info de metricas live: ' + data);
      // });

      console.log('Info de CheckIns y Outs abajo: ');
      this.liveMetricService.getTotalCheckIns().subscribe((totalCheckIns) => {
        console.log('Total CheckIns:', totalCheckIns);
      });

      this.liveMetricService.getTotalCheckOuts().subscribe((totalCheckOuts) => {
        console.log('Total CheckOuts:', totalCheckOuts);
      });

      this.liveMetricService
        .getTotalConfirmedReservations()
        .subscribe((totalConfimed) => {
          console.log('Total Confirmed Reservations', totalConfimed);
        });

      this.liveMetricService
        .getTotalCanceledReservations()
        .subscribe((totalCanceled) => {
          console.log('Total Canceled Reservations', totalCanceled);
        });

      this.liveMetricService.getTotalRooms().subscribe((totalRooms) =>{
        console.log('Total hotel rooms', totalRooms)
      })

      this.liveMetricService.getTotalDirtyRooms().subscribe((totalDirty) => {
        console.log('Total dirty Rooms', totalDirty);
      });

      this.liveMetricService.getTotalCleanRooms().subscribe((totalClean) => {
        console.log('Total Clean Rooms', totalClean);
      });

      this.liveMetricService.getTotalOccupiedRooms().subscribe((totalOccupied) => {
        console.log("Total occupied Rooms TESTING", totalOccupied)
      })

      this.liveMetricService.getADR().subscribe((totalADR) =>{
        console.log("TOTAL ADR TESTING", totalADR)
      })
      

      ////Opciones y config chart
      this.chartOptions = {
        series: [
          {
            name: 'edades de usuarios',
            data: this.fakeAge,
          },
        ],
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            dataLabels: {
              // position: 'top', // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + '%';
          },
          offsetY: -20,
          style: {
            fontSize: '5px',
            colors: ['#304758'],
          },
        },

        xaxis: {
          categories: this.fakeUserName,
          // 'Jan',
          // 'Feb',
          // 'Mar',
          // 'Apr',
          // 'May',
          // 'Jun',
          // 'Jul',
          // 'Aug',
          // 'Sep',
          // 'Oct',
          // 'Nov',
          // 'Dec',
          // this.fakeUserName.toString()
          position: 'top',
          labels: {
            offsetY: -2,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: false,
            offsetY: -35,
          },
        },
        fill: {
          type: 'solid',
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100],
          },
        },
        yaxis: {
          axisBorder: {
            show: true,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + '%';
            },
          },
        },
        title: {
          text: 'Edad de usuarios de prueba',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#454545', //Color de titulo
          },
        },
      };
    });
  }

  // @ViewChild('chart')
  // chart!: ChartComponent;
  // public chartOptions: Partial<ChartOptions>;

  constructor(
    private http: HttpClient,
    private testUsersService: TestUsersService,
    private liveMetricService: LiveMetricsService
  ) {}
}
