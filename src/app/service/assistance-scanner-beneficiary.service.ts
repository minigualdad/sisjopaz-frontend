import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AssistanceScannerBeneficiaryService {

 constructor(private _httpClient: HttpClient) { }

  //roleVerify([Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_PSICOSOCIAL, Roles.PROFESIONAL_EDUCACION, Roles.PROFESIONAL_SOCIOJURIDICO, Roles.DIRECCION, Roles.ADMIN])
  getAllById(id: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/assistanceScannerBeneficiary/${id}/getAllByUser`)
    .pipe(
      map( (response: any) => {
        response.beneficiaryAssistances = response.beneficiaryAssistances.map( (beneficiaryAssistance: any) => {
          beneficiaryAssistance.urlFileImageProcessed = beneficiaryAssistance.AssistanceScanner?.urlFileImageProcessed;
          beneficiaryAssistance.urlFileImageOriginal = beneficiaryAssistance.AssistanceScanner?.urlFileImageOriginal;
          beneficiaryAssistance.name = beneficiaryAssistance.Survey?.firstName;
          if (beneficiaryAssistance.Survey.secondName) {
            beneficiaryAssistance.name += ' ';
            beneficiaryAssistance.name += beneficiaryAssistance.Survey?.secondName;
          } else {
            beneficiaryAssistance.secondName = ''
          }
          beneficiaryAssistance.name += ' ';
          beneficiaryAssistance.name += beneficiaryAssistance.Survey?.firstLastName;
          if (beneficiaryAssistance.Survey.secondLastName) {
            beneficiaryAssistance.name += ' ';
            beneficiaryAssistance.name += beneficiaryAssistance.Survey.secondLastName;
          } else {
            beneficiaryAssistance.secondLastName = ''
          }
          beneficiaryAssistance.identification = beneficiaryAssistance.Survey?.identification;
          beneficiaryAssistance.identificationType = beneficiaryAssistance.Survey?.identificationType;
          return beneficiaryAssistance;
        })
        return response;
      })
    )
  }

  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/assistanceScannerBeneficiary/${id}/getById`, {});
  }
}
