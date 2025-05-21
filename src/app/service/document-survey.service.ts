import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentSurveyService {

  constructor(private _httpClient: HttpClient) { }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  getAllDocumentBySurveyId(id: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/surveyDocuments/${id}/getAllBySurveyId`)
      .pipe(
        map((response: any) => {
          response.surveyDocuments = response.surveyDocuments.map((document: any) => {
            document.documentType = document.documentType?.name;
            if (document.state === 'DISABLED') {
              document.state = 'VIGENTE'
            } else {
              document.state = 'NO VIGENTE'
            }
            return document
          });
          return response;
        })
      );
  }

}
