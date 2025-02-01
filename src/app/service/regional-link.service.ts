import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionalLinkService {

  constructor(private _httpClient: HttpClient) { }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION, Roles.COORDINACION])
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/regionalLink/getAll`)
    .pipe(
      map( (response: any) => {
        response.regionalLinks = response.regionalLinks.map( (regionalLink: any) => {
          regionalLink.user = regionalLink.User?.name;
          regionalLink.identification = regionalLink.User?.identification;
          regionalLink.email = regionalLink.User?.email;

          return regionalLink;
        })
        return response;
      })
    )
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  getByRegionalId(id:number){
    return this._httpClient.get(`${environment.apiUrl}/app/regionalLink/${id}/getAllByRegion`)
    .pipe(
      map( (response: any) => {
        response.regionalLinks = response.regionalLinks.map( (regionalLink: any) => {
          regionalLink.user = regionalLink.User?.name;
          regionalLink.identification = regionalLink.User?.identification;
          regionalLink.email = regionalLink.User?.email;

          return regionalLink;
        })
        return response;
      })
    )
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/regionalLink/${id}/getById`, {});
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  create(regionalLink: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/regionalLink/create`, {regionalLink});
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  edit(id: number, regionalLink: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/regionalLink/${id}/update`, {regionalLink});
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/regionalLink/${id}/delete`, {});
  }
}
