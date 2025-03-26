import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalTeamService {

  constructor(private _httpClient: HttpClient) { }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/professionalTeam/getAll`)
  }

  // No se usa
  getAllById(coordinatorId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/professionalTeam/${coordinatorId}/getAllByCoordinator`)
    .pipe(
      map( (response: any) => {
        response.professionalTeams = response.professionalTeams.map( (professionalTeam: any) => {
          professionalTeam.user = professionalTeam.UserAdmin?.name;
          professionalTeam.coordinator = professionalTeam.Coordinator?.name;
          return professionalTeam;
        })
        return response;
      })
    )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getByRegionalId(id:number){
    return this._httpClient.get(`${environment.apiUrl}/app/professionalTeam/${id}/getAllByRegion`)
    .pipe(
      map( (response: any) => {
        response.professionalTeams = response.professionalTeams.map( (professionalTeam: any) => {
          professionalTeam.coordinator = professionalTeam.Coordinator?.name;
          professionalTeam.user = professionalTeam.UserAdmin?.name;
          professionalTeam.region = professionalTeam.Region?.ListDepartment?.name;
          return professionalTeam;
        })
        return response;
      })
    )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  show(id: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/professionalTeam/${id}/getById`);
  }

  // No se usa
  showByUserId(id: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/professionalTeam/${id}/getByUserId`, {});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  create(professionalTeam: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/professionalTeam/create`, {professionalTeam});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  edit(id: number, professionalTeam: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/professionalTeam/${id}/update`, {professionalTeam});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/professionalTeam/${id}/delete`, {});
  }
}
