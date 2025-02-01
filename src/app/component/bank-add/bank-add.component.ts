import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BankService } from '../../service/bank.service';

@Component({
  selector: 'app-bank-add',
  standalone: false,
  templateUrl: './bank-add.component.html',
  styleUrl: './bank-add.component.scss'
})
export class BankAddComponent {

  form: FormGroup;

  constructor(private bankService: BankService,
              private router: Router) {
    this.form = new FormGroup( {
      name: new FormControl('', Validators.required),
      nit: new FormControl('', Validators.required),
    });
    
  }
  ngOnInit() {

  }


  async create() {
    await this.bankService.create({...this.form.value})
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Banco creado correctamente', 'success');
          this.router.navigateByUrl(`/app/bank`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire({
                title: 'Operación incorrecta',
                text: `No se ha podido crear el banco: ${error.error.error}`,
                icon: 'error',
            });
        }
      });
  }

}
