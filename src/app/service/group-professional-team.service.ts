import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupProfessionalTeamService {

  constructor(private _httpClient: HttpClient) { }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  getAllByComponentGroupId(groupComponentId: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentProfesional/${groupComponentId}/getByGroupComponentId`, {})
    .pipe(
      map( (response: any) => {
        response.groupComponentProfessionals = response.groupComponentProfessionals.map((groupProfessionalTeam: any) => {
          groupProfessionalTeam.professionalTeam = groupProfessionalTeam.ProfessionalTeam?.name;
          groupProfessionalTeam.professionalTeamUser = groupProfessionalTeam.ProfessionalTeam?.UserAdmin?.name;
          return groupProfessionalTeam;
        });

        return response;
      })
    )
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  create(groupComponentProfessional: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentProfesional/create`, {groupComponentProfessional});
  }

  // No existe en Back
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentProfesional/${id}/delete`, {});
  }

}
