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
import { HotelConfigService } from '../../../services/hotel-config.service';

@Component({
  selector: 'app-hotel-dropdown',
  standalone: true,
  imports: [NgSelectComponent, NgSelectModule, FormsModule, CommonModule],
  templateUrl: './hotel-dropdown.component.html',
  styleUrl: './hotel-dropdown.component.css',
})
export class HotelDropdownComponent implements OnInit {
 

  hotels: any[] = [];
  selectedHotel: any = null;

  constructor(private hotelConfigService: HotelConfigService) {}
  ngOnInit(): void {
    this.getHotelsArray();
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

  onHotelChange(selectedHotel: any) {
    const { clientToken, accessToken } = selectedHotel;

    this.hotelConfigService.setTokens(clientToken, accessToken);

    // Ahora le avisamos a los componentes que usan estos tokens para que se recarguen
    //
  }
}
