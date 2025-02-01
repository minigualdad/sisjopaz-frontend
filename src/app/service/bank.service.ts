import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  constructor(private _httpClient: HttpClient) { }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/bank/getAll`)
      .pipe(
        map((response: any) => {
          response.banks = response.banks.map((bank: any) => {
            if (bank.state === 'ENABLED') {
              bank.state = 'Activo';
            } if (bank.state === 'DISABLED') {
              bank.state = 'Inactivo';
            }
            return bank;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/bank/${id}/getById`, {});
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  create(bank: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/bank/create`, { bank });
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  edit(id: number, bank: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/bank/${id}/update`, { bank });
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/bank/${id}/delete`, {});
  }
}
