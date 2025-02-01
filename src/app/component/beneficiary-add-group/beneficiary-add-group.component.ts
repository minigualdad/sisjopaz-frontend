import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GroupService } from '../../service/group.service';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-beneficiary-add-group',
  standalone: false,
  templateUrl: './beneficiary-add-group.component.html',
  styleUrl: './beneficiary-add-group.component.scss'
})
export class BeneficiaryAddGroupComponent {
  group: any
  form: FormGroup;

  constructor(private surveyService: SurveyService,
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

  async groupAssignation() {
    await this.surveyService.groupAssignation({ ...this.form.value })
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Joven asignado correctamente', 'success');
          this.router.navigateByUrl(`/app/beneficiary-group/${this.group.id}`)
        },
        error: (error: any) => {
          Swal.fire('Operación incorrecta', error?.error?.message, 'error');
        }
      });
  }

  onSelectSurveyId(event: any){
    this.form.controls['surveyId'].setValue(event.id);
  }
}
