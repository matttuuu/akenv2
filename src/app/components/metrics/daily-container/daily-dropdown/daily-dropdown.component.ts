import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import {
  NgSelectComponent,
  NgSelectModule,
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
} from '@ng-select/ng-select';
import { Observable } from 'rxjs';
import { HotelConfigService } from '../../../../services/hotel-config.service';
import { DailyMetricsService } from '../../../../services/daily-metrics.service';
import { HttpClient } from '@angular/common/http';
import { DateService } from '../../../../services/date.service';

//Este componente debe ser usado con consultas hacia db! Hacer lo mismo que hace el live, pero con la db local (posiblemente render?)
@Component({
  selector: 'app-daily-dropdown',
  standalone: true,
  templateUrl: './daily-dropdown.component.html',
  styleUrl: './daily-dropdown.component.css',
  imports: [NgSelectModule, FormsModule, CommonModule],
})
export class DailyDropdownComponent {
  private apiURL = 'http://localhost:3000/api/dailyMetrics';

  hotels: any[] = [];
  selectedHotel: any = null;
  tokens: any;
  previousDayHotelInfo: any;
  yesterdayDB!: string;

  hotelDataYesterday: any = null; 

  constructor(
    private dailyMetricService: DailyMetricsService,
    private hotelConfigService: HotelConfigService,
    private dateService: DateService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.yesterdayDB = this.dateService.formatDB(
      this.dateService.getYesterday()
    );
    this.getHotelsArray(); //Este metodo esta bien, trae los hoteles que esten en la db
    //Aca va el metodo para traer la info del hotel de ayer, usando el servicio daily metrics
    this.getPreviousDayHotelInfo();

    this.dailyMetricService.yesterdayData$.subscribe({
      next: (data) => {
        this.hotelDataYesterday = data;
        
      },
      error: (err) => {
        console.error('Error en la suscripción:', err);
      },
    });
  }

  getHotelsArray() {
    this.hotelConfigService.getHotelsList().subscribe({
      next: (response) => {
        this.hotels = response; // cada hotel tiene un: name, clientToken, accessToken, id
      },
      error: (error) => {
        console.error('Hubo un error obteniendo los hoteles de la db: ', error);
      },
    });
  }


  //Para ver si vamos en el camino correcto, vamos a crear un metodo que nos traiga la info del hotel de ayer, similar al de arriba, pero usando el servicio dailyMetricsService
  //Este metodo funciona similar al de arriba, pero usando la db, y que me devuelve la info del hotel de ayer que yo seleccione en el dropdown

  onHotelChangeDB(hotel: any) {
    //en el html, (change) o (ngModelChange) deberia llamar a onHotelChangeDB($event), para que se ejecute este metodo cuando se cambie el hotel seleccionado
    if (hotel && hotel.id) {
      this.dailyMetricService
        .getHotelInfoByDate(hotel.id, this.yesterdayDB)
        .subscribe({
          next: (hotelInfo) => {
            
            this.dailyMetricService.setYesterdayData(hotelInfo);
          },
          error: (err) => {
            console.error('Error obteniendo datos del hotel:', err);
            this.dailyMetricService.setYesterdayData(null);
          },
        });
    }
  }

  getPreviousDayHotelInfo() {
    if (!this.hotels.length) {
      console.warn('No hay hoteles en la lista');
      return;
    }

    const defaultHotelId = this.hotels[0].id; //Me da el id del primer hotel en la lista
    const yesterday = this.dateService.formatDB(
      this.dateService.getYesterday()
    );

    this.dailyMetricService
      .getHotelInfoByDate(defaultHotelId, yesterday)
      .subscribe({
        next: (hotelInfo) => {
          this.previousDayHotelInfo = hotelInfo;
          console.log('Info hotel día anterior:', hotelInfo);
        },
        error: (err) => console.error('Error obteniendo info del hotel:', err),
      });
  }
}
