import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private _httpClient: HttpClient) { }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/calendar/getAll`)
      .pipe(
        map((response: any) => {
          response.calendarWorkingDays = response.calendarWorkingDays.map((calendarWorkingDay: any) => {
            if (calendarWorkingDay.state === 'ENABLED') {
              calendarWorkingDay.state = 'Activo';
            } if (calendarWorkingDay.state === 'DISABLED') {
              calendarWorkingDay.state = 'Inactivo';
            }
            return calendarWorkingDay;
          })
          return response;
        })
      )
  }

  // No se usa
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/calendar/${id}/getById`, {});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  create(calendarWorkingDays: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/calendar/create`, { calendarWorkingDays });
  }

  // No se usa
  edit(id: number, calendar: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/calendar/${id}/update`, { calendar });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/calendar/${id}/delete`, {});
  }
}
