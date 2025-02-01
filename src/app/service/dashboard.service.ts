import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _httpClient: HttpClient) { }

  // roleVerify(RoleGroups.ALL)
  getAllData(){
    return this._httpClient.get(`${environment.apiUrl}/app/survey/getAllDashboard`)
  }
}
