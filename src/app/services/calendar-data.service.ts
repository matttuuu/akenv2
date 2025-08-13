import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CalendarSelection {
  mode: 'single' | 'range';
  startDate: Date;
  endDate?: Date;
  hotelId: string;
  data?: any; // Los datos obtenidos de la API
}

@Injectable({
  providedIn: 'root'
})
export class CalendarDataService {
  private selectionSubject = new BehaviorSubject<CalendarSelection | null>(null);
  
  // Observable que otros componentes pueden suscribirse
  selection$ = this.selectionSubject.asObservable();
  
  constructor() {}
  
  // Método para actualizar la selección del calendario
  updateSelection(selection: CalendarSelection) {
    this.selectionSubject.next(selection);
  }
  
  // Método para obtener la selección actual
  getCurrentSelection(): CalendarSelection | null {
    return this.selectionSubject.value;
  }
  
  // Método para limpiar la selección
  clearSelection() {
    this.selectionSubject.next(null);
  }
}