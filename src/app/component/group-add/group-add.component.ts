import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GroupService } from '../../service/group.service';

@Component({
    selector: 'app-group-add',
    templateUrl: './group-add.component.html',
    styleUrl: './group-add.component.scss',
    standalone: false
})
export class GroupAddComponent {

  form: FormGroup;
  divipolaId: any;
  constructor(private groupService: GroupService,
              private router: Router) {
    this.form = new FormGroup( {
      name: new FormControl('', Validators.required),
      regionalLinkId: new FormControl('', Validators.required),
      initDate: new FormControl('', Validators.required),
      divipolaId: new FormControl('', Validators.required),
      pointId: new FormControl('', Validators.required),
      observations: new FormControl('', Validators.required),
    });
    
  }
  ngOnInit() {

  }

  async create() {
    await this.groupService.create({...this.form.value})
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Grupo creado correctamente', 'success');
          this.router.navigateByUrl(`/app/group`)
        },
        error: (error) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear el grupo', 'error');
        }
      });
  }
  onDivipolSelect(event: any) {
    this.divipolaId = event;
    this.form.patchValue({ divipolaId: event });
    const defaultPoint = null;
    this.onPointSelect(defaultPoint);
  }

  onRegionalLinkSelect(event: any) {
    this.form.patchValue({ regionalLinkId: event });
  }
  onPointSelect(event: any) {
    this.form.patchValue({ pointId: event });
  }
}
