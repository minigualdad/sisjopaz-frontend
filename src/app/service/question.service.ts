import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private _httpClient: HttpClient) { }

  // Se implementa en "QuestionSelectorComponent" pero este no se implementa.
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/question/getAll`)
    .pipe(
      map( (response: any) => {
        response.questions = response.questions.map( (question: any) => {
          question.questionGroup = question.QuestionGroup?.name;
          return question;
        })
        return response;
      })
    )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAllByGroup(questionGroupId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/question/${questionGroupId}/getAllByGroup`)
    .pipe(
      map( (response: any) => {
        response.questions = response.questions.map( (question: any) => {
          question.questionGroup = question.QuestionGroup?.name;
          if (question.state === 'ENABLED') {
            question.state = 'Activo';
          } if (question.state === 'DISABLED') {
            question.state = 'Inactivo';
          }
          return question;
        })
        return response;
      })
    )
  }

  // No se usa
  getAllBySubGroup(question: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/question/getAllBySubGroup`, {question})
    .pipe(
      map( (response: any) => {
        response.questions = response.questions.map( (question: any) => {
          question.questionGroup = question.QuestionGroup?.name;
          return question;
        })
        return response;
      })
    )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/question/${id}/getById`, {});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  create(question: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/question/create`, {question});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  edit(id: number, question: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/question/${id}/update`, {question});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/question/${id}/delete`, {});
  }
}
