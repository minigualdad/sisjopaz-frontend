import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateGroupService {

  constructor(private _httpClient: HttpClient) { }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/dateGroup/getAll`)
      .pipe(
        map((response: any) => {
          response.dateGroups = response.dateGroups.map((dateGroup: any) => {
            if (dateGroup.state === 'ENABLED') {
              dateGroup.state = 'Activo';
            } if (dateGroup.state === 'DISABLED') {
              dateGroup.state = 'Inactivo';
            }

            dateGroup.weekDays = this.getWeekDays(dateGroup.weekDays)
            return dateGroup;
          })
          return response;
        })
      )
  }

  getWeekDays(input: string | number[]): string {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    let numbers: number[] = [];

    if (Array.isArray(input)) {
        numbers = input;
    } else if (typeof input === 'string') {
        const cleanedInput = input.replace(/[\[\]\s]/g, '');
        numbers = cleanedInput.split(',')
            .map(num => parseInt(num.trim(), 10))
            .filter(num => !isNaN(num));
    } else {
        console.error("❌ Error: Invalid input. Expected string or number[].");
        return "";
    }

    const selectedDays = numbers
        .filter(num => num >= 1 && num <= 7)
        .map(num => days[num - 1]);

    return selectedDays.join(', ');
}



  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/dateGroup/${id}/getById`, {});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  create(dateGroup: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/dateGroup/create`, { dateGroup });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  edit(id: number, dateGroup: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/dateGroup/${id}/update`, { dateGroup });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/dateGroup/${id}/delete`, {});
  }
}
