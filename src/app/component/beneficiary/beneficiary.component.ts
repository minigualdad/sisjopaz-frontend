import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { BeneficiaryService } from '../../service/beneficiary.service';

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrl: './beneficiary.component.scss',
  standalone: false
})
export class BeneficiaryComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    actions: 'Acciones',
    id: 'Id',
    professionalTeam: 'Equipo Profesional',
    name: 'Nombre Completo',
    identification: 'Número de Documento',
    email: 'Correo Electrónico',
    startProgramDate: 'Fecha de ingreso al Programa',
    group: 'Grupo Asignado',
    DNPCheck: 'Aprobación DNP',
    ARNCheck: 'Aprobación ARN',
    DPSCheck: 'Aprobación DPS',
    DNPCheckDate: 'Fecha de Aprobación DNP',
    ARNCheckDate: 'Fecha de Aprobación ARN',
    DPSCheckDate: 'Fecha de Aprobación DPS',
    state: 'Estado',
  };
  recordsTableColumns: string[] = [];
  user: any;
  professionalTeam: any;

  constructor(
    private beneficiaryService: BeneficiaryService,
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
    await this.beneficiaryService.getAll().subscribe({
      next: (response: any) => {
        this.dataSource.data = response.beneficiaries;
      },
    });
  }

  create() {
    this.router.navigateByUrl(`/app/beneficiary-add`);
  }

  edit(id: number) {
    this.router.navigateByUrl(`/app/beneficiary-edit/${id}`);

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
      this.beneficiaryService.delete(id).subscribe({
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
