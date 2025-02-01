import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private _http: HttpClient) { }

  // roleVerify(RoleGroups.ALL)
  submit(form:any){
    const fd = new FormData();
    if(form.frontImage){
      fd.append('fileFront', form.frontImage, form.frontImage?.name || 'image.png');
      delete(form.frontImage);
    }
    if(form.backImage) {
      fd.append('fileBack', form.backImage, form.backImage?.name || 'image.png');
      delete(form.backImage);
    }
    for (const key in form) {
      fd.append(key, form[key]);
    }
    return this._http.post(`${environment.apiUrl}/app/survey/createPreregister`, fd)
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION, Roles.COORDINACION, Roles.ENLACE_REGIONAL])
  agreement(form:any){
    const fd = new FormData();
    if(form.accountFile) {
      fd.append('accountCert', form.accountFile, form.accountFile?.name || 'image.png');
      delete(form.accountFile);
    }
    for (const key in form) {
      fd.append(key, form[key]);
    }
    return this._http.post(`${environment.apiUrl}/app/survey/${form.surveyId}/agreement`, fd)
  }
}
