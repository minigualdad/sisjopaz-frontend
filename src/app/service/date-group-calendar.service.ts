import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateGroupCalendarService {

  constructor(private _httpClient: HttpClient) { }

  // ruta "dateGroupCalendar" no existente en Back
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/dateGroupCalendar/getAll`)
    .pipe(
      map( (response: any) => {
        response.dateGroupCalendars = response.dateGroupCalendars.map( (dateGroupCalendar: any) => {
          dateGroupCalendar.dateGroup = dateGroupCalendar.DateGroup?.name;
          return dateGroupCalendar;
        })
        return response;
      })
    )
  }

  // ruta "dateGroupCalendar" no existente en Back
  getAllByDateGroup(id: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/dateGroupCalendar/${id}/getAllByDateGroup`)
    .pipe(
      map( (response: any) => {
        response.dateGroupCalendars = response.dateGroupCalendars.map( (dateGroupCalendar: any) => {
          dateGroupCalendar.name = dateGroupCalendar.DateGroup?.name;
          return dateGroupCalendar;
        })
        return response;
      })
    )
  }

  // ruta "dateGroupCalendar" no existente en Back
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/dateGroupCalendar/${id}/getById`, {});
  }

  // ruta "dateGroupCalendar" no existente en Back
  create(dateGroupCalendar: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/dateGroupCalendar/create`, {dateGroupCalendar});
  }

  // ruta "dateGroupCalendar" no existente en Back
  edit(id: number, dateGroupCalendar: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/dateGroupCalendar/${id}/update`, {dateGroupCalendar});
  }

  // ruta "dateGroupCalendar" no existente en Back
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/dateGroupCalendar/${id}/delete`, {});
  }}
