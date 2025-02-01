import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GroupService } from '../../service/group.service';
import { GroupScheduleService } from '../../service/group-schedule.service';

@Component({
    selector: 'app-group-schedule-add',
    templateUrl: './group-schedule-add.component.html',
    styleUrl: './group-schedule-add.component.scss',
    standalone: false
})
export class GroupScheduleAddComponent {
  group: any
  form: FormGroup;

  constructor(private groupScheduleService: GroupScheduleService,
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.form = new FormGroup({
      groupId: new FormControl('', Validators.required),
      coresponsabilityId: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
    });
    this.group = {};
    this.group.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.form.controls['groupId'].setValue(this.group.id);

  }
  ngOnInit() {
    this.getGroup()
  }


async getGroup(){
  this.groupService.show(this.group.id)
  .subscribe((response: any) => {
    this.group = response.group;
  })
}

  async create() {
    await this.groupScheduleService.create({ ...this.form.value })
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'horario creado correctamente', 'success');
          this.router.navigateByUrl(`/app/group-schedule/${this.group.id}`)
        },
        error: (error) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear el horario', 'error');
        }
      });
  }
  onCoresponsabilitySelect(event: any) {
    this.form.patchValue({ coresponsabilityId: event });

  }
  
  onSelectTime(event: any){
    this.form.controls['time'].setValue(event);
  }

}
