import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupComponentDateActivityBenefiaryService } from '../../service/group-component-date-activity-benefiary.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assistance-fix',
  standalone: false,
  templateUrl: './assistance-fix.component.html',
  styleUrl: './assistance-fix.component.scss'
})
export class AssistanceFixComponent {
  @Input() groupComponentId: any;
  @Input() assistanceScannerId: any;
  @Output() dataSentListen: EventEmitter<number> = new EventEmitter();
  @Input() recordData: { record: any; date: string; hasAssistance: boolean } | null = null;
  @Output() reloadTable = new EventEmitter<boolean>();

  loading = false;
  form: FormGroup;
  months: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  errorMessage: string = '';
  groupComponent: any = {};
  reset = false;
assistanceScanner: any = {};
asistencia = null;

  constructor(
    private groupComponentDateActivityBenefiaryService: GroupComponentDateActivityBenefiaryService,
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      userId: new FormControl('', Validators.required),
      dateActivity: new FormControl('', Validators.required),
      groupComponentId: new FormControl('', Validators.required),
      hasAssitence: new FormControl(false),
      assistanceScannerId: new FormControl(''),
    });
    this.groupComponent = {};
    this.assistanceScanner.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.form.controls['hasAssitence'].setValue(null);
    this.form.controls['assistanceScannerId'].setValue(this.assistanceScanner.id);
  }

  ngOnInit(): void {
    this.form.controls['assistanceScannerId'].setValue(this.assistanceScanner.id);
    this.form.controls['hasAssitence'].setValue(true);
  }

  ngAfterViewInit(){
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupComponentId']) {
      this.form.controls['groupComponentId'].setValue(this.groupComponentId);
    }

    if (changes['recordData'] && this.recordData) {
      const { record, date, hasAssistance } = this.recordData;
      this.form.patchValue({
        userId: record.userId,
        dateActivity: date,
        hasAssitence: hasAssistance,
      });
      this.create();
    }
  }

  create() {
    this.assistanceScanner.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if(this.assistanceScanner.id === 0) {
      this.form.controls['assistanceScannerId'].setValue(this.assistanceScannerId);
    } else {
      this.form.controls['assistanceScannerId'].setValue(this.assistanceScanner.id);
    }  

    if (this.form.invalid) return;
    this.groupComponentDateActivityBenefiaryService.createAssistance(this.form.value).subscribe({
      next: (response: any) => {
        Swal.fire('Operación correcta', 'Asistencia corregida', 'success').then(() => {
          this.ngOnInit();
          this.dataSent();
        });
      },
      error: (error) => {
        console.error(error);
        Swal.fire('Operación incorrecta', 'No se ha podido corregir la asistencia', 'error').then(() => {
          this.ngOnInit();
        });
      }
    });

  }  

  onSurveySelect(event: any) {
    this.form.patchValue({ userId: event.id });
  }

  dataSent() {
    this.dataSentListen.emit();
    this.reloadTable.emit(true);
  }
}
