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
    // Forzar que use la fecha local sin conversión UTC
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /** 
   * Formato YYYY-MM-DD con ajuste de zona horaria para consultas al backend
   * Compensa el desfase de 3 horas (UTC-3 Argentina)
   */
  formatDBWithTimezone(date: Date): string {
    // Crear una nueva fecha ajustada por la zona horaria
    const adjustedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    const year = adjustedDate.getFullYear();
    const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
    const day = String(adjustedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}