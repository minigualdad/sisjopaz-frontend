import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AccountCertLogService {
  constructor(private _httpClient: HttpClient) { }

  showBySurveyId(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/accountCertLog/${id}/getBySurveyId`, {});
  }

}
