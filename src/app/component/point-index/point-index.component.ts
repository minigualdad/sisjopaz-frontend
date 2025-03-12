import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PointService } from '../../service/point.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-point-index',
  standalone: false,
  templateUrl: './point-index.component.html',
  styleUrl: './point-index.component.scss'
})
export class PointIndexComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    actions: 'Acciones',
    id: 'Id',
    name: 'Nombre',
    divipola: 'Divipola',
    state: 'Estado',
  };
  recordsTableColumns: string[] = [];
  user: any;
  toggleMenu: boolean = false;
  divipola: any

  constructor(
    private pointSevice: PointService,
    private titleService: Title,
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.recordsTableColumns = Object.keys(this.columns);
    this.titleService.setTitle('Puntos');
    this.divipola = {};
    this.divipola.id = this.activatedRoute.snapshot.paramMap.get('id');
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
    await this.pointSevice.getAll().subscribe({
      next: (response: any) => {
        this.dataSource.data = response.points;
      },
    });
  }

  create() {
    this.router.navigateByUrl(`/app/point-add/${this.divipola.id}`);
  }

  edit(id: number) {
    this.router.navigateByUrl('/app/divipol-edit');

  }

  async remove(id: number) {
    const result = await Swal.fire({
      title: '¿Estás seguro que deseas deshabilitar este punto?',
      text: '¡No es posible deshacer esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, deshabilitarlo!',
      cancelButtonText: 'No, conservarlo',
    });
    if (result.value) {
      this.pointSevice.disablePoint(id).subscribe({
        next: () => {
          this.ngOnInit();
          Swal.fire(
            '¡Deshabilitado!',
            'El punto ha sido deshabilitado.',
            'success'
          );
        },
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado', 'No se ha deshabilitado el punto', 'error');
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

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
  }
}
