import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DivipolService } from '../../service/divipol.service';

@Component({
  selector: 'app-divipol-availability-date-add',
  standalone: false,
  templateUrl: './divipol-availability-date-add.component.html',
  styleUrl: './divipol-availability-date-add.component.scss'
})
export class DivipolAvailabilityDateAddComponent {

  form: FormGroup;
  divipol: any;
  minClosingDate: string | null = null;

  constructor(private divipolService: DivipolService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.form = new FormGroup({
      openingDate: new FormControl('', Validators.required),
      closingDate: new FormControl('', Validators.required),
    });
    this.divipol = {};
    this.divipol.id = this.activatedRoute.snapshot.paramMap.get('id');
  }
  
  ngOnInit() {
    this.showDivipola();
  }

  showDivipola(){
    this.divipolService.show(this.divipol.id )
    .subscribe({
      next: (response: any) => {
        this.divipol = response.divipola;
          this.form.patchValue(response.divipola);
      }
    });
  }

  updateClosingMinDate() {
    const openingDate = this.form.get('openingDate')?.value;
    if (openingDate) {
      this.minClosingDate = openingDate;
    }
  }


  async create() {
    await this.divipolService.addAvailabilityDates(this.divipol.id, { ...this.form.value })
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Fechas creadas correctamente', 'success');
          this.router.navigateByUrl(`/app/divipol`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear las fechas', 'error');
        }
      });
  }

}
