import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyQuestionDetailService {
  constructor(private _httpClient: HttpClient) { }

  // No se usa
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/surveyQuestionDetail/getAll`)
    .pipe(
      map( (response: any) => {
        response.surveyQuestionDetails = response.surveyQuestionDetails.map( (surveyQuestionDetail: any) => {
          surveyQuestionDetail.surveyGroupQuestion = surveyQuestionDetail.SurveyQuestionGroup?.QuestionGroup?.name;
          surveyQuestionDetail.question = surveyQuestionDetail.Question?.question;

          surveyQuestionDetail.name = surveyQuestionDetail.Survey?.firstName + ' ' + surveyQuestionDetail?.Survey?.secondName + ' ' + surveyQuestionDetail?.Survey?.firstLastName + ' ' + surveyQuestionDetail?.Survey?.secondLastName;
          surveyQuestionDetail.identification = surveyQuestionDetail.Survey?.identification;
          surveyQuestionDetail.identificationType = surveyQuestionDetail.Survey?.identificationType;
          return surveyQuestionDetail;
        })
        return response;
      })
    )
  }

  // No se usa
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/surveyQuestionDetail/${id}/getById`, {});
  }

  // No se usa
  create(surveyQuestionDetail: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/surveyQuestionDetail/create`, {surveyQuestionDetail});
  }

  // No se usa
  edit(id: number, surveyQuestionDetail: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/surveyQuestionDetail/${id}/update`, {surveyQuestionDetail});
  }

  // No se usa
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/surveyQuestionDetail/${id}/delete`, {});
  }
}
