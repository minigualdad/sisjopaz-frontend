import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupCycleService } from '../../service/group-cycle.service';
import { GroupComponentDateActivityBenefiaryService } from '../../service/group-component-date-activity-benefiary.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-group-component-date-activity-beneficiary-add',
  standalone:false,
  templateUrl: './group-component-date-activity-beneficiary-add.component.html',
  styleUrl: './group-component-date-activity-beneficiary-add.component.scss'
})
export class GroupComponentDateActivityBeneficiaryAddComponent {

loading = false;
form: FormGroup;
cycles: { id: number; name: string }[] = [];
months: string[] = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
errorMessage: string = '';
groupComponent: any = {};

constructor(
  private groupComponentDateActivityBenefiaryService: GroupComponentDateActivityBenefiaryService,
  private _groupCycleService: GroupCycleService,
  private router: Router,
  private activatedRoute: ActivatedRoute) {
        this.form = new FormGroup( {
          userId: new FormControl('', Validators.required),
          groupCycleId: new FormControl('', Validators.required),
          dateActivity: new FormControl('', Validators.required),
          groupComponentId: new FormControl('', Validators.required),
        });
        this.groupComponent = {};
        this.groupComponent.id = this.activatedRoute.snapshot.paramMap.get('id');
        this.form.controls['groupComponentId'].setValue(this.groupComponent.id);
}

ngOnInit(): void {
this.getCycles();
}

getCycles(){
  this._groupCycleService.getAllGroupCycles().subscribe({
    next: (response:any) =>{
      this.cycles = response.groupCycle.map((item: { id: any; cycle: any; Period: { year: any; month: number; }; }) => ({
        id: item.id,
        name: `${item.cycle}.       ${item.Period.year} - ${this.months[item.Period.month - 1]}`,
      }))
    }
  })
}

create(){
  this.groupComponentDateActivityBenefiaryService.create(this.form.value)
  .subscribe({
          next: (response: any) => {
            Swal.fire('Operación correcta', 'Actividad asignada correctamente', 'success');
            this.router.navigateByUrl(`/app/group-component-date-activity-beneficiary/${this.groupComponent.id}`)
          },
          error: (error) => {
            console.error(error);
            Swal.fire('Operación incorrecta', 'No se ha podido crear la actividad', 'error');
          }
        });
  
}

onSurveySelect(event: any){
  this.form.patchValue({ userId: event.id });
}
}
