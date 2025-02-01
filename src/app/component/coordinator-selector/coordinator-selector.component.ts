import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoordinatorService } from '../../service/coordinator.service';
@Component({
  selector: 'app-coordinator-selector',
  standalone: false,
  templateUrl: './coordinator-selector.component.html',
  styleUrl: './coordinator-selector.component.scss'
})
export class CoordinatorSelectorComponent {
 form: FormGroup;
  coordinators: any = [];
  @Output() coordinatorIdListen: EventEmitter<number> = new EventEmitter();
  @Input() coordinator?: number;

  constructor(
    private coordinatorService: CoordinatorService,
  ) {

    this.form = new FormGroup({
      coordinatorId: new FormControl('', [Validators.required]),
    });

    this.coordinatorService.getAll()
      .subscribe({
        next: (response: any) => {
          this.coordinators = response.coordinators;
          if (this.coordinator) {
            this.form.patchValue({ coordinatorId: this.coordinator });
          }
        }
      });
  }
  ngOnInit() {
    this.checkValue();

  }

  ngAfterContentInit() {
  }

  checkValue() {
    setTimeout(() => {
      if (this.coordinator) {
        this.form.patchValue({ coordinatorId: this.coordinator });
      }
    }, 300);

  }

  selectCoordinatorId(event: any) {
    this.coordinatorIdListen.emit(event.value);
  }
}
