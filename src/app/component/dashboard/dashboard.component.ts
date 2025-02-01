import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartConfiguration } from 'chart.js';
import { DashboardService } from '../../service/dashboard.service';
import { NetworkService } from '../../service/network.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-dashboard',
    standalone: false,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
    @ViewChild('chartCanvas') chartCanvas!: ElementRef;
    data: any;
    isLoading = false;
    isOnline: boolean = true;
    isMenuOpen = false;
    selection = "first";
    sectionHeaderSelected = 'data';

    thirdSection = [
        {
            title: 'Jóvenes con TMC',
            count: 2
        },
        {
            title: 'jóvenes sin TMC',
            count: 1
        },
        {
            title: 'jóvenes con asistencias educación menor al 70%',
            count: 0
        },
        {
            title: 'jóvenes corresponsabilidad menor 70%',
            count: 0
        },
        {
            title: 'jóvenes inasistencias y corresponsabilidad menor 70%',
            count: 0
        },
        {
            title: 'jóvenes sin asignación de grupos',
            count: 2
        },
        {
            title: 'jóvenes sin caracterización',
            count: 1
        },
        {
            title: 'Grupos sin horarios educación',
            count: 1
        },
        {
            title: 'Grupos sin horarios corresponsabilidad',
            count: 1
        }
    ];

    constructor(
        private router: Router,
        private _dashboardService: DashboardService,
        private networkService: NetworkService
    ) {}

    ngOnInit() {
        this.networkService.isOnline$.subscribe((status) => {
          this.isOnline = status;
    
          if (this.isOnline) {
            this.loadData();
          }
        });
      }

  loadData() {
    this.isLoading = true;
    this._dashboardService.getAllData().subscribe({
      next: (response: any) => {
        this.data = response;
        this.isLoading = false;
    
        if (this.data.firstSection) {
          // Calcular la suma de los valores "count"
          const totalCount = this.data.firstSection.reduce((sum: number, item: any) => sum + (item.count || 0), 0);
    
          // Mostrar alerta si totalCount es 0
          if (totalCount === 0) {
            Swal.fire({
              icon: 'warning',
              title: 'Aún no has creado Preinscripciones',
              text: 'Por favor, agrega nuevas preinscripciones para tener datos en tu informe.',
            });
          } else {
            this.renderChart(this.data.firstSection);
          }
        }
      },
      error: (err) => {
        console.error('Error al cargar los datos:', err);
        this.isLoading = false;
      },
    });
  }
  

  renderChart(firstSection: any[]) {
    if (!this.chartCanvas || !this.chartCanvas.nativeElement) {
        console.error("Canvas element not found!");
        return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
        console.error("Failed to get 2D context for canvas!");
        return;
    }

    const config: ChartConfiguration<'bar', number[], string> = {
      type: 'bar', // Aquí definimos el tipo correcto
      data: {
          labels: ["RNEC", "DNP", "ARN", "DPS"],
          datasets: [
              {
                  label: "Por Validar",
                  data: [10, 20, 30, 40], // Datos de ejemplo
                  backgroundColor: "rgba(54, 162, 235, 0.6)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1
              }
          ]
      },
      options: {
          responsive: true,
          plugins: {
              legend: {
                  position: 'top',
              },
              title: {
                  display: true,
                  text: 'Indicadores de Registro y Preacuerdo'
              }
          },
          scales: {
              x: { title: { display: true, text: 'Entidades' } },
              y: { title: { display: true, text: 'Número de Jóvenes' } }
          }
      }
  };
  

    new Chart(ctx, config);
}


    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    logout() {
        this.router.navigateByUrl('/login');
    }

    toRegionalLink() {
        this.router.navigateByUrl('/regional-link');
    }

    toUser() {
        this.router.navigateByUrl('/user');
    }

    toDivipol() {
        this.router.navigateByUrl('/divipol');
    }

    toCoresponsability() {
        this.router.navigateByUrl('/coresponsability');
    }

    toGroup() {
        this.router.navigateByUrl('/group');
    }

    changeSelection(selection: string) {
        this.selection = selection;
    }

    assignSection(section: string) {
        this.sectionHeaderSelected = section;
    }
}
