import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-month-year-selector',
  standalone: false,
  templateUrl: './month-year-selector.component.html',
  styleUrl: './month-year-selector.component.scss'
})
export class MonthYearSelectorComponent {
months: { value: number; name: string }[] = [];
  years: number[] = [];
  loading: boolean = false;
  monthSelected: any;
  yearSelected: any;
  @Output() monthYearListener: EventEmitter<any> = new EventEmitter();

  constructor(
  ) {
  }

  ngOnInit(): void {
    this.initializeMonthYearOptions();
  }

  initializeMonthYearOptions(): void {
    this.months = [
      { value: 1, name: 'Enero' },
      { value: 2, name: 'Febrero' },
      { value: 3, name: 'Marzo' },
      { value: 4, name: 'Abril' },
      { value: 5, name: 'Mayo' },
      { value: 6, name: 'Junio' },
      { value: 7, name: 'Julio' },
      { value: 8, name: 'Agosto' },
      { value: 9, name: 'Septiembre' },
      { value: 10, name: 'Octubre' },
      { value: 11, name: 'Noviembre' },
      { value: 12, name: 'Diciembre' },
    ];
    this.years = Array.from(
      { length: new Date().getFullYear() - 2024 + 2 },
      (_, i) => 2024 + i
    );
  }
  selectMonth(event: any) {
    this.monthSelected = Number(event.target.value);
    const monthYear = {
      month: this.monthSelected,
      year: this.yearSelected
    }
    this.monthYearListener.emit(monthYear);
  }

  selectYear(event: any) {
    this.yearSelected = Number(event.target.value);
    const monthYear = {
      month: this.monthSelected,
      year: this.yearSelected
    }
    this.monthYearListener.emit(monthYear);
  }
}

