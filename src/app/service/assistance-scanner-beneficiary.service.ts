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

  deletedAssistance(assistanceScannerBeneficiaryId:Number){
    return this._httpClient.post(`${environment.apiUrl}/app/assistanceScannerBeneficiary/deleteById`, {assistanceScannerBeneficiaryId});
  }

  showByUserIdAndDate(data: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/assistanceScannerBeneficiary/getByUserIdAndDate`, {data});
  }

  downloadAssistanceByScanner(id: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/assistanceScannerBeneficiary/${id}/downloadAssistanceByScanner`, { responseType: 'blob' });
  }

  
  getAllByAssistanceSheetsId(assistanceSheetId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/assistanceScannerBeneficiary/${assistanceSheetId}/getAllByAssistanceScanner`).pipe(
      map((response: any) => {
        if (response.ok && response.surveys) {
          // Procesamos cada survey
          return response.surveys.map((survey: any) => ({
            id: survey.id,
            identificationType: survey.Survey.identificationType,
            identification: survey.Survey.identification,
            assistanceSignDate: survey.assistanceSignDate,
            firstName: survey.Survey.firstName,
            secondName: survey.Survey.secondName,
            firstLastName: survey.Survey.firstLastName,
            secondLastName: survey.Survey.secondLastName,
            recordType: survey.recordType,
            // También puedes incluir otros campos si los necesitas
            state: survey.state,
            userId: survey.userId
          }));
        }
        return [];
      })
    );
  }

  fixMistakeError( assistanceScannerId:number, surveyId:number, assistance:string, observation:string, dateActivity:Date){
    return this._httpClient.post(`${environment.apiUrl}/app/assistanceScannerBeneficiary/fixMistakeError`, { assistanceScannerId, surveyId, assistance, observation, dateActivity});
  }

  findByAssistanceScannerId(assistanceScannerId:number){
    return this._httpClient.post(`${environment.apiUrl}/app/assistanceScannerBeneficiary/findByAssistanceScannerId `, {assistanceScannerId}).pipe(
      map((response:any) =>{
        const assistanceScanner = response.assistanceScanner;
        const assistanceBeneficiariesList = response.assistanceBeneficiaries.map((survey: any) => ({
          id: survey.Survey.id,
          firstName: survey.Survey.firstName,
          secondName: survey.Survey.secondName,
          firstLastName: survey.Survey.firstLastName,
          secondLastName: survey.Survey.secondLastName,
          identificationType: survey.Survey.identificationType,
          identification: survey.Survey.identification,
        }));
        const assistanceBeneficiaries = response.assistanceScannerBeneficiaries.map((survey: any) => ({
          id: survey.id,
          identificationType: survey.Survey.identificationType,
          identification: survey.Survey.identification,
          assistanceSignDate: survey.assistanceSignDate,
          firstName: survey.Survey.firstName,
          secondName: survey.Survey.secondName,
          firstLastName: survey.Survey.firstLastName,
          secondLastName: survey.Survey.secondLastName,
          recordType: survey.recordType,
          groupComponentId: survey.AssistanceScanner?.AssistanceSheet?.AssistanceGenerate?.groupComponentId,
          // También puedes incluir otros campos si los necesitas
          state: survey.state,
          userId: survey.userId,
          urlData: survey.AssistanceScanner
        }));
        const assistanceDateStart = response.assistanceDateStart;
        const assistanceDateEnd = response.assistanceDateEnd; 
        return {
          assistanceScanner,
          assistanceBeneficiaries,
          assistanceBeneficiariesList,
          assistanceDateStart,
          assistanceDateEnd,
        };
      })
    );
  }

  getByUserAndDate(userId:number, dateActivity: Date){
    return this._httpClient.post(`${environment.apiUrl}/app/assistanceScannerBeneficiary/findByUserAndDate`, { userId, dateActivity }).pipe(
      map((response:any) => {
        return response.assistanceScannerBeneficiaries = response.surveys.map((item:any) => ({
          id: item.id,
          urlFileImageProcessed : `${environment.apiUrl}/${item?.AssistanceScanner?.urlFileImageProcessed}`,
          urlFileImageOriginal : `${environment.apiUrl}/${item?.AssistanceScanner?.urlFileImageOriginal}`,
        }))
      })
    );
  }
}
