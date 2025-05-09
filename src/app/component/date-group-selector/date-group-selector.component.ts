import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateGroupService } from '../../service/date-group.service';

@Component({
  selector: 'app-date-group-selector',
  standalone: false,
  templateUrl: './date-group-selector.component.html',
  styleUrl: './date-group-selector.component.scss'
})
export class DateGroupSelectorComponent {
  form: FormGroup;
  dateGroups: any = [];
  @Output() dateGroupIdListen: EventEmitter<number> = new EventEmitter();
  @Input() dateGroup?: number;

  constructor(
    private dateGroupService: DateGroupService,
  ) {

    this.form = new FormGroup({
      dateGroupId: new FormControl('', [Validators.required]),
    });


    this.dateGroupService.getAll()
      .subscribe({
        next: (response: any) => {
          this.dateGroups = response.dateGroups;
          if (this.dateGroup) {
            this.form.patchValue({ dateGroupId: this.dateGroup });
          }
        }
      });
  }
  ngOnInit() {
    this.checkValue();

  }

  ngAfterContentInit() {
    this.checkValue();
  }

  checkValue() {
    setTimeout(() => {
      if (this.dateGroup) {
        this.form.patchValue({ dateGroupId: this.dateGroup });
      }
    }, 300);

  }

  selectDateGroupId(event: any) {
    this.dateGroupIdListen.emit(event.value);
  }
}
