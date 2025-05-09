import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GroupComponentService {

  constructor(private _httpClient: HttpClient) { }

  // No se usa
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/groupComponent/getAll`)
    .pipe(
      map( (response: any) => {
        response.groupComponents = response.groupComponents.map( (groupComponent: any) => {
          groupComponent.group = groupComponent.Group?.name;
          groupComponent.professionalTeam = groupComponent.ProfessionalTeam?.name;
          groupComponent.component = groupComponent.Component?.name;
          groupComponent.dateGroup = groupComponent.DateGroup?.name;

          return groupComponent;
        })
        return response;
      })
    )
  }

  // roleVerify(RoleGroups.ALL)
  getAllByGroup(id: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/groupComponent/${id}/getAllByGroup`)
    .pipe(
      map( (response: any) => {
        response.groupComponents = response.groupComponents.map( (groupComponent: any) => {
          groupComponent.group = groupComponent.Group?.name;
          groupComponent.professionalTeam = groupComponent.ProfessionalTeam?.name;
          groupComponent.component = groupComponent.Component?.name;
          groupComponent.dateGroup = groupComponent.DateGroup?.name;
          if(groupComponent.state === 'ENABLED'){
            groupComponent.state = 'Activo';
          } else {
            groupComponent.state = 'Inactivo'
          }
          return groupComponent;
        })
        return response;
      })
    )
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponent/${id}/getById`, {});
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  create(groupComponent: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponent/create`, {groupComponent});
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  edit(id: number, groupComponent: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponent/${id}/update`, {groupComponent});
  }

  editDateGroup(id: number, groupComponent: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponent/${id}/updateDateGroup`, {groupComponent});
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponent/${id}/delete`, {});
  }}
