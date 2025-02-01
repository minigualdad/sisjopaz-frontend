import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';

@Component({
  selector: 'app-beneficiary-by-psicosocial',
  standalone: false,
  templateUrl: './beneficiary-by-psicosocial.component.html',
  styleUrl: './beneficiary-by-psicosocial.component.scss'
})
export class BeneficiaryByPsicosocialComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator; // agregar la referencia del paginador

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    actions: 'Acciones',
    id: 'Id',
    name: 'Nombre',
    state: 'Estado',
    identification: 'Número de Identificación',
    identificationType: 'Tipo de Identificación',
  };
  recordsTableColumns: string[] = [];
  user: any;
  survey: any = {};

  constructor(
    private surveyService: SurveyService,
    private titleService: Title,
    public dialog: MatDialog,
    private userService: UserService
  ) {
    this.recordsTableColumns = Object.keys(this.columns);
    this.titleService.setTitle('Histórico Planillas');
  }

  /**
  * On init
  */
  ngOnInit(): void {
    this.userService.getUser().subscribe((response: any) => {
      this.user = response.user;
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
    await this.surveyService.getAllById(this.survey.id).subscribe({
      next: (response: any) => {        
        this.dataSource.data = response.surveys;
      },
    });
  }

  async onSelectSurvey(event: any) {
    this.survey.id = event.id;
    await this.getAll();
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
