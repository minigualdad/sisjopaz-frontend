import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyQuestionDetailAnswerService {
  constructor(private _httpClient: HttpClient) { }

  // No se usa
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/surveyQuestionDetailAnswer/getAll`)
    .pipe(
      map( (response: any) => {
        response.surveyQuestionDetailAnswers = response.surveyQuestionDetailAnswers.map( (surveyQuestionDetailAnswer: any) => {
          surveyQuestionDetailAnswer.surveyQuestionDetailAnswer = surveyQuestionDetailAnswer.SurveyQuestionDetail?.Question?.question;
          surveyQuestionDetailAnswer.surveyDate = surveyQuestionDetailAnswer.SurveyQuestionDetail?.SurveyQuestionGroup?.surveyDate;
          surveyQuestionDetailAnswer.questionAnswer = surveyQuestionDetailAnswer.QuestionAnswer?.answer;
          surveyQuestionDetailAnswer.name = surveyQuestionDetailAnswer.SurveyQuestionDetail?.Survey?.firstName + ' ' + surveyQuestionDetailAnswer.SurveyQuestionDetail?.Survey?.secondName + ' ' + surveyQuestionDetailAnswer.SurveyQuestionDetail?.Survey?.firstLastName + ' ' + surveyQuestionDetailAnswer.SurveyQuestionDetail?.Survey?.secondLastName;
          surveyQuestionDetailAnswer.identification = surveyQuestionDetailAnswer.SurveyQuestionDetail?.Survey?.identification;
          surveyQuestionDetailAnswer.identificationType = surveyQuestionDetailAnswer.SurveyQuestionDetail?.Survey?.identificationType;
          return surveyQuestionDetailAnswer;
        })
        return response;
      })
    )
  }

  // No se usa
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/surveyQuestionDetailAnswer/${id}/getById`, {});
  }

  // No se usa
  create(surveyQuestionDetailAnswer: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/surveyQuestionDetailAnswer/create`, {surveyQuestionDetailAnswer});
  }

  // No se usa
  edit(id: number, surveyQuestionDetailAnswer: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/surveyQuestionDetailAnswer/${id}/update`, {surveyQuestionDetailAnswer});
  }

  // No se usa
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/surveyQuestionDetailAnswer/${id}/delete`, {});
  }
}
