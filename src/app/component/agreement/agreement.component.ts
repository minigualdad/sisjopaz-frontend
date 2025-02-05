import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectedComponent } from '../../shared/selected/selected.component';
import { InputComponent } from '../../shared/input/input.component';
import { FormService } from '../../service/form.service';
import { DrawerComponent } from '../../shared/drawer/drawer.component';
import { SurveyService } from '../../service/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DivipolService } from '../../service/divipol.service';
import { DepartmentService } from '../../service/department.service';
import Swal from 'sweetalert2';
import { IndexedDbService } from '../../service/indexed-db.service';
import imageCompression from 'browser-image-compression';


@Component({
  selector: 'app-agreement',
  imports: [ReactiveFormsModule, CommonModule, SelectedComponent, InputComponent, DrawerComponent],
  templateUrl: './agreement.component.html',
  styleUrl: './agreement.component.scss'
})
export class AgreementComponent {
  @Input() reset: boolean = false;
  @Output('values') values = new EventEmitter();

  form: FormGroup;
  document = ["Registro Civil", "Tarjeta de Identidad", "Cedula de Ciudadania", "Cedula Extranjeria", "Pasaporte", "Menor sin Id", "Adulto sin Id", "Permiso Especial de Permanencia", "Certificado de Nacido Vivo", "Carne Diplomatico", "Salvoconducto", "Documento Extranjero", "Permiso por proteccion temporal", "No Especificado"];
  frontImageUrl: string | ArrayBuffer | null = null;
  backImageUrl: string | ArrayBuffer | null = null;
  digitalSignUrl: string | ArrayBuffer | null = null;

  digitalSignFile: File | null = null;
  legalRepresentativeDigitalSignFile: File | null = null;
  custodyFile: File | null = null;


  age = 0;
  survey: any;
  departments: any;
  municipalities: any;
  accountCertificationUrl: string | ArrayBuffer | null = null;
  frontImageFile: any;
  backImageFile: any;
  accountFile: any;
  signatureFile: any;
  qty = 0;
  syncStatus = '';

  constructor(private formService: FormService,
    private surveyService: SurveyService,
    private activatedRoute: ActivatedRoute,
    private divipolService: DivipolService,
    private departmentService: DepartmentService,
    private indexedDbService: IndexedDbService,
    private router: Router,
  ) {
    this.form = new FormGroup({
      surveyId: new FormControl('', [Validators.required]),
      frontIdentificationUrl: new FormControl('', [Validators.required]),
      backIdentificationUrl: new FormControl('', [Validators.required]),
      identificationType: new FormControl('', [Validators.required]),
      identification: new FormControl('', [Validators.required]),
      registryTarget: new FormControl('Acuerdo de Corresponsabilidad', []),
      firstName: new FormControl('', [Validators.required]),
      secondName: new FormControl(''),
      firstLastName: new FormControl('', [Validators.required]),
      secondLastName: new FormControl(''),
      email: new FormControl('', [Validators.required]),
      vinculate: new FormControl('', [Validators.required]),
      signDate: new FormControl('', [Validators.required]),
      signDepartmentId: new FormControl('', [Validators.required]),
      signDivipolId: new FormControl('', [Validators.required]),
      digitalSign: new FormControl('', [Validators.required]),
      isMinor: new FormControl('', []),
      hasBankAccount: new FormControl(''),
      legalRepresentativeDocumentUrl: new FormControl('', []),
      legalRepresentativeFirstName: new FormControl('', []),
      legalRepresentativeSecondName: new FormControl('', []),
      legalRepresentativeFirstLastName: new FormControl('', []),
      legalRepresentativeSecondLastName: new FormControl('', []),
      legalRepresentativeIdentificationType: new FormControl('', []),
      legalRepresentativeIdentification: new FormControl('', []),
      legalRepresentativePhone: new FormControl('', []),
      legalRepresentativeDigitalSign: new FormControl('', []),
      legalRepresentativeFrontIdentificationtUrl: new FormControl('', []),
      legalRepresentativeBackIdentificationUrl: new FormControl('', []),
      calculatedAgeVerify: new FormControl('', []),
    });
    this.survey = {};
    this.survey.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.form.get('surveyId')?.setValue(this.survey.id);
    this.surveyService.show(this.survey.id)
      .subscribe((response: any) => {
        this.survey = response.survey;
        this.form.patchValue(response.survey);
      })
    this.qty = await this.indexedDbService.getQuantityAgreement();
    this.detectConnection();
    this.showDepartments();
  }

  replaceHyphensWithSpaces(input: string): string {
    if (!input) {
      return '';
    }
    return input.replace(/-/g, ' ');
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

  showDepartments() {
    this.departmentService.getAll().subscribe({
      next: (response: any) => {
        this.departments = response.departments.map((department: any) => {
          return { key: department.id, value: department.name };
        })
      }
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


  onFileSelected(event: Event, side: 'front' | 'back' | 'accountCertification' | 'custodyFile'): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      imageCompression(file, options)
        .then((compressedFile) => {
          const reader = new FileReader();
          reader.onload = () => {
            // Asignar los valores comprimidos a las propiedades correspondientes
            if (side === 'front') {
              this.frontImageUrl = reader.result as string;
              this.frontImageFile = compressedFile;
              this.form.get('frontIdentificationtUrl')?.setValue('uploaded');
            }
            if (side === 'back') {
              this.backImageUrl = reader.result as string;
              this.backImageFile = compressedFile;
              this.form.get('backIdentificationUrl')?.setValue('uploaded');
            }
            if (side === 'custodyFile') {
              this.custodyFile = compressedFile;
            } if (side === 'accountCertification') {
              this.accountCertificationUrl = reader.result as string;
              this.accountFile = compressedFile;
              this.form.get('accountCertificationUrl')?.setValue('uploaded');
            }
          };
          reader.readAsDataURL(compressedFile);
        })
        .catch((error) => {
          console.error('Error al comprimir la imagen:', error);
        });
    }
  }

  onSignatureListen(event: any): void {
    const file: File = event;
    if (file) {
      this.digitalSignFile = file;
      this.form.get('digitalSign')?.setValue('uploaded');
    }
  }

  onSignatureRepresentant(event: any): void {
    const file: File = event; // El archivo recibido del componente
    if (file) {
      this.legalRepresentativeDigitalSignFile = file;
      this.form.get('legalRepresentativeDigitalSign')?.setValue('uploaded'); // Marca como "subido"
    }
  }

  async onSubmit() {
    const formData = this.form.value;
    // Agregar las imágenes como Blob directamente al registro
    const record = {
      ...formData,
      sync: false,
      documentFront: this.frontImageFile, // Archivo original
      documentBack: this.backImageFile, // Archivo original
      accountCertification: this.accountFile, // Archivo original
      digitalSignFile: this.digitalSignFile, // Archivo original
      legalRepresentativeDigitalSignFile: this.legalRepresentativeDigitalSignFile,
      custodyFile: this.custodyFile, // Archivo original
      synced: false, // Para saber si ya fue sincronizado
      timestamp: new Date().toISOString(), // Para identificar el momento de creación
    };
    await this.indexedDbService.addAgreement(record);
    this.reseting();
    this.uploadToServer(record)
    this.syncWithServer();
  }
  ngOnChanges(changes: any) {
    if (changes.reset) {
      this.form.reset();
    }
  }

  async syncWithServer(): Promise<void> {
    
    const unsyncedRecords = await this.indexedDbService.getAllAgreement();
    const recordsToSync = unsyncedRecords.filter((record) => !record.synced);

    let success = false;
    let error = false;
    for (const record of recordsToSync) {
      try {
        // Llama a tu API para subir los datos
        const response = await this.uploadToServer(record);

        if (response.ok) {
          // Borra el registro de IndexedDB después de sincronizarlo
          await this.indexedDbService.deleteAgreement(record.id);
          success = true;
        }
      } catch (error) {
        console.error(`Error al sincronizar el registro ${record.id}:`, error);
        error = true;
      }
    }
    this.qty = await this.indexedDbService.getQuantityAgreement();
    if (success) {
      await Swal.fire('Datos sincronizados', 'Se han sincronizado los datos correctamente en la base de datos');
    }
    if (error) {
      await Swal.fire('Sincronización pendiente', 'Cuando se detecte el internet los datos serán soncronizados', 'success');
    }
  }

  private async uploadToServer(record: any): Promise<any> {
    const formData = record;
    return new Promise((resolve, reject) => {
      this.formService.agreement(formData).subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Acuerdo firmado creado correctamente', 'success');
          this.router.navigateByUrl(`/app/home`);
          resolve(response);
        },
        error: (error: any) => {
          console.error('reject backend');
          reject(error);
        },
      });
    });
  }

  setDepartment(event: string) {
    this.form.get('signDepartmentId')?.setValue(event);
    this.form.get('municipality')?.setValue(undefined);
    this.divipolService.getByDepartmentId(event)
      .subscribe({
        next: (response: any) => {
          this.municipalities = response.divipolas.map((divipol: any) => {
            return { key: divipol.id, value: divipol.name };
          });
        }
      });
  }

  setMunicipality(event: string) {
    this.form.get('signDivipolId')?.setValue(event);
  }

  setDate(event: string) {
    this.form.get('signDate')?.setValue(event);
  }

  reseting() {
    this.form.reset();
    this.reset = true;
    setTimeout(() => {
      this.reset = false;
    }, 100);
    
  }

}
