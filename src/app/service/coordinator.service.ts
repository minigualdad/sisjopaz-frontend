import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoordinatorService {
  constructor(private _httpClient: HttpClient) { }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/coordinator/getAll`)
    .pipe(
      map( (response: any) => {
        response.coordinators = response.coordinators.map( (coordinator: any) => {
          coordinator.divipol = coordinator.Divipola?.name;
          coordinator.user = coordinator.User?.name;
          coordinator.regionalLink = coordinator.RegionalLink?.name;
          return coordinator;
        })
        return response;
      })
    )
  }

  // No se usa
  getAllById(regionalLinkId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/coordinator/${regionalLinkId}/getAllByRegionalLink`)
    .pipe(
      map( (response: any) => {
        response.coordinators = response.coordinators.map( (coordinator: any) => {
          coordinator.divipol = coordinator.Divipola?.name;
          coordinator.user = coordinator.User?.name;
          coordinator.regionalLink = coordinator.RegionalLink?.name;
          return coordinator;
        })
        return response;
      })
    )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getByRegionalId(id:number){
    return this._httpClient.get(`${environment.apiUrl}/app/coordinator/${id}/getAllByRegion`)
    .pipe(
      map( (response: any) => {
        response.coordinators = response.coordinators.map( (coordinator: any) => {
          coordinator.name = coordinator?.name;
          coordinator.regionId = coordinator?.regionId;
          coordinator.state = coordinator?.state;
          coordinator.regionId = coordinator?.User.id;
          coordinator.nameUser = coordinator?.User.name;

          return coordinator;
        })
        return response;
      })
    )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/coordinator/${id}/getById`, {});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  create(coordinator: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/coordinator/create`, {coordinator});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  edit(id: number, coordinator: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/coordinator/${id}/update`, {coordinator});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/coordinator/${id}/delete`, {});
  }
}
