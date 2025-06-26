import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupComponentSheetService {
  constructor(private _httpClient: HttpClient) { }


  getAllByGroupComponent(groupComponentId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/groupComponentSheet/${groupComponentId}/getAllByGroupComponent`)
  }

  create(form: any) {
    const fd = new FormData();
    if (form.sheet) {
      fd.append('sheet', form.sheet, form.sheet?.name || 'sheet.pdf');
      delete form.sheet;
    }
    for (const key in form) {
      fd.append(key, form[key]);
    }
    return this._httpClient.post(`${environment.apiUrl}/app/groupComponentSheet/create`, fd);
  }

}
