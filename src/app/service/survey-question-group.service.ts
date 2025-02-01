import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SurveyQuestionGroupService {
  constructor(private _httpClient: HttpClient) { }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/surveyQuestionGroup/getAll`)
    .pipe(
      map( (response: any) => {
        response.surveyQuestionGroups = response.surveyQuestionGroups.map( (surveyQuestionGroup: any) => {
          surveyQuestionGroup.questionGroup = surveyQuestionGroup.QuestionGroup?.name;
          surveyQuestionGroup.name = surveyQuestionGroup.Survey?.firstName + ' ' + surveyQuestionGroup.Survey?.secondName + ' ' + surveyQuestionGroup.Survey?.firstLastName + ' ' + surveyQuestionGroup.Survey?.secondLastName;
          surveyQuestionGroup.identification = surveyQuestionGroup.Survey?.identification;
          surveyQuestionGroup.identificationType = surveyQuestionGroup.Survey?.identificationType;
          return surveyQuestionGroup;
        })
        return response;
      })
    )
  }

  // No se usa
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/surveyQuestionGroup/${id}/getById`, {});
  }

  // No se usa
  create(surveyQuestionGroup: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/surveyQuestionGroup/create`, {surveyQuestionGroup});
  }

  // No se usa
  edit(id: number, surveyQuestionGroup: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/surveyQuestionGroup/${id}/update`, {surveyQuestionGroup});
  }

  // No se usa
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/surveyQuestionGroup/${id}/delete`, {});
  }
}
