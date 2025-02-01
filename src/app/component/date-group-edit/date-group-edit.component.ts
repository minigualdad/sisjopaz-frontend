import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateGroupService } from '../../service/date-group.service';

@Component({
  selector: 'app-date-group-edit',
  standalone: false,
  templateUrl: './date-group-edit.component.html',
  styleUrl: './date-group-edit.component.scss'
})
export class DateGroupEditComponent {
  dateGroup: any;
  form: FormGroup;

  constructor(private dateGroupService: DateGroupService,  
    private router: Router,  
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    });
    this.dateGroup = {};
    this.dateGroup.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.dateGroupService.show(this.dateGroup.id )
      .subscribe({
        next: (response: any) => {
          this.dateGroup = response.dateGroup;
            this.form.patchValue(response.dateGroup);
        }
      });
  }
  async edit() {
    this.dateGroupService.edit(this.dateGroup.id , this.form.value)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Programación editada correctamente', 'success');
          this.router.navigateByUrl(`/app/date-group`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido editar la programación', 'error');
        }
        
    });
  }
  onUserSelect(event: any) {
    this.form.patchValue({ userId: event });
  }

  onDivipolSelect(event: any) {
    this.form.patchValue({ divipolId: event });
  }
}
