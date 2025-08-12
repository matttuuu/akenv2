import { Component, EventEmitter, OnInit, Output, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashMainComponent } from '../dash-main/dash-main.component';
import { DateService } from '../../../services/date.service';
import { DailyMetricsService } from '../../../services/daily-metrics.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class CalendarComponent implements OnInit{
  selectMode: 'single' | 'range' = 'range';

  @Output() selectModeChanged = new EventEmitter<'range' | 'single'>();



  today = new Date();
  viewDate = signal(new Date(this.today));

  startDate: Date | null = null;
  //test startdate
  
  endDate: Date | null = null;

  weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  constructor(private dashMainComponent: DashMainComponent, private dateService: DateService, dailyMetricService: DailyMetricsService) {}

  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
    //Logica de selección de fechas

    if (this.selectMode === 'single') {
      this.startDate = date;
      this.endDate = null;
      // console.log('Día seleccionado (modo single):', this.startDate); //CONSOLE LOG DE PRUEBA
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
      // console.log('Fechas seleccionadas (modo rango):', {
      //   start: this.startDate,
      //   end: this.endDate,
      // }); //CONSOLE LOG DE PRUEBA
    }
  }

  toggleSelectMode() {
    this.selectMode = this.selectMode === 'range' ? 'single' : 'range';
    this.startDate = null;
    this.endDate = null;
    //testin

    this.selectModeChanged.emit(this.selectMode); //
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
    this.dashMainComponent.openModal(); //Lo que podria hacer es tener 2 metodos en esta clase, algo asi como openDayModal y openRangeModal,
  }

  closeModal() {
    this.dashMainComponent.closeModal();
  }

  selectModalRangeType(selectedModal: 'single' | 'range') {
    //PROBANDO ESTO AHORA
    this.selectMode = selectedModal;
  }

  ////////////////////////////////////////  TEST DE MODALES

  openModalWithSingleDay() {}

  openModalWithRange() {}

  ////////////////////////////////////////
  confirmSelection() {
    this.openModal(); //Abro el modal -- Este modal tiene que tener o el componente de rango, o el de día, segun este el boton puesto
    if (this.selectMode === 'single') {
      console.log('Día seleccionado (modo single):', this.startDate);
    } else if (this.selectMode === 'range') {
      console.log('Fechas seleccionadas (modo rango):', {
        start: this.startDate,
        end: this.endDate,
      });
    }
  }
}
