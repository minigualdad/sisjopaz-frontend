import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionAnswerService {

  constructor(private _httpClient: HttpClient) { }

  // Se usa en el componente "QuestionAnswerSelectorComponent" pero este no se usa en ningun lugar
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/questionAnswer/getAll`)
    .pipe(
      map( (response: any) => {
        response.questionAnswers = response.questionAnswers.map( (questionAnswer: any) => {
          questionAnswer.question = questionAnswer.Question?.question;
          if (questionAnswer.state === 'ENABLED') {
            questionAnswer.state = 'Activo';
          } if (questionAnswer.state === 'DISABLED') {
            questionAnswer.state = 'Inactivo';
          }
          return questionAnswer;
        })
        return response;
      })
    )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAllByQuestion(questionId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/questionAnswer/${questionId}/getAllByQuestion`)
    .pipe(
      map( (response: any) => {
        response.questionAnswers = response.questionAnswers.map( (questionAnswer: any) => {
          questionAnswer.question = questionAnswer.Question?.question;
          if (questionAnswer.state === 'ENABLED') {
            questionAnswer.state = 'Activo';
          } if (questionAnswer.state === 'DISABLED') {
            questionAnswer.state = 'Inactivo';
          }
          return questionAnswer;
        })
        return response;
      })
    )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/questionAnswer/${id}/getById`, {});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  create(questionAnswer: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/questionAnswer/create`, {questionAnswer});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  edit(id: number, questionAnswer: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/questionAnswer/${id}/update`, {questionAnswer});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/questionAnswer/${id}/delete`, {});
  }
}
