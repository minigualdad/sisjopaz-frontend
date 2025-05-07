import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../../service/survey.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-survey-finder-region',
  standalone: false,
  templateUrl: './survey-finder-region.component.html',
  styleUrl: './survey-finder-region.component.scss'
})
export class SurveyFinderRegionComponent {
    form: FormGroup;
    surveyData: any;
    @Output() surveyListen: EventEmitter<any> = new EventEmitter();
    @Output() clearListen: EventEmitter<boolean> = new EventEmitter();
    @Input() reset: boolean = false;

    @Input() identification!: number;
    @Input() email!: number;
    survey: any = {};
    loading = false;
    isIdentification: boolean = false;


    constructor(private surveyService: SurveyService) {
        this.form = new FormGroup({
            identification: new FormControl('', Validators.required),
            identificationTypeId: new FormControl('', Validators.required),
        });
        this.checkValue();
    }


    ngAfterContentInit() { }

    ngOnDestroy(): void {
        this.surveyListen.unsubscribe();
        this.clearListen.unsubscribe();
        this.loading = false;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['identification'] && !changes['identification'].firstChange) {
            this.form.get('identification')?.setValue(this.identification);
        }
    }

    checkValue() {
        setTimeout(() => {
            if (this.identification) {
                this.form.patchValue({ identification: this.identification });
            }
        }, 200);
    }

    checkSurveyByIdentification() {
        this.loading = true;
        this.surveyService
            .getByIdentificationTypeAndIdentificationAndRegion(this.form.value)
            .subscribe({
                next: (response: any) => {
                    this.loading = false;
                    if (response.found) {
                        this.surveyData = response.survey;
                        this.surveyListen.emit(this.surveyData);
                    } else {
                        this.surveyData = null;
                        this.surveyListen.emit(false);
                    }
                },
                error: async (error: any) => {
                    Swal.fire('Joven no Encontrado', 'Verifique los datos ingresados e intente nuevamente, recuerde que el joven debe pertenecer a su región', 'warning');
                    this.loading = false;
                    console.error(error);
                }
            }
            );
    }

    setIdentificationType(event: any) {
        this.form.get('identificationTypeId')?.setValue(event);
    }
    async clear() {
        this.clearListen.emit(true);
    }
}
