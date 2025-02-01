import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BankService } from '../../service/bank.service';
@Component({
  selector: 'app-bank-edit',
  standalone: false,
  templateUrl: './bank-edit.component.html',
  styleUrl: './bank-edit.component.scss'
})
export class BankEditComponent {
  bank: any;
  form: FormGroup;

  constructor(private bankService: BankService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      nit: new FormControl('', Validators.required)
    });
    this.bank = {};
    this.bank.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.bankService.show(this.bank.id)
      .subscribe({
        next: (response: any) => {
          this.bank = response.bank;
          this.form.patchValue(response.bank);
        }
      });
  }
  async edit() {
    this.bankService.edit(this.bank.id, this.form.value)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Banco editado correctamente', 'success');
          this.router.navigateByUrl('/app/bank')
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido editar el banco', 'error');
        }
      });
  }
}
