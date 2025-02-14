import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterizationService {
  constructor(private _httpClient: HttpClient) { }

  // No se usa
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/characterization/getAll`)
  }

  // No se usa
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/characterization/${id}/getById`, {});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.PROFESIONAL_PSICOSOCIAL])
  create(characterization: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/characterization/create`, {characterization});
  }

  // No existe en Back
  demography(id: number, characterization: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/characterization/${id}/demography`, {characterization});
  }

  // No existe en Back
  homeAndLiving(id: number, characterization: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/characterization/${id}/homeAndLiving`, {characterization});
  }

  // No existe en Back
  education(id: number, characterization: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/characterization/${id}/education`, {characterization});
  }

  // No existe en Back
  motivations(id: number, characterization: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/characterization/${id}/motivations`, {characterization});
  }

  // No existe en Back
  health(id: number, characterization: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/characterization/${id}/health`, {characterization});
  }

  // No existe en Back
  discriminationAndViolence(id: number, characterization: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/characterization/${id}/discriminationAndViolence`, {characterization});
  }

  // No existe en Back
  institucionalization(id: number, characterization: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/characterization/${id}/institucionalization`, {characterization});
  }

  // No existe en Back
  monitoring(id: number, characterization: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/characterization/${id}/monitoring`, {characterization});
  }

  // No existe en Back
  economySituation(id: number, characterization: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/characterization/${id}/economySituation`, {characterization});
  }

  // No se usa
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/characterization/${id}/delete`, {});
  }

  getCharacterizationPdf(surveyId:number): Observable<any>{
    return this._httpClient.get(`${environment.apiUrl}/app/characterization/${surveyId}/getPdf`);
  }
  
}
