import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-beneficiary-without-group',
  standalone: false,
  templateUrl: './beneficiary-without-group.component.html',
  styleUrl: './beneficiary-without-group.component.scss'
})
export class BeneficiaryWithoutGroupComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    id: 'Id',
    divipola: 'Región',
    identificationType: 'Tipo de Documento',
    identification: 'Número de Documento',
    name: 'Nombre Completo',
    email: 'Correo Electrónico',
    state: 'Estado',
  };
  recordsTableColumns: string[] = [];
  user: any;
  professionalTeam: any;

  constructor(
    private surveyService: SurveyService,
    private titleService: Title,
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.recordsTableColumns = Object.keys(this.columns);
    this.titleService.setTitle('Jóvenes');
    this.professionalTeam = {};
    this.professionalTeam.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  /**
  * On init
  */
  ngOnInit(): void {
    this.userService.getUser().subscribe((response: any) => {
      this.user = response.user;
      this.getAll();
    });
  }

  /**
  * After view init
  */
  ngAfterViewInit(): void {
    // Make the data source sortable
    this.dataSource.sort = this.recordsTableMatSort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void { }

  async getAll() {
    await this.surveyService.getAllWithoutGroup().subscribe({
      next: (response: any) => {
        this.dataSource.data = response.surveys;
      },
    });
  }

  massive() {
    this.router.navigateByUrl(`/app/beneficiary-massive-group`);
  }

  download() {
    this.surveyService.downloadWithoutGroup().subscribe({
        next: (response: Blob) => {
            const url = window.URL.createObjectURL(response);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'beneficairios_sin_grupo.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        },
        error: (error) => {
            console.error('Error descargando el archivo:', error);
            alert('Error descargando el archivo.');
        }
    });
  }

  async remove(id: number) {
    const result = await Swal.fire({
      title: '¿Estás seguro que deseas eliminar el joven?',
      text: '¡No es posible deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo!',
      cancelButtonText: 'No, conservarlo',
    });
    if (result.value) {
      this.surveyService.delete(id).subscribe({
        next: () => {
          this.ngOnInit();
          Swal.fire(
            '¡Borrado!',
            'Joven ha sido eliminado.',
            'success'
          );
        },
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado', 'No se ha eliminado el proceso', 'error');
    }
  }

  /**
  * Track by function for ngFor loops
  *
  * @param index
  * @param item
  */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
}
