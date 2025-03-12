import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor(private _httpClient: HttpClient) { }

  // No se usa
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/point/getAll`)
    .pipe(
      map( (response: any) => {
        response.points = response.points.map( (point: any) => {
          point.divipola = point.Divipola?.name;
          return point;
        })
        return response;
      })
    )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAllByDivipola(id: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/point/${id}/getAllByDivipola`)
    .pipe(
      map( (response: any) => {
        response.points = response.points.map( (point: any) => {
          point.divipola = point.Divipola?.name;
          return point;
        })
        return response;
      })
    )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/point/${id}/getById`, {});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  create(point: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/point/create`, {point});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  edit(id: number, point: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/point/${id}/update`, {point});
  }

  // No se usa
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/point/${id}/delete`, {});
  }

  disablePoint(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/point/${id}/changeState`, {});
  }
}
