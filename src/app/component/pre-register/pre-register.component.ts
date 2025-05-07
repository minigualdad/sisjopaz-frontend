import { Component, OnChanges } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormService } from '../../service/form.service';
import { IndexedDbService } from '../../service/indexed-db.service';
import Swal from 'sweetalert2';
import { UserService } from '../../service/user.service';
import { DivipolService } from '../../service/divipol.service';
import { DepartmentService } from '../../service/department.service';
import { Router } from '@angular/router';
import { QuestionGroupService } from '../../service/question-group.service';

@Component({
  selector: 'app-pre-register',
  standalone: false,
  templateUrl: './pre-register.component.html',
  styleUrl: './pre-register.component.scss'
})
export class PreRegisterComponent implements OnChanges {
  showModal = false;
  form: FormGroup;
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


  frontImageUrl: string | ArrayBuffer | null = null;
  backImageUrl: string | ArrayBuffer | null = null;
  age = 0;
  departments = [];
  municipalities = [];
  qty = 0;
  syncStatus = '';
  reset = false;
  user: any;
  conditionsAccepted: boolean = false;
  date: any = new Date();
  todayDate: any;
  divipola: any
  hasWhatsapp = false;
  userDepartment: any;
  role: any;
  departmentName: any;
  questions: any[] = [];
  subgroups: any[] = [];
  completedAllQuestions = false;
  questionData: any = [];

  documentRestrictions:any = {
    4: { min: 8, max: 11, exact: null },
    2: { min: 10, max: 11, exact: null },
    1: { min: 8, max: 10, exact: null },
    5: { min: null, max: 14, exact: null },
    6: { min: null, max: 22, exact: null },
    7: { min: null, max: null, exact: null }, // Validación especial
    8: { min: null, max: null, exact: null }, // Validación especial
    9: { min: null, max: 21, exact: null },
    10: { min: null, max: 20, exact: null },
    11: { min: 14, max: 14, exact: 14 },
    12: { min: 12, max: 12, exact: 12 },
    13: { min: null, max: 22, exact: null },
    3: { min: 10, max: 10, exact: 10 },
    14: { min: null, max: null, exact: null }
  };
  
  selectedDocumentType: string = '';
  identificationNumber: string = '';
  errorMessage: string = '';

  constructor(
    private indexedDbService: IndexedDbService,
    private formService: FormService,
    private userService: UserService,
    private divipolService: DivipolService,
    private router: Router,
    private departmentService: DepartmentService,
    private questionGroupService: QuestionGroupService,
  ) {
    this.form = new FormGroup({
      //cabecera JeP
      program: new FormControl('jóvenes-en-paz', [Validators.required]),
      registryTarget: new FormControl('pre-inscripcion', [Validators.required]),
      ministeryVinculation: new FormControl('', [Validators.required]),
      registryFrom: new FormControl('', [Validators.required]),
      autorizationMinistery: new FormControl('', [Validators.required]),
      autorizationData: new FormControl('', [Validators.required]),
      //Pre-Registro
      identificationTypeId: new FormControl('', [Validators.required]),
      identification: new FormControl('', [Validators.required]),
      identificationExpeditionOriginal: new FormControl('', [Validators.required]),
      firstNameOriginal: new FormControl('', [Validators.required]),
      secondNameOriginal: new FormControl('', []),
      firstLastNameOriginal: new FormControl('', [Validators.required]),
      secondLastNameOriginal: new FormControl('', []),
      bornDateOriginal: new FormControl('', [Validators.required]),
      hasCorrectAgeRange: new FormControl(true, []),
      calculatedAge: new FormControl('', [Validators.required, Validators.min(14), Validators.max(28)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl('', [Validators.required]),
      municipality: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      hasWhatsapp: new FormControl('', [Validators.required]),
      whatsappNumber: new FormControl(''),
      sex: new FormControl('', []),
      questionData: new FormControl('', [Validators.required]),
    });
    this.userDepartment = Number(localStorage.getItem('departmentId'));
    this.role = localStorage.getItem('role');
    this.departmentName = localStorage.getItem('department');
  }

  async ngOnInit() {
    this.setQuestions();
    if(this.role === 'ADMIN' || this.role === 'DIRECCION'){
    this.departmentService.getAll().subscribe({
      next: (response: any) => {
        this.departments = response.departments.map((department: any) => {
          return { key: department.id, value: department.name };
        })
      }
    });
  } else {
    this.form.controls['department'].setValue(this.userDepartment);
    this.setDepartment(this.userDepartment);
  }
    this.qty = await this.indexedDbService.getQuantityPreregister();
    this.detectConnection();
    // this.getUser();
  }

  ngOnChanges() {
    this.isRequiredCompletes()
  }
  async getUser() {
    await this.userService.getUser()
      .subscribe(async (response: any) => {
        this.user = response.user;
        this.form.controls['department'].setValue(this.user.Divipola.departmentId);
        await this.divipolService.getByDepartmentId(this.user.Divipola?.departmentId)
        .subscribe({
          next: (response: any) => {
            this.municipalities = response.divipolas.map((divipol: any) => {
              return { key: divipol.id, value: divipol.name };
            });
          }
        });
      });
  }

  detectConnection(): void {
    if (navigator.onLine) {
      this.syncStatus = 'Internet activo';
      this.syncWithServer(); // Puedes iniciar sincronización si está en línea
    } else {
      this.syncStatus = 'Modo offline';
    }
    window.addEventListener('online', () => {
      this.syncStatus = '';
      this.syncWithServer();
    });

    window.addEventListener('offline', () => {
      this.syncStatus = 'Modo offline. ';
    });
  }

  onDocumentTypeChange(event: any) {
    this.selectedDocumentType = event;
    this.form.controls['identificationTypeId'].setValue(this.selectedDocumentType);
    this.validateIdentificationNumber();
  }
  
  validateIdentificationNumber() {
    const restrictions = this.documentRestrictions[this.selectedDocumentType];
    if (!restrictions) return;
    const length = this.identificationNumber.length;
    if (restrictions.exact !== null && length !== restrictions.exact) {
      this.showError(`El número de documento debe tener exactamente ${restrictions.exact} dígitos.`);
      return;
    }
    if (restrictions.min !== null && length < restrictions.min) {
      this.showError(`El número de documento debe tener al menos ${restrictions.min} dígitos.`);
      return;
    }
    if (restrictions.max !== null && length > restrictions.max) {
      this.showError(`El número de documento no puede tener más de ${restrictions.max} dígitos.`);
      return;
    }
    this.clearError();
  }
  
  showError(message: string) {
    this.errorMessage = message;
  }
  
  clearError() {
    this.errorMessage = '';
  }

  isRequiredCompletes(): boolean {
    const requiredFields = [
      'autorizationData',
      'program',
      'registryTarget',
      'ministeryVinculation',
      'registryFrom',
      'autorizationMinistery'
    ];

    if (requiredFields.every((field) => this.form.value[field]?.trim() !== '')) {
      this.conditionsAccepted = true;
    }
    return this.conditionsAccepted;
  }

  onInputChange(event: any) {
    const regex = /^[A-ZÑ0-9\s]*$/; // Permitir letras mayúsculas, Ñ, números y espacios
    let input = event.target.value.toUpperCase(); // Convertir todo a mayúsculas
    if (!regex.test(input)) {
      // Remover caracteres no permitidos
      input = input.replace(/[^A-ZÑ0-9\s]/g, '');
    }
    event.target.value = input; // Asignar el valor limpio y en mayúsculas
  }

  setRegistryTarget(event: any) {
    this.form.get('registryTarget')?.setValue(event);
  }

  setMinisteryVinculation(event: string) {
    this.form.get('ministeryVinculation')?.setValue(event);
    this.isRequiredCompletes();
  }

  setRegistryFrom(event: string) {
    this.form.get('registryFrom')?.setValue(event);
    this.isRequiredCompletes();
  }

  setNameOfRegistry(event: string) {
    this.form.get('nameOfRegistry')?.setValue(event);

  }

  setAutorizationMinistery(event: string) {
    this.form.get('autorizationMinistery')?.setValue(event);
    this.isRequiredCompletes()
  }

  setAutorizationData(event: string) {

    this.form.get('autorizationData')?.setValue(event);
    this.isRequiredCompletes()
  }

  setFirstName(event: any) {
    this.form.get('firstNameOriginal')?.setValue(event);
  }

  setSecondName(event: any) {
    if (event) {
      this.form.get('secondNameOriginal')?.setValue(event);
    }
  }

  setFirstLastName(event: any) {
    this.form.get('firstLastNameOriginal')?.setValue(event);
  }

  setSecondLastName(event: any) {
    if (event) {
      this.form.get('secondLastNameOriginal')?.setValue(event);
    }
  }

  setHasCorrectAgeRange(event: boolean) {
    this.form.get('hasCorrectAgeRange')?.setValue(event);
  }

  async setMunicipality(event: any) {
    this.form.get('municipality')?.setValue(event);
  }

  setSignDate(event: Date) {
    this.form.get('signDate')?.setValue(event);
  }

  setIdentificationType(event: string) {
    this.form.get('identificationTypeId')?.setValue(event);
  }

  setIdentification(event: any) {
    const value = event;
    this.form.get('identification')?.setValue(value);
    this.identificationNumber = event;
    this.validateIdentificationNumber();
  }

  setIsMinor(event: boolean) {
    this.form.get('isMinor')?.setValue(event);
  }

  setIdentificationExpedition(event: any) {
    this.form.get('identificationExpeditionOriginal')?.setValue(event);
  }

  setBornDate(event: Date) {
    this.form.get('bornDateOriginal')?.setValue(event);
    const today = new Date();
    const birthDate = new Date(event);
    const age = new Date(today.getTime() - birthDate.getTime()).getUTCFullYear() - 1970;
    this.form.get('calculatedAge')?.setValue(age);
    if (age > 100) {
      return;
    }
    if (age < 14 || age > 28) {
      Swal.fire('Error de selección', 'Lo sentimos, es imposible continuar con la encuesta en virtud que no se cumple con las políticas de edad del programa Jóvenes en Paz', 'warning')
    }
  }

  setCalculatedAge(event: number) {
    this.form.get('calculatedAge')?.setValue(event);
  }

  setCalculatedAgeVerify(event: boolean) {
    this.form.get('calculatedAgeVerify')?.setValue(event);
  }

  setEmail(event: string) {
    this.form.get('email')?.setValue(event);
  }

  setPhone(event: string) {
    this.form.get('phone')?.setValue(event);
  }

  setHasWhatsapp(event: any) {
    this.form.get('hasWhatsapp')?.setValue(event);
    if(event == "si") {
      this.hasWhatsapp = true;
    } else {
      this.hasWhatsapp = false;
    }
  }

  setWhatsappNumber(event: any) {
    this.form.get('whatsappNumber')?.setValue(event);
  }

  setDepartment(event: any) {
    this.divipolService.getByDepartmentId(event)
      .subscribe((response: any) => {
        this.municipalities = response.divipolas.map((divipol: any) => {
          return { key: divipol.id, value: divipol.name };
        });
      })
    this.form.get('department')?.setValue(event);
    this.form.get('municipality')?.setValue(undefined);
  }

  async onSubmit() {
    const dataQuestion =JSON.stringify(this.questionData);
    this.form.get('questionData')?.setValue(dataQuestion); 

    const formData = this.form.value;

    // Agregar las imágenes como Blob directamente al registro
    const record = {
      ...formData,
      sync: false,
      synced: false, // Para saber si ya fue sincronizado
      timestamp: new Date().toISOString(), // Para identificar el momento de creación
    };

    // Guarda en IndexedDB
    await this.indexedDbService.addPreregister(record);
    this.reseting();
    await Swal.fire('Se han guardado los datos correctamente', 'Los datos se han almacenado correctamente.', 'success');
    this.syncWithServer();
  }

  async syncWithServer(): Promise<void> {
    // Obtén todos los registros locales que no han sido sincronizados
    const unsyncedRecords = await this.indexedDbService.getAllPreregister();
    const recordsToSync = unsyncedRecords.filter((record) => !record.synced);

    let success = false;
    let error = false;
    for (const record of recordsToSync) {
      try {
        // Llama a tu API para subir los datos
        const response = await this.uploadToServer(record);

        if (response.ok) {
          // Borra el registro de IndexedDB después de sincronizarlo
          await this.indexedDbService.deletePreregister(record.id);
          success = true;
        }
      } catch (error) {
        error = true;
      }
    }
    this.qty = await this.indexedDbService.getQuantityPreregister();
    if (success) {
      await Swal.fire('Datos sincronizados', 'Se han sincronizado los datos correctamente en la base de datos');
    }
    if (error) {
      await Swal.fire('Sincronización pendiente', 'Cuando se detecte el internet los datos serán sincronizados', 'success');
    }
  }

  // Método auxiliar para enviar datos al servidor
  private async uploadToServer(record: any): Promise<any> {
    const formData = record;
    return new Promise((resolve, reject) => {
      this.formService.submit(formData).subscribe({
        next: (response: any) => {
          resolve(response);
          this.router.navigateByUrl(`/app/home`);
        },
        error: async (error: any) => {
          if(error.error.err == "user already exist"){
            await this.indexedDbService.deletePreregister(record.id);
          }
          reject(error);
        },
      });
    });
  }

  reseting() {
    this.form.reset();
    this.reset = true;
    setTimeout(() => {
      this.reset = false;
    }, 100);
    this.router.navigateByUrl(`/app/home`);
  }

  addUserResponse(userResponse: any, questionId: number) {
    let checkingCompleted = true;
    for (const question of this.questions) {
        if (question.id == questionId) {
            question.userResponse = userResponse;
        }
        if (question.isMandatory == 'si') {
            if (!question.userResponse) {
                checkingCompleted = false;
            }
        }
    }
    this.completedAllQuestions = checkingCompleted;
    if (this.completedAllQuestions) {
        this.transformData();
    }
}

transformData() {
  this.questionData = [];
  for (const question of this.questions) {
    let questionAnswerId: any = null;
    let answer: any = null;
    if (typeof question.userResponse === 'number') {
      questionAnswerId = question.userResponse;
      const found = question.answers.find((a: any) => a.id === questionAnswerId);
      if (found) {
        answer = found.answer;
      }
    } else {
      answer = question.userResponse;
    }
    const questionInfo = {
      questionId: question.id,
      question: question.question,
      questionAnswerId: questionAnswerId,
      answer: answer,
    };
    this.questionData.push(questionInfo);
  }

  // Una sola vez, después del bucle
  this.form.get('questionData')?.setValue(this.questionData);
}


  setQuestions(){
    this.questionGroupService.getAllPreregister()
            .subscribe((response: any) => {
                this.subgroups = response.questionGroup.questions.map((question: any) => {
                    return question.QuestionSubgroup;
                })
                    .filter((value: any, index: number, self: any[]) =>
                        index === self.findIndex((obj) => obj.id === value.id)
                    );
                this.questions = response.questionGroup.questions.map((question: any) => {
                    question.userResponse = undefined;
                    question.answerObj = question.answers.map((answer: any) => {
                        return { key: answer.id, value: answer.answer };
                    });
                    return question;
                })
                    .sort((a: any, b: any) => {
                        if (a.orderQuestion > b.orderQuestion) {
                            return 1;
                        }
                        if (a.orderQuestion < b.orderQuestion) {
                            return -1;
                        }
                        return 0;
                    });
            });
  }
}
