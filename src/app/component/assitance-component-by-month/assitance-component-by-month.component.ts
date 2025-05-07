import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AssistanceScannerService } from '../../service/assitance-scanner.service';

@Component({
  selector: 'app-assitance-component-by-month',
  standalone: false,
  templateUrl: './assitance-component-by-month.component.html',
  styleUrl: './assitance-component-by-month.component.scss'
})
export class AssitanceComponentByMonthComponent {
groupComponent: any = {};
  monthSelected:any;
  yearSelected:any;
  groupComponentDateActivityBeneficiary: any;
  loading = false;
  groupId:any;
  componentId = localStorage.getItem('componentId');
  backRoute = `app/group`;
  groupedUrls: any[] = [];

  constructor(private _assistanceScannerService: AssistanceScannerService,
    private route: ActivatedRoute
  ){
    this.groupId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

  }

  async onSelectYearMont(event: any) {
    this.monthSelected = event.month;
    this.yearSelected = event.year;
    if(this.monthSelected && this.yearSelected){
      this.groupComponentDateActivityBeneficiary = {
        groupComponentId: this.groupComponent.id,
        month: this.monthSelected,
        year: this.yearSelected,
        pageIndex: 0,
        pageSize: 100000, 
      }
      await this.getAll();
    }
  }

    async getAll(){
      this.loading = true;
      await this._assistanceScannerService.getAllAssistanceScannerByMonthYearAndGroup(Number(this.monthSelected), Number(this.yearSelected), this.groupId).subscribe({
        next: async (response: any) => {
          this.loading = false;
  
          if (response.groupedUrls.length == 0) {
            await Swal.fire({
              title: 'No hay datos',
              text: 'No hay datos de la fecha seleccionada, por favor seleccione otra e intente de nuevo.',
              icon: 'warning',
              confirmButtonText: 'Entendido'
            });
            return; // Detiene aquí si no hay datos
          }
          this.groupedUrls = response.groupedUrls;
        },
        error: (err) => {
          this.loading = false;
          console.error("Error en la solicitud: ", err);
        }
      });
    }
}
