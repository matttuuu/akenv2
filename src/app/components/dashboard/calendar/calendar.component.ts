import { Component, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  standalone: true,
  imports: [CommonModule],
})
export class CalendarComponent {
  selectMode: 'single' | 'range' = 'range';

  today = new Date();
  viewDate = signal(new Date(this.today));

  startDate: Date | null = null;
  endDate: Date | null = null;

  weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

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
}
