import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { IndexedDbService } from './indexed-db.service';
import { from, of, switchMap } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionGroupService {
  connectionStatus = false;
  constructor(private _httpClient: HttpClient,
    private indexedDbService: IndexedDbService,) { }

  connectionStatusCheck(){
    if (navigator.onLine) {
      this.connectionStatus = true;
    } else {
      this.connectionStatus = false;
    }
  }

  getAllCharacterization() {
    this.connectionStatusCheck();
    if(this.connectionStatus){
      return this.show(1);
    } else {
      return from(this.indexedDbService.getQuestionsCharacterization()).pipe(
        switchMap((questions: any) => {
          if(questions && questions.length > 0){
            const objetct = {questionGroup: {questions: []}};
            objetct.questionGroup.questions = questions
            return of(objetct)
          } else {
            const fallbackQuestions = {questionGroup: {questions: []}};
            return of(fallbackQuestions);
          }
        })
      )
    }
  }

  getAllMonitoreo() {
    this.connectionStatusCheck();
    if(this.connectionStatus){
      return this.show(2);
    } else {
      return from(this.indexedDbService.getQuestionsMonitoring()).pipe(
        switchMap((questions: any) => {
          if(questions && questions.length > 0){
            const objetct = {questionGroup: {questions: []}};
            objetct.questionGroup.questions = questions
            return of(objetct)
          } else {
            const fallbackQuestions = {questionGroup: {questions: []}};
            return of(fallbackQuestions);
          }
        })
      )
    }
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/questionGroup/getAll`)
          .pipe(
            map((response: any) => {
              response.questionGroups = response.questionGroups.map((questionGroup: any) => {
                if (questionGroup.state === 'ENABLED') {
                  questionGroup.state = 'Activo';
                } if (questionGroup.state === 'DISABLED') {
                  questionGroup.state = 'Inactivo';
                }
                return questionGroup;
              })
              return response;
            })
          )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION, Roles.APOYO_A_LA_COORDINACION, Roles.GESTORES_SOCIALES, Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_EDUCACION, Roles.PROFESIONAL_PSICOJURIDICO, Roles.PROFESIONAL_PSICOSOCIAL])
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/questionGroup/${id}/getById`, {});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  create(questionGroup: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/questionGroup/create`, {questionGroup});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  edit(id: number, questionGroup: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/questionGroup/${id}/update`, {questionGroup});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/questionGroup/${id}/delete`, {});
  }
}
