import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IdentificationTypeService } from '../../service/identification-type.service';

@Component({
  selector: 'app-identification-type-selector',
  standalone: false,
  templateUrl: './identification-type-selector.component.html',
  styleUrl: './identification-type-selector.component.scss'
})
export class IdentificationTypeSelectorComponent {
  form: FormGroup;
  identificationTypes: any = [];
  @Output() identificationTypeIdListen: EventEmitter<number> = new EventEmitter();
  @Input() identificationType?: number;

  constructor(
    private identificationTypeService: IdentificationTypeService,
  ) {
    this.form = new FormGroup({
      identificationTypeId: new FormControl('', [Validators.required]),
    });


    this.identificationTypeService.getAll()
      .subscribe({
        next: (response: any) => {
          this.identificationTypes = response.identificationTypes;
          if (this.identificationType) {
            this.form.patchValue({ identificationTypeId: this.identificationType });
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
      if (this.identificationType) {
        this.form.patchValue({ identificationTypeId: this.identificationType });
      }
    }, 300);

  }

  selectIdentificationTypeId(event: any) {
    this.identificationTypeIdListen.emit(event.value);
  }
}
