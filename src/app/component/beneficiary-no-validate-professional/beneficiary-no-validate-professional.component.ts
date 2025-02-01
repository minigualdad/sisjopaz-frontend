import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from '../../service/survey.service';
import { ProfessionalTeamService } from '../../service/professional-team.service';

@Component({
  selector: 'app-beneficiary-no-validate-professional',
  standalone: false,
  templateUrl: './beneficiary-no-validate-professional.component.html',
  styleUrl: './beneficiary-no-validate-professional.component.scss'
})
export class BeneficiaryNoValidateProfessionalComponent {
  @ViewChild('recordsTable', { read: MatSort }) recordsTableMatSort: MatSort =
    new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columns: any = {
    // actions: 'Acciones',
    id: 'Id',
    identificationType: 'Tipo de Identificación',
    identification: 'Número de Documento',
    firstName: 'Primer Nombre',
    secondName: 'Segundo Nombre',
    firstLastName: 'Primer Apellido',
    secondLastName: 'Segundo Apellido',
    bornDate: 'Fecha de Nacimiento',
    identificationExpedition: 'Fecha de Expedición del Documento',
  };
  recordsTableColumns: string[] = [];
  user: any;

  constructor(
    private surveyService: SurveyService,
    private titleService: Title,
    public dialog: MatDialog,
    private userService: UserService
  ) {
    this.recordsTableColumns = Object.keys(this.columns);
    this.titleService.setTitle('Jóvenes no Validados');

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
    await this.surveyService.getAllNoValidatesByProfessional().subscribe({
      next: (response: any) => {
        this.dataSource.data = response.surveys;
      },
    });
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
