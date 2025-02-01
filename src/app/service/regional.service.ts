import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionalService {

  constructor(private _httpClient: HttpClient) { }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/region/getAll`)
    .pipe(
      map((response: any) => {
        response.regions = response.regions.map((region: any) => {
          region.department = region.ListDepartment?.name;
            return region
        });
        return response;
      })
    );
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  create(region: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/region/create`, {region});
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/region/${id}/getById`, {});
  }
  
}