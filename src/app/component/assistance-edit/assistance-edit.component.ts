import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssistanceScannerBeneficiaryService } from '../../service/assistance-scanner-beneficiary.service';
import Swal from 'sweetalert2';
import { AssistanceScannerService } from '../../service/assitance-scanner.service';
import { environment } from '../../../enviroment/enviroment';

@Component({
  selector: 'app-assistance-edit',
  standalone: false,
  templateUrl: './assistance-edit.component.html',
  styleUrl: './assistance-edit.component.scss'
})
export class AssistanceEditComponent implements OnInit{

  id: number;
  form: FormGroup;
  isToggled: boolean = false;
  data:any;
  dataFix:any;
  survey : any = null;
  enviroment = environment.apiUrl;
  backRoute = "app/assistance-error";

  constructor(private activatedRoute: ActivatedRoute,
    private assistanceScannerService: AssistanceScannerService,
    private _assistanceScannerBeneficiary: AssistanceScannerBeneficiaryService,
    private fb: FormBuilder
  ){
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.form = this.fb.group({
      attended: [false],
      errorDescription: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAll();
  }
  
  get attended() {
    return this.form.get('attended')?.value;
  }

  get errorDescription() {
    return this.form.get('errorDescription');
  }
  
  get dateForm() {
    return this.form.get('date');
  }

  async onSelectSurvey(event: any){
    if(event){
      this.survey = event;
    }
  }

  getAll(){
    this.assistanceScannerService.getAllMistakeErrorById(this.id).subscribe({
      next: (response:any) => {
        this.data = {
          year: response?.assistanceScanner?.AssistanceSheet?.AssistanceGenerate?.year,
          month: response?.assistanceScanner?.AssistanceSheet?.AssistanceGenerate?.month,
          group: response?.assistanceScanner?.AssistanceSheet.AssistanceGenerate?.GroupComponent.Group.name,
          component: response?.assistanceScanner?.AssistanceSheet.AssistanceGenerate?.GroupComponent.Component.name,
          url: `${this.enviroment}/${response?.assistanceScanner?.urlFileImageProcessed}`,
          observation: response?.assistanceScanner.observation,
        }
        this.dataFix = {
          assistanceScannerBeneficiarieId: Number(response?.assistanceScannerBeneficiaries?.id),
          dateActivity: response?.assistanceScannerBeneficiaries?.assistanceSignDate
        }
      }
    })
  }

  toggleVisualState() {
    this.isToggled = !this.isToggled;
    this.form.get('attended')?.setValue(this.isToggled);
  }

  get ennabledButton(): boolean {
    return !!this.survey && this.errorDescription?.value?.trim().length > 0 && this.dateForm?.value?.trim().length > 0;
  }
  
  onSubmit() {
    this.dataFix = {
      assistanceScannerId: this.id,
      surveyId: this.survey.id,
      assistance: 'ASISTIÓ',
      observation: this.form.get('errorDescription')?.value,
      dateActivity: this.form.get('date')?.value,
    }

        Swal.fire({
          title: 'Confirma tus datos',
          text: `Subsanarás esta asistencia como ASISTIÓ`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6'
        }).then((result) => {
          if (result.isConfirmed) {
            this._assistanceScannerBeneficiary.fixMistakeError(this.dataFix.assistanceScannerId, this.dataFix.surveyId, this.dataFix?.assistance, this.dataFix?.observation, this.dataFix?.dateActivity ).subscribe({
              next: (response:any)=> {
                Swal.fire({
                      title: 'Subsanacion Exitosa',
                      icon: 'success',
                      confirmButtonText: 'Aceptar',
                      confirmButtonColor: '#16B135',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        window.location.reload();
                      }
                    });
              },
              error: (error: any) => {
              }
            })
          }
        });

  }
}
