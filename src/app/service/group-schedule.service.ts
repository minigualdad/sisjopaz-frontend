import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupScheduleService {

  constructor(private _httpClient: HttpClient) { }

  // No existe la ruta "/app/groupSchedule/" en Back
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/groupSchedule/getAll`)
    .pipe(
      map( (response: any) => {
        response.groupSchedules = response.groupSchedules.map( (groupSchedule: any) => {
          groupSchedule.group = groupSchedule.Group?.name;
          groupSchedule.coresponsability = groupSchedule.Coresponsability?.name;
          return groupSchedule;
        })
        return response;
      })
    )
  }

  getAllByGroupId(groupId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/groupSchedule/${groupId}/getAllByGroup`)
    .pipe(
      map( (response: any) => {
          response.groupSchedules = response.groupSchedules.map( (groupSchedule: any) => {
            groupSchedule.group = groupSchedule.Group?.name;
            groupSchedule.coresponsability = groupSchedule.Coresponsability?.name;
            groupSchedule.dateSplitted = groupSchedule.date.split('T')[0];
            return groupSchedule;
          })
          return response;
        })
    )
  }

  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupSchedule/${id}/getById`, {});
  }

  create(groupSchedule: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupSchedule/create`, {groupSchedule});
  }

  edit(id: number, groupSchedule: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupSchedule/${id}/update`, {groupSchedule});
  }

  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupSchedule/${id}/delete`, {});
  }
}
