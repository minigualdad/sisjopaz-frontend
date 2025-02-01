import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor(private _http: HttpClient) {}

  // No existe en Back
  createPeriods(periodData:any): Observable<any> {
    return this._http.post(`${environment.apiUrl}/app/period/addPeriod`, {periodData});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAll() {
    return this._http.get(`${environment.apiUrl}/app/period/getAll`, {});
  }

}
