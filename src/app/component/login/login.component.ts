import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Roles } from '../../shared/constants/constants';
import { DepartmentService } from '../../service/department.service';
import { DivipolService } from '../../service/divipol.service';
import { IndexedDbService } from '../../service/indexed-db.service';
import { SurveyService } from '../../service/survey.service';
import { QuestionGroupService } from '../../service/question-group.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  authError = false;
  errormessage = "";

  form = new FormGroup({
    'username': new FormControl("", Validators.required),
    'password': new FormControl("", Validators.required)
  })
  isView: boolean = true; // Estado inicial para mostrar 'eye.svg'


  constructor(private route: Router,
    private _userService: UserService,
    private departmentService: DepartmentService,
    private divipolService: DivipolService,
    private indexedDbService: IndexedDbService,
    private surveyService: SurveyService,
    private questionGroupService: QuestionGroupService,
  ) {
  }
  ngOnInit(): void {
  }

  onSubmit() {
    this._userService.login(this.form.value).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('user', response.user);
        localStorage.setItem('role', response.user.role);
        localStorage.setItem('departmentId', response.user.departmentId);
        localStorage.setItem('department', response.user.department);
        if (Object.values(Roles).includes(response.user.role)) {
          this.departmentService.getAll().subscribe({
            next: async (response: any) => {
              await this.indexedDbService.saveDepartments(response.departments);
            },
            error: (err) => {
              console.error('Error fetching departments:', err);
            },
          });
          this.divipolService.getAll().subscribe({
            next: async (response: any) => {
              await this.indexedDbService.saveDivipola(response.divipolas);
            },
            error: (err) => {
              console.error('Error fetching departments:', err);
            },
          });
          this.surveyService.getAllByAccepted().subscribe({
            next: async (response: any) => {
              await this.indexedDbService.savePendingAgreement(response.beneficiaries);
            },
            error: (err) => {
              console.error('Error fetching pendingAggrements:', err);
            },
          })
          this.questionGroupService.getAllCharacterization().subscribe({
            next: async (response: any) => {
              const questions = response.questionGroup.questions;
              await this.indexedDbService.saveQuestionsCharacterization(questions);
            },
            error: (err) => {
              console.error('Error fetching pendingAggrements:', err);
            },
          })
          this.questionGroupService.getAllMonitoreo().subscribe({
            next: async (response: any) => {
              const questions = response.questionGroup.questions;
              await this.indexedDbService.saveQuestionsMonitoring(questions);
            },
            error: (err) => {
              console.error('Error fetching pendingAggrements:', err);
            },
          })

          this.route.navigate(['/app/home']);
        } else {

          this.route.navigate(['/app/home']);
        }
      },
      error: (e) => {
        this.authError = true;
        this.errormessage = e.error.message;
      }
    });
  }

  toggleView() {
    this.isView = !this.isView;
  }

  forgotPassword() {
    this.route.navigate(['/forgot-password']);
  }

}
