import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupBeneficiaryService {

  constructor(private _httpClient: HttpClient) { }

  // No existe la ruta "/app/groupBeneficiary/" en Back
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/groupBeneficiary/getAll`);
  }

  // No existe la ruta "/app/groupBeneficiary/" en Back
  getAllByGroupId(groupId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/groupBeneficiary/${groupId}/getAllByGroup`)
    .pipe(
      map( (response: any) => {
        response.groupBeneficiaries = response.groupBeneficiaries.map( (groupBeneficiary: any) => {
          groupBeneficiary.name = groupBeneficiary.firstName;
          if (groupBeneficiary.secondName) {
            groupBeneficiary.name += ' ';
            groupBeneficiary.name += groupBeneficiary.secondName;
          } else {
            groupBeneficiary.secondName = ''
          }
          groupBeneficiary.name += ' ';
          groupBeneficiary.name += groupBeneficiary.firstLastName;
          if (groupBeneficiary.secondLastName) {
            groupBeneficiary.name += ' ';
            groupBeneficiary.name += groupBeneficiary.secondLastName;
          } else {
            groupBeneficiary.secondLastName = ''
          }
          groupBeneficiary.group = groupBeneficiary.Group?.name;
          groupBeneficiary.beneficiary = groupBeneficiary.Survey?.firstName + ' ' + groupBeneficiary.Survey?.secondName + ' ' + groupBeneficiary.Survey?.firstLastName + ' ' + groupBeneficiary.Survey?.secondLastName;
          return groupBeneficiary;
        })
        return response;
      })
    )
  }

  // No existe la ruta "/app/groupBeneficiary/" en Back
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupBeneficiary/${id}/getById`, {});
  }

  // No existe la ruta "/app/groupBeneficiary/" en Back
  create(groupBeneficiary: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupBeneficiary/create`, {groupBeneficiary});
  }

  // No existe la ruta "/app/groupBeneficiary/" en Back
  edit(id: number, groupBeneficiary: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupBeneficiary/${id}/update`, {groupBeneficiary});
  }

  // No existe la ruta "/app/groupBeneficiary/" en Back
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupBeneficiary/${id}/delete`, {});
  }
}
