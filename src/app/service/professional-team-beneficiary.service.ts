import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalTeamBeneficiaryService {

  constructor(private _httpClient: HttpClient) { }

  // No se usa
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/professionalTeam/getAll`)
  }

  // No se usa
  getAllById(coordinatorId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/professionalTeam/${coordinatorId}/getAllByCoordinator`)
    .pipe(
      map( (response: any) => {
        response.professionalTeams = response.professionalTeams.map( (professionalTeam: any) => {
          professionalTeam.coordinator = professionalTeam.Coordinator?.name;
          return professionalTeam;
        })
        return response;
      })
    )
  }

  // No se usa
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/professionalTeam/${id}/getById`, {});
  }

  // No se usa
  showByUserId(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/professionalTeam/${id}/getByUserId`, {});
  }

  // No se usa
  create(professionalTeam: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/professionalTeam/create`, {professionalTeam});
  }

  // No se usa
  edit(id: number, professionalTeam: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/professionalTeam/${id}/update`, {professionalTeam});
  }

  // No se usa
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/professionalTeam/${id}/delete`, {});
  }
}
