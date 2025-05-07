import { Component, OnInit } from '@angular/core';
import { AssistanceScannerService } from '../../service/assitance-scanner.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assistance-by-month',
  standalone: false,
  templateUrl: './assistance-by-month.component.html',
  styleUrl: './assistance-by-month.component.scss'
})
export class AssistanceByMonthComponent implements OnInit{

  groupComponent: any = {};
  monthSelected:any;
  yearSelected:any;
  groupComponentDateActivityBeneficiary: any;
  loading = false;
  groupComponentId:any;
  componentId = localStorage.getItem('componentId');
  backRoute = `app/component-group/${this.componentId}`;
  urlFileImageProcessed : any[] = [];
  urlFileImageOriginal : any[] = [];

  constructor(private _assistanceScannerService: AssistanceScannerService,
    private route: ActivatedRoute
  ){
    this.groupComponentId = Number(this.route.snapshot.paramMap.get('id'));
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
      await this._assistanceScannerService.getAllAssistanceScannerByMonthAndYear(Number(this.monthSelected), Number(this.yearSelected), this.groupComponentId).subscribe({
        next: async (response: any) => {
          this.loading = false;
  
          if (response.groupedUrls.urlFileImageOriginal.length == 0 || response.groupedUrls.urlFileImageProcessed.length === 0) {
            await Swal.fire({
              title: 'No hay datos',
              text: 'No hay datos de la fecha seleccionada, por favor seleccione otra e intente de nuevo.',
              icon: 'warning',
              confirmButtonText: 'Entendido'
            });
            return; // Detiene aquí si no hay datos
          }
          this.urlFileImageOriginal = response.groupedUrls.urlFileImageOriginal;
          this.urlFileImageProcessed = response.groupedUrls.urlFileImageProcessed;

        },
        error: (err) => {
          this.loading = false;
          console.error("Error en la solicitud: ", err);
        }
      });
    }
}
