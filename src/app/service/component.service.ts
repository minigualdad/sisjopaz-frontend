import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  constructor(private _httpClient: HttpClient) { }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/component/getAll`)
            .pipe(
              map( (response: any) => {
                response.components = response.components.map( (component: any) => {
                  if(component.state === 'ENABLED'){
                    component.state = 'Activo';
                  } if(component.state === 'DISABLED'){
                    component.state = 'Inactivo';
                  } 
                  return component;
                })
                return response;
              })
            )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/component/${id}/getById`, {});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  create(component: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/component/create`, {component});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  edit(id: number, component: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/component/${id}/update`, {component});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/component/${id}/delete`, {});
  }
}
