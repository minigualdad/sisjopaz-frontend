import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GroupScheduleService } from '../../service/group-schedule.service';
import { GroupScheduleBeneficiaryService } from '../../service/group-schedule-beneficiary.service';
import { environment } from '../../../enviroment/enviroment';

@Component({
    selector: 'app-group-schedule-beneficiary-add',
    templateUrl: './group-schedule-beneficiary-add.component.html',
    styleUrl: './group-schedule-beneficiary-add.component.scss',
    standalone: false
})
export class GroupScheduleBeneficiaryAddComponent {
  groupSchedule: any
  form: FormGroup;
  server = environment.apiUrl;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('fileInputSigned') fileInputSigned!: ElementRef;
  pictureUrl = '';
  signedUrl = '';
  pictureLoaded = false;
  signedLoaded = false;
  pictureFile: any;
  signedFile: any;

  constructor(private groupScheduleService: GroupScheduleService,
    private groupScheduleBeneficiaryService: GroupScheduleBeneficiaryService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router) {
    this.form = new FormGroup({
      surveyId: new FormControl('', Validators.required),
      groupScheduleId: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      isAssistance: new FormControl('', Validators.required),
      dateTimeAssistance: new FormControl('', Validators.required),
      prictureUrl: new FormControl('', Validators.required)
    });
    this.groupSchedule = {};
    this.groupSchedule.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.form.controls['groupScheduleId'].setValue(this.groupSchedule.id);
    this.form.controls['dateTimeAssistance'].setValue(new Date());
    this.form.controls['isAssistance'].setValue(true);

  }
  ngOnInit() {
    this.getGroup()
  }
  async getGroup() {
    this.groupScheduleService.show(this.groupSchedule.id)
      .subscribe((response: any) => {
        this.groupSchedule = response.groupSchedule;
      })
  }

  async pictureChange(event: any) {
    this.pictureFile = event.target.files;
    const pictureFile = event.target.files[0];
    if (pictureFile) {
      this.pictureUrl = URL.createObjectURL(pictureFile);
      this.pictureLoaded = true;
      this.form.controls['pictureUrl'].setValue('ok');

    }
    this.cdr.detectChanges();
  }

  signedChange(event: any) {
    this.signedFile = event.target.files;
    const signedFile = event.target.files[0];
    if (signedFile) {
      this.signedUrl = URL.createObjectURL(signedFile);
      this.signedLoaded = true;
    }
    this.cdr.detectChanges();
  }

  openInput() {
    this.fileInput.nativeElement.click();
  }

  openInputSigned() {
    this.fileInputSigned.nativeElement.click();
  }

  async create() {
    await this.groupScheduleBeneficiaryService.create({ ...this.form.value }, this.pictureFile, this.signedFile)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Joven del horario creado correctamente', 'success');
          this.router.navigateByUrl(`/app/group-schedule-beneficiary/${this.groupSchedule.groupId}`)
        },
        error: (error) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear el joven del horario', 'error');
        }
      });
  }

  onUserSelect(event: any) {
    this.form.patchValue({ userId: event });
  }
  onSelectSurvey(event: any){
    this.form.controls['surveyId'].setValue(event.id);
  }
  onSelectTime(event: any){
    this.form.controls['time'].setValue(event);
  }
  onSelectSignature(event: any){
    this.signedFile = event;
    this.form.controls['pictureUrl'].setValue('ok');
  }
}
