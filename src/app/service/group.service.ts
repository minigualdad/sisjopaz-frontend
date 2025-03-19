import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private _httpClient: HttpClient) { }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/group/getAll`)
    .pipe(
      map( (response: any) => {
        response.groups = response.groups.map( (group: any) => {
          group.divipola = group.Divipola?.name;
          group.regionalLink = group.RegionalLink?.name;
          group.point = group.Point?.name;
          if (group.state === 'ENABLED') {
            group.state = 'Activo';
          } if (group.state === 'DISABLED') {
            group.state = 'Inactivo';
          }
          return group;
        })
        return response;
      })
    )
  }

  // roleVerify(RoleGroups.ALL)
  getAllByDivipola() {
    return this._httpClient.get(`${environment.apiUrl}/app/group/getAllByDivipola`)
    .pipe(
      map( (response: any) => {
        response.groups = response.groups.map( (group: any) => {
          group.divipola = group.Divipola?.name;
          group.regionalLink = group.RegionalLink?.name;
          group.point = group.Point?.name;
          if(group.state === 'ENABLED'){
            group.state = 'Activo';
          } else {
            group.state = 'Inactivo'
          }
          return group;
        })
        return response;
      })
    )
  }

  // roleVerify(RoleGroups.ALL)
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/group/${id}/getById`, {});
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION, Roles.COORDINACION])
  create(group: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/group/create`, {group});
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  edit(id: number, group: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/group/${id}/update`, {group});
  }

  // roleVerify(RoleGroups.ALL)
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/group/${id}/delete`, {});
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  downloadGroupInfo() {
    return this._httpClient.get(environment.apiUrl + '/app/group/downloadGroupInfo', {
      responseType: 'blob'
    });
  }

  downloadGroupInfoByDivipola(){
    return this._httpClient.get(environment.apiUrl + '/app/group/downloadGroupInfoByDivipola', {
      responseType: 'blob'
    });
  }
}
