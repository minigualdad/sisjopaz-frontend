import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map, Observable } from 'rxjs';

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
        map((response: any) => {
          response.groupComponentDateActivityBeneficiaries = response.groupComponentDateActivityBeneficiaries.map((groupComponentDateActivityBeneficiary: any) => {
            groupComponentDateActivityBeneficiary.groupComponent = groupComponentDateActivityBeneficiary.GroupComponent?.Component?.name;
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

  getAllByGroupComponentAndDates(groupComponentDateActivityBeneficiary: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivityBeneficiary/getAllByGroupComponentAndDates`, {groupComponentDateActivityBeneficiary})
    .pipe(
      map( (response: any) => {
        response.groupComponentDateActivityBeneficiaries = response.groupComponentDateActivityBeneficiaries.map( (groupComponentDateActivityBeneficiary: any) => {
          groupComponentDateActivityBeneficiary.groupComponent = groupComponentDateActivityBeneficiary.GroupComponent?.Component?.name;
          groupComponentDateActivityBeneficiary.firstName = groupComponentDateActivityBeneficiary.UserId?.firstName;
          if (groupComponentDateActivityBeneficiary.UserId.secondName) {
            groupComponentDateActivityBeneficiary.secondName = groupComponentDateActivityBeneficiary.UserId.secondName;
          } else {
            groupComponentDateActivityBeneficiary.secondName = ''
          }
          groupComponentDateActivityBeneficiary.firstLastName = groupComponentDateActivityBeneficiary.UserId?.firstLastName;
          if (groupComponentDateActivityBeneficiary.UserId?.secondLastName) {
            groupComponentDateActivityBeneficiary.secondLastName = groupComponentDateActivityBeneficiary.UserId?.secondLastName;
          } else {
            groupComponentDateActivityBeneficiary.secondLastName = ''
          }
          groupComponentDateActivityBeneficiary.identification = groupComponentDateActivityBeneficiary.UserId?.identification;
          groupComponentDateActivityBeneficiary.identificationType = groupComponentDateActivityBeneficiary.UserId?.identificationType;
          groupComponentDateActivityBeneficiary.assistanceSignDate = groupComponentDateActivityBeneficiary.dateActivity;          
          return groupComponentDateActivityBeneficiary;
        });
        return response;
      })
    )
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  getAllByGroupComponentAndUser(groupComponentDateActivityBeneficiary: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivityBeneficiary/findByComponentAndUser`, { groupComponentDateActivityBeneficiary })
      .pipe(
        map((response: any) => {
          response.groupComponentDateActivityBeneficiaries = response.groupComponentDateActivityBeneficiaries.groupComponentDateActivityBeneficiaries.map((groupComponentDateActivityBeneficiary: any) => {
            groupComponentDateActivityBeneficiary.groupComponent = groupComponentDateActivityBeneficiary.GroupComponent?.Component?.name;
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
  getAllByUser(groupComponentDateActivityBeneficiary: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivityBeneficiary/findByUser`, { groupComponentDateActivityBeneficiary })
      .pipe(
        map((response: any) => {
          response.groupComponentDateActivityBeneficiaries = response.groupComponentDateActivityBeneficiaries.groupComponentDateActivityBeneficiaries.map((groupComponentDateActivityBeneficiary: any) => {
            groupComponentDateActivityBeneficiary.groupComponent = groupComponentDateActivityBeneficiary.GroupComponent?.Component?.name;
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

  getAllByGroupComponentAndDate(groupComponentDateActivityBeneficiary: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivityBeneficiary/findByGroupComponentAndDate`, { groupComponentDateActivityBeneficiary })
      .pipe(
        map((response: any) => {
          response.groupComponentDateActivityBeneficiaries = response.groupComponentDateActivityBeneficiaries.groupComponentDateActivityBeneficiaries.map((groupComponentDateActivityBeneficiary: any) => {
            groupComponentDateActivityBeneficiary.groupComponent = groupComponentDateActivityBeneficiary.GroupComponent?.Component?.name;
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

            groupComponentDateActivityBeneficiary.userId = groupComponentDateActivityBeneficiary.userId;
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
        map((response: any) => {
          response.groupComponentDateActivityBeneficiaries = response.groupComponentDateActivityBeneficiaries.map((groupComponentDateActivityBeneficiary: any) => {
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
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivityBeneficiary/create`, { groupComponentDateActivityBeneficiary });
  }

  createAssistance(groupComponentDateActivityBeneficiary: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivityBeneficiary/addAssistance`, { groupComponentDateActivityBeneficiary });
  }

  // No se usa
  edit(id: number, groupComponentDateActivityBeneficiary: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivityBeneficiary/${id}/update`, { groupComponentDateActivityBeneficiary });
  }

  // No se usa
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivityBeneficiary/${id}/delete`, {});
  }

  deleteIds(ids: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivityBeneficiary/deleteIds`, { ids });
  }

  assistanceBenficiariesByGroup(data: any): Observable<Blob> {
    return this._httpClient.post(environment.apiUrl + '/app/groupComponentDateActivityBeneficiary/downloadGroupsAssistantByPeriod', { data }, { responseType: 'blob' });
  }
  assistanceBenficiariesAll(data: any): Observable<Blob> {
    return this._httpClient.post(environment.apiUrl + '/app/groupComponentDateActivityBeneficiary/downloadAllAssistancesByPeriod', { data }, { responseType: 'blob' });
  }
  assistanceBenficiariesByRegion(data: any): Observable<Blob> {
    return this._httpClient.post(environment.apiUrl + '/app/groupComponentDateActivityBeneficiary/downloadAllAssistancesByPeriodAndRegion', { data }, { responseType: 'blob' });
  }

  updateAssistance(groupComponentDateActivityBeneficiary: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentDateActivityBeneficiary/updateAssistance`, { groupComponentDateActivityBeneficiary });
  }
}
