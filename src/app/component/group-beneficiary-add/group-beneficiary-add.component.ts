import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GroupService } from '../../service/group.service';
import { GroupBeneficiaryService } from '../../service/group-beneficiary.service';

@Component({
    selector: 'app-group-beneficiary-add',
    templateUrl: './group-beneficiary-add.component.html',
    styleUrl: './group-beneficiary-add.component.scss',
    standalone: false
})
export class GroupBeneficiaryAddComponent {
  group: any
  form: FormGroup;

  constructor(private groupBeneficiaryService: GroupBeneficiaryService,
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.form = new FormGroup({
      groupId: new FormControl('', Validators.required),
      surveyId: new FormControl('', Validators.required),
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
    await this.groupBeneficiaryService.create({ ...this.form.value })
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Joven asignado correctamente', 'success');
          this.router.navigateByUrl(`/app/group`)
        },
        error: (error) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear el joven', 'error');
        }
      });
  }

  onSelectSurveyId(event: any){
    this.form.controls['surveyId'].setValue(event.id);
  }
}
