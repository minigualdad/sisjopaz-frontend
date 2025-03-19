import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupComponentDateActivityBenefiaryService {

  constructor(private _httpClient: HttpClient) { }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  addActivities(groupComponentId: number, periodId: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivityBeneficiary/addActivities`, { groupComponentId, periodId });
  }

  // No se usa
  getAllByGroupComponent(id: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/groupComponentDateActivityBeneficiary/${id}/getAllByGroupComponent`)
    .pipe(
      map( (response: any) => {
        response.groupComponentDateActivityBeneficiaries = response.groupComponentDateActivityBeneficiaries.map( (groupComponentDateActivityBeneficiary: any) => {
          groupComponentDateActivityBeneficiary.groupComponent = groupComponentDateActivityBeneficiary.GroupComponent?.Component?.name;
          groupComponentDateActivityBeneficiary.groupCycle = groupComponentDateActivityBeneficiary.GroupCycle?.cycle;
          groupComponentDateActivityBeneficiary.user = groupComponentDateActivityBeneficiary.UserId?.firstName;
          if (groupComponentDateActivityBeneficiary.UserId.secondName) {
            groupComponentDateActivityBeneficiary.user += ' ';
            groupComponentDateActivityBeneficiary.user += groupComponentDateActivityBeneficiary.UserId?.secondName;
          } else {
            groupComponentDateActivityBeneficiary.UserId.secondName = ''
          }
          groupComponentDateActivityBeneficiary.user += ' ';
          groupComponentDateActivityBeneficiary.user += groupComponentDateActivityBeneficiary.UserId?.firstLastName;
          if (groupComponentDateActivityBeneficiary.UserId?.secondLastName) {
            groupComponentDateActivityBeneficiary.user += ' ';
            groupComponentDateActivityBeneficiary.user += groupComponentDateActivityBeneficiary.UserId?.secondLastName;
          } else {
            groupComponentDateActivityBeneficiary.UserId.secondLastName = ''
          }
          groupComponentDateActivityBeneficiary.userIdentification = groupComponentDateActivityBeneficiary.UserId?.identification;
          groupComponentDateActivityBeneficiary.userIdentificationType = groupComponentDateActivityBeneficiary.UserId?.identificationType;
          groupComponentDateActivityBeneficiary.dateActivity = groupComponentDateActivityBeneficiary.dateActivity.split('T')[0];          
          return groupComponentDateActivityBeneficiary;
        });
        return response;
      })
    )
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  getAllByGroupComponentAndUser(groupComponentDateActivityBeneficiary: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivityBeneficiary/findByComponentAndUser`, {groupComponentDateActivityBeneficiary})
    .pipe(
      map( (response: any) => {
        response.groupComponentDateActivityBeneficiaries = response.groupComponentDateActivityBeneficiaries.groupComponentDateActivityBeneficiaries.map( (groupComponentDateActivityBeneficiary: any) => {
          groupComponentDateActivityBeneficiary.groupComponent = groupComponentDateActivityBeneficiary.GroupComponent?.Component?.name;
          groupComponentDateActivityBeneficiary.groupCycle = groupComponentDateActivityBeneficiary.GroupCycle?.cycle;
          groupComponentDateActivityBeneficiary.user = groupComponentDateActivityBeneficiary.UserId?.firstName;
          if (groupComponentDateActivityBeneficiary.UserId.secondName) {
            groupComponentDateActivityBeneficiary.user += ' ';
            groupComponentDateActivityBeneficiary.user += groupComponentDateActivityBeneficiary.UserId?.secondName;
          } else {
            groupComponentDateActivityBeneficiary.UserId.secondName = ''
          }
          groupComponentDateActivityBeneficiary.user += ' ';
          groupComponentDateActivityBeneficiary.user += groupComponentDateActivityBeneficiary.UserId?.firstLastName;
          if (groupComponentDateActivityBeneficiary.UserId?.secondLastName) {
            groupComponentDateActivityBeneficiary.user += ' ';
            groupComponentDateActivityBeneficiary.user += groupComponentDateActivityBeneficiary.UserId?.secondLastName;
          } else {
            groupComponentDateActivityBeneficiary.UserId.secondLastName = ''
          }
          groupComponentDateActivityBeneficiary.userIdentification = groupComponentDateActivityBeneficiary.UserId?.identification;
          groupComponentDateActivityBeneficiary.userIdentificationType = groupComponentDateActivityBeneficiary.UserId?.identificationType;
          groupComponentDateActivityBeneficiary.dateActivity = groupComponentDateActivityBeneficiary.dateActivity.split('T')[0];          
          return groupComponentDateActivityBeneficiary;
        });
        return response;
      })
    )
  }

  // No se usa
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/groupComponentDateActivityBeneficiary/getAll`)
    .pipe(
      map( (response: any) => {
        response.groupComponentDateActivityBeneficiaries = response.groupComponentDateActivityBeneficiaries.map( (groupComponentDateActivityBeneficiary: any) => {
          groupComponentDateActivityBeneficiary.cycle = groupComponentDateActivityBeneficiary.GroupCycle?.cycle;
          return groupComponentDateActivityBeneficiary;
        })
        return response;
      })
    )
  }

  // No se usa
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivityBeneficiary/${id}/getById`, {});
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  create(groupComponentDateActivityBeneficiary: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivityBeneficiary/create`, {groupComponentDateActivityBeneficiary});
  }

  // No se usa
  edit(id: number, groupComponentDateActivityBeneficiary: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivityBeneficiary/${id}/update`, {groupComponentDateActivityBeneficiary});
  }

  // No se usa
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivityBeneficiary/${id}/delete`, {});
  }

  deleteIds(ids: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivityBeneficiary/deleteIds`, { ids});
  }
}
