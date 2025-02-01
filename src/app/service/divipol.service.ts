import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { from, map, of, switchMap } from 'rxjs';
import { IndexedDbService } from './indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class DivipolService {
  connectionStatus = false;
  constructor(private _httpClient: HttpClient,
    private indexedDbService: IndexedDbService,) { }

  connectionStatusCheck(){
    if (navigator.onLine) {
      this.connectionStatus = true;
    } else {
      this.connectionStatus = false;
    }
  }

  // roleVerify(RoleGroups.ALL)
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/divipola/getAll`)
        .pipe(
          map( (response: any) => {
            response.divipolas = response.divipolas.map( (divipola: any) => {
              divipola.department = divipola.ListDepartment?.name;    
              if(divipola.state === 'ENABLED'){
                divipola.state = 'Activo';
              } if(divipola.state === 'DISABLED'){
                divipola.state = 'Inactivo';
              } 
              return divipola;
            })
            return response;
          })
        )
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/divipola/${id}/getById`, {});
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  create(divipola: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/divipola/create`, {divipola});
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  edit(id: number, divipola: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/divipola/${id}/update`, {divipola});
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  addAvailabilityDates(id: number, divipola: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/divipola/${id}/addAvailabilityDates`, {divipola});
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/divipola/${id}/delete`, {});
  }

  // roleVerify(RoleGroups.ALL)
  getByDepartmentId(value: any) {
    this.connectionStatusCheck();
    if (!this.connectionStatus){
      return this._httpClient.get(`${environment.apiUrl}/app/divipola/${value}/getByDepartmentId`)
    } else {
      return from(this.indexedDbService.getDivipola()).pipe(
        switchMap((divipolas: any) => {
          if(divipolas && divipolas.length > 0){
            const filteredDivipolas = divipolas.filter((divipola: any) => divipola.departmentId == value);
            const objetct = { divipolas: []};
            objetct.divipolas = filteredDivipolas
            return of(objetct)
          } else {
            const fallbackDepartments = {divipolas: []};
            return of(fallbackDepartments);
          }
        })
      )
    }
  }
  
}
