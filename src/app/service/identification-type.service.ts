import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class IdentificationTypeService {
  constructor(private _httpClient: HttpClient) {}

  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/identificationType/getAll`)}
}
