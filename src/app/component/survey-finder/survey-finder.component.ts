import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../../service/survey.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-survey-finder',
    standalone: false,
    templateUrl: './survey-finder.component.html',
    styleUrl: './survey-finder.component.scss'
})
export class SurveyFinderComponent {
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
    document = [
        { key: "registro-civil", value: "Registro Civil" },
        { key: "tarjeta-de-identidad", value: "Tarjeta de Identidad" },
        { key: "cedula-de-ciudadania", value: "Cedula de Ciudadania" },
        { key: "cedula-extranjeria", value: "Cedula Extranjeria" },
        { key: "pasaporte", value: "Pasaporte" },
        { key: "menor-sin-id", value: "Menor sin Id" },
        { key: "adulto-sin-id", value: "Adulto sin Id" },
        { key: "permiso-especial-de-permanencia", value: "Permiso Especial de Permanencia" },
        { key: "certificado-de-nacido-vivo", value: "Certificado de Nacido Vivo" },
        { key: "carne-diplomatico", value: "Carne Diplomatico" },
        { key: "salvoconducto", value: "Salvoconducto" },
        { key: "documento-extranjero", value: "Documento Extranjero" },
        { key: "permiso-por-proteccion-temporal", value: "Permiso por proteccion temporal" },
        { key: "no-especificado", value: "No Especificado" }
    ]


    constructor(private surveyService: SurveyService) {
        this.form = new FormGroup({
            identification: new FormControl('', Validators.required),
            identificationType: new FormControl('', Validators.required),
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
            .getByIdentificationTypeAndIdentification(this.form.value)
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
                    Swal.fire('Joven no Encontrado', 'Verifique los datos ingresados e intente nuevamente', 'warning');
                    this.loading = false;
                    console.error(error);
                }
            }
            );
    }

    setIdentificationType(event: string) {
        this.form.get('identificationType')?.setValue(event);
    }
    async clear() {
        this.clearListen.emit(true);
    }
}
