import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  constructor(private _httpClient: HttpClient) { }

  // No se usa
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/monitoring/getAll`)
    .pipe(
      map( (response: any) => {
        response.monitorings = response.monitorings.map( (monitoring: any) => {
          monitoring.identification = monitoring.Survey?.identification;
          monitoring.identificationType = monitoring.Survey?.identificationType;
          monitoring.email = monitoring.Survey?.email;
          monitoring.name = monitoring.Survey?.firstName + ' ' + monitoring.Survey?.secondName + ' ' + monitoring.Survey?.firstLastName + ' ' + monitoring.Survey?.secondLastName;

          return monitoring;
        })
        return response;
      })
    )
  }

  // No se usa
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/monitoring/${id}/getById`, {});
  }

  // Roles.DIRECCION, Roles.ADMIN, Roles.PROFESIONAL_PSICOSOCIAL
  create(monitoring: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/monitoring/create`, {monitoring});
  }

  // No se usa
  edit(id: number, monitoring: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/monitoring/${id}/update`, {monitoring});
  }

  // No se usa
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/monitoring/${id}/delete`, {});
  }}
