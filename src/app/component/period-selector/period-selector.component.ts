import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeriodService } from '../../service/period.service';

@Component({
  selector: 'app-period-selector',
  standalone: false,
  templateUrl: './period-selector.component.html',
  styleUrl: './period-selector.component.scss'
})
export class PeriodSelectorComponent {

  form: FormGroup;
  periods: any = [];
  @Output() periodIdListener: EventEmitter<number> = new EventEmitter();

  constructor(
    private periodService: PeriodService,
  ) {

    this.form = new FormGroup({
      periodId: new FormControl('', [Validators.required]),
    });


  }
  ngOnInit() {
    this.periodService.getAll()
      .subscribe({
        next: (response: any) => {
          this.periods = response.periods;
        }
      });
  }

  ngAfterContentInit() {
  }

  selectPeriodId(event: any) {
    this.periodIdListener.emit(event.value);
  }

}
