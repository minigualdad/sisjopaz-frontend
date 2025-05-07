import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../../service/survey.service';


@Component({
  selector: 'app-group-change',
  standalone: false,
  templateUrl: './group-change.component.html',
  styleUrl: './group-change.component.scss'
})
export class GroupChangeComponent {
survey: any;
  form: FormGroup;

  constructor(private surveyService: SurveyService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      groupId: new FormControl('', Validators.required),
      surveyId: new FormControl('', Validators.required),
    });
    this.survey = {};
    this.survey.id = this.activatedRoute.snapshot.paramMap.get('id');

  }

  async ngOnInit() {
    this.surveyService.show(this.survey.id)
      .subscribe({
        next: (response: any) => {
          this.survey = response.survey;
          // this.group.date = response.group.date.split('T')[0]
          this.form.patchValue(response.survey);
          this.form.controls['surveyId'].setValue(this.survey.id)
        }
      });
  }
  async groupAssignation() {
    await this.surveyService.groupUpdate({ ...this.form.value })
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Joven asignado correctamente', 'success');
          this.router.navigateByUrl(`/app/beneficiary-group/${this.survey.groupId}`)
        },
        error: (error: any) => {
          Swal.fire('Operación incorrecta', error?.error?.message, 'error');
        }
      });
  }

  onSelectGroupId(event: any) {
    this.form.patchValue({ groupId: event });
  }
}
