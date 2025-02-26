import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-update-preregister',
  standalone: false,
  templateUrl: './update-preregister.component.html',
  styleUrl: './update-preregister.component.scss'
})
export class UpdatePreregisterComponent {
  survey: any;
  form: FormGroup;
  reset = false;
  identificationNumber: any;
  errorMessage: string = '';
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
  ];

  documentRestrictions:any = {
    "registro-civil": { min: 8, max: 11, exact: null },
    "tarjeta-de-identidad": { min: 10, max: 11, exact: null },
    "cedula-de-ciudadania": { min: 8, max: 10, exact: null },
    "cedula-extranjeria": { min: null, max: 14, exact: null },
    "pasaporte": { min: null, max: 22, exact: null },
    "menor-sin-id": { min: null, max: null, exact: null }, // Validación especial
    "adulto-sin-id": { min: null, max: null, exact: null }, // Validación especial
    "permiso-especial-de-permanencia": { min: null, max: 21, exact: null },
    "certificado-de-nacido-vivo": { min: null, max: 20, exact: null },
    "carne-diplomatico": { min: 14, max: 14, exact: 14 },
    "salvoconducto": { min: 12, max: 12, exact: 12 },
    "documento-extranjero": { min: null, max: 22, exact: null },
    "permiso-por-proteccion-temporal": { min: 10, max: 10, exact: 10 },
    "no-especificado": { min: null, max: null, exact: null }
  };
  selectedDocumentType: string = '';


  constructor(private surveyService: SurveyService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      identificationType: new FormControl('', [Validators.required]),
      identification: new FormControl('', [Validators.required]),
      firstNameOriginal: new FormControl('', [Validators.required]),
      secondNameOriginal: new FormControl('', []),
      firstLastNameOriginal: new FormControl('', [Validators.required]),
      secondLastNameOriginal: new FormControl('', []),
      bornDateOriginal: new FormControl('', [Validators.required]),
    });
    this.survey = {};
    this.survey.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.surveyService.show(this.survey.id)
      .subscribe({
        next: (response: any) => {
          this.survey = response.survey;
          this.form.patchValue(response.survey);
        }
      });
  }
  async edit() {
    this.surveyService.edit(this.survey.id, this.form.value)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Prerregistro editado correctamente', 'success');
          this.router.navigateByUrl('/app/beneficiary-no-validate')
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido editar el Prerregistro', 'error');
        }
      });
  }
}
