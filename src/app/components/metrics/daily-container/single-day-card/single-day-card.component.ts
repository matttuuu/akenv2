import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDataService,CalendarSelection } from '../../../../services/calendar-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-day-card',
  standalone: true,
  templateUrl: './single-day-card.component.html',
  styleUrl: './single-day-card.component.css',
  imports: [CommonModule]
})
export class SingleDayCardComponent implements OnInit, OnDestroy {
  selection: CalendarSelection | null = null;
  private subscription: Subscription = new Subscription();
  
  constructor(private calendarDataService: CalendarDataService) {}
  
  ngOnInit(): void {
    // Suscribirse a los cambios de selección del calendario
    this.subscription = this.calendarDataService.selection$.subscribe(selection => {
      if (selection && selection.mode === 'single') {
        this.selection = selection;
        console.log('Single day data received:', selection);
      }
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  // Método para obtener los datos del día
  get dayData() {
    return this.selection?.data?.[0] || null;
  }
  
  // Método para formatear la fecha
  get formattedDate() {
    return this.selection?.startDate.toLocaleDateString('es-AR') || '';
  }
}