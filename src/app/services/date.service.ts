import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  /** Obtiene la fecha de hoy como objeto Date */
  getToday(): Date {
    return new Date();
  }

  /** Obtiene la fecha de ayer como objeto Date */
  getYesterday(): Date {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }

  /** Formato d/m/yyyy */
  formatShort(date: Date): string {
    return date.toLocaleDateString('es-AR');
  }

  /** Formato YYYY-MM-DD para base de datos */ 
  formatDB(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
}
