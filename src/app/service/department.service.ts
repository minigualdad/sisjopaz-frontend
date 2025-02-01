import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { from, of, switchMap } from 'rxjs';
import { IndexedDbService } from './indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  connectionStatus = false;
  constructor(private _httpClient: HttpClient,
              private indexedDbService: IndexedDbService,
  ) {}

  connectionStatusCheck(){
    if (navigator.onLine) {
      this.connectionStatus = true;
    } else {
      this.connectionStatus = false;
    }
  }

  // roleVerify(RoleGroups.ALL)
  getAll() {
    this.connectionStatusCheck();
    if (this.connectionStatus){
      return this._httpClient.get(`${environment.apiUrl}/app/department/getAll`)
    } else {
      return from(this.indexedDbService.getDepartments()).pipe(
        switchMap((departments: any) => {
          if(departments && departments.length > 0){
            const objetct = { departments: []};
            objetct.departments = departments
            return of(objetct)
          } else {
            const fallbackDepartments = {departments: []};
            return of(fallbackDepartments);
          }
        })
      )
    }
  }
}
