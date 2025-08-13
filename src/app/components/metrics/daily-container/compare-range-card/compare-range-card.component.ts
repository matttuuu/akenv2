import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalendarDataService,CalendarSelection } from '../../../../services/calendar-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-compare-range-card',
  standalone: true,
  templateUrl: './compare-range-card.component.html',
  styleUrl: './compare-range-card.component.css',
  imports: [CommonModule],
})
export class CompareRangeCardComponent implements OnInit, OnDestroy {
  selection: CalendarSelection | null = null;
  variables: any[] = [];
  private subscription: Subscription = new Subscription();
  
  constructor(private calendarDataService: CalendarDataService) {}
  
  ngOnInit(): void {
    // Suscribirse a los cambios de selección del calendario
    this.subscription = this.calendarDataService.selection$.subscribe(selection => {
      if (selection && selection.mode === 'range') {
        this.selection = selection;
        this.processRangeData(selection.data);
        console.log('Range data received:', selection);
      }
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  // Procesar los datos del rango para la tabla
  private processRangeData(data: any[]) {
    if (data && data.length > 0) {
      this.variables = data.map(item => ({
        date: new Date(item.createdat).toLocaleDateString('es-AR'),
        hotelId: item.hotel_id,
        checkIns: item.checkins,
        checkOuts: item.checkouts,
        confirmed: item.confirmedreserves,
        canceled: item.cancelledreserves,
        adr: item.adr
      }));
    }
  }
  
  // Métodos para obtener datos formateados
  get startDate() {
    return this.selection?.startDate?.toLocaleDateString('es-AR') || '';
  }
  
  get endDate() {
    return this.selection?.endDate?.toLocaleDateString('es-AR') || '';
  }
}