import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Signal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashMainComponent } from '../dash-main/dash-main.component';
import { DateService } from '../../../services/date.service';
import { DailyMetricsService } from '../../../services/daily-metrics.service';
import { CalendarDataService } from '../../../services/calendar-data.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class CalendarComponent implements OnInit {
  selectMode: 'single' | 'range' = 'range';

  @Output() selectModeChanged = new EventEmitter<'range' | 'single'>();

  today = new Date();
  viewDate = signal(new Date(this.today));

  startDate: Date | null = null;

  endDate: Date | null = null;

  weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  constructor(
    private dashMainComponent: DashMainComponent,
    private dateService: DateService,
    private dailyMetricService: DailyMetricsService,
    private calendarDataService: CalendarDataService
  ) {}

  selectedHotelId: string = '1';

  ngOnInit(): void {
    this.dailyMetricService.yesterdayData$.subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.selectedHotelId = data[0].hotel_id.toString();
        }
      },
      error: (err) => {
        console.error('Error en la suscripción del hotel ID:', err);
      },
    });
  }

  currentYear() {
    return this.viewDate().getFullYear();
  }

  currentMonth() {
    return this.viewDate().getMonth();
  }

  get currentMonthName() {
    return this.viewDate().toLocaleString('en-US', { month: 'long' });
  }

  prevMonth() {
    const date = new Date(this.viewDate());
    date.setMonth(date.getMonth() - 1);
    this.viewDate.set(date);
  }

  nextMonth() {
    const date = new Date(this.viewDate());
    date.setMonth(date.getMonth() + 1);
    this.viewDate.set(date);
  }

  calendarDays() {
    const year = this.currentYear();
    const month = this.currentMonth();

    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const days = [];

    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthDays - i);
      days.push({ date, inCurrentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({ date, inCurrentMonth: true });
    }

    while (days.length < 42) {
      const last: Date = days[days.length - 1].date;
      const date = new Date(last);
      date.setDate(date.getDate() + 1);
      days.push({ date, inCurrentMonth: false });
    }

    return days;
  }

  selectDate(date: Date) {
    if (this.selectMode === 'single') {
      this.startDate = date;
      this.endDate = null;
    } else {
      if (!this.startDate || this.endDate) {
        this.startDate = date;
        this.endDate = null;
      } else if (date < this.startDate) {
        this.endDate = this.startDate;
        this.startDate = date;
      } else {
        this.endDate = date;
      }
    }
  }

  toggleSelectMode() {
    this.selectMode = this.selectMode === 'range' ? 'single' : 'range';
    this.startDate = null;
    this.endDate = null;

    this.selectModeChanged.emit(this.selectMode);
  }

  isSelected(date: Date) {
    return (
      this.startDate?.toDateString() === date.toDateString() ||
      this.endDate?.toDateString() === date.toDateString()
    );
  }

  isInRange(date: Date) {
    if (this.startDate && this.endDate) {
      return date > this.startDate && date < this.endDate;
    }
    return false;
  }

  openModal() {
    this.dashMainComponent.openModal();
  }

  closeModal() {
    this.dashMainComponent.closeModal();
  }

  selectModalRangeType(selectedModal: 'single' | 'range') {
    this.selectMode = selectedModal;
  }

  openModalWithSingleDay() {}

  openModalWithRange() {}

  confirmSelection() {
  this.openModal();
 
  if (this.selectMode === 'single' && this.startDate) {
    console.log('Fecha original seleccionada:', this.startDate);
    const formattedDate = this.dateService.formatDBWithTimezone(this.startDate);
    console.log('Fecha formateada con ajuste:', formattedDate);
   
    this.dailyMetricService.getHotelInfoByDate(this.selectedHotelId, formattedDate).subscribe({
      next: (data) => {
        console.log('Datos del día:', data);
        
        // Actualizar el servicio con los datos obtenidos
        this.calendarDataService.updateSelection({
          mode: 'single',
          startDate: this.startDate!,
          hotelId: this.selectedHotelId,
          data: data
        });
      },
      error: (err) => console.error('Error al obtener datos del día:', err)
    });
  } else if (this.selectMode === 'range' && this.startDate && this.endDate) {
    console.log('Fechas originales seleccionadas:', { start: this.startDate, end: this.endDate });
    const formattedStartDate = this.dateService.formatDBWithTimezone(this.startDate);
    const formattedEndDate = this.dateService.formatDBWithTimezone(this.endDate);
    console.log('Fechas formateadas con ajuste:', { start: formattedStartDate, end: formattedEndDate });
   
    this.dailyMetricService.getHotelInfoByRange(this.selectedHotelId, formattedStartDate, formattedEndDate).subscribe({
      next: (data) => {
        console.log('Datos del rango completo:', data);
        
        // Actualizar el servicio con los datos obtenidos
        this.calendarDataService.updateSelection({
          mode: 'range',
          startDate: this.startDate!,
          endDate: this.endDate!,
          hotelId: this.selectedHotelId,
          data: data
        });
      },
      error: (err) => console.error('Error al obtener datos del rango:', err)
    });
  }
}
}
