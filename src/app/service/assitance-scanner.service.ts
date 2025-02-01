import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AssistanceScannerService {

  constructor(private _httpClient: HttpClient) { }

  // roleVerify([Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_PSICOSOCIAL, Roles.PROFESIONAL_EDUCACION, Roles.PROFESIONAL_PSICOJURIDICO, Roles.ENLACE_REGIONAL, Roles.COORDINACION, Roles.DIRECCION, Roles.ADMIN, Roles.GESTORES_SOCIALES])
  uploadFile(file: File) {
    const selectedFile = file;
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this._httpClient.post(environment.apiUrl + '/app/assistanceScanner/uploadFile', fd);
  }

}
