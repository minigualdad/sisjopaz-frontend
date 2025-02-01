import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupCycleService {

  constructor(private _http: HttpClient) {}

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  getAllGroupCycles(): Observable<any>{
    return this._http.get(`${environment.apiUrl}/app/groupCycle/`);
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  getPeriodsByGroupId(groupId: number): Observable<any> {
    return this._http.get(`${environment.apiUrl}/app/groupCycle/${groupId}`);
  }
}
