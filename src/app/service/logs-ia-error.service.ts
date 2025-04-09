import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LogsIaErrorService {

    constructor(private _httpClient: HttpClient) { }
  
    getAll(){
      return this._httpClient.get(`${environment.apiUrl}/app/logsIAError/getAll`)
    }

    getById(id: number){
      return this._httpClient.get(`${environment.apiUrl}/app/logsIAError/${id}/getById`)
    }
    
    create(){
      return this._httpClient.get(`${environment.apiUrl}/app/logsIAError/create`)
    }
}
