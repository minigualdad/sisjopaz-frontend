import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BankService } from '../../service/bank.service';

@Component({
  selector: 'app-bank-selector',
  standalone: false,
  templateUrl: './bank-selector.component.html',
  styleUrl: './bank-selector.component.scss'
})
export class BankSelectorComponent {
  form: FormGroup;
  banks: any = [];
  @Output() bankIdListen: EventEmitter<number> = new EventEmitter();
  @Input() bank?: number;

  constructor(
    private bankService: BankService,
  ) {

    this.form = new FormGroup({
      bankId: new FormControl('', [Validators.required]),
    });


    this.bankService.getAll()
      .subscribe({
        next: (response: any) => {
          this.banks = response.banks;
          if (this.bank) {
            this.form.patchValue({ bankId: this.bank });
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
      if (this.bank) {
        this.form.patchValue({ bankId: this.bank });
      }
    }, 300);

  }

  selectBankId(event: any) {
    this.bankIdListen.emit(event.value);
  }
}
