import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class GroupComponentDateActivityService {
  deleteIds(ids: number[]) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivity/deleteIds`, {ids})
  }

  constructor(private _httpClient: HttpClient) { }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  addMassive(groupComponentId: number, dateGroupId: number, periodId: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivity/addMassive`, {
      groupComponentId,
      dateGroupId,
      periodId,
    });
  }

  addMassiveAllGroups(periodId: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivity/addMassiveAllGroups`, {
      periodId,
    });
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  getAllByGroupComponentId(groupComponentId: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivity/getAllByGroupComponentId`, {
      groupComponentId,
    });
  }

  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivity/${id}/delete`, {});
  }

}
