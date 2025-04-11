import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssistanceScannerService {

  constructor(private _httpClient: HttpClient) { }

  // roleVerify([Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_PSICOSOCIAL, Roles.PROFESIONAL_EDUCACION, Roles.PROFESIONAL_SOCIOJURIDICO, Roles.ENLACE_REGIONAL, Roles.COORDINACION, Roles.DIRECCION, Roles.ADMIN, Roles.GESTORES_SOCIALES])
  uploadFile(file: File) {
    const selectedFile = file;
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this._httpClient.post(environment.apiUrl + '/app/assistanceScanner/uploadFile', fd)
    .pipe(
          map((response: any) => {
            response.response.assistanceScannerBeneficiaries = response.response.assistanceScannerBeneficiaries.map((assistanceScannerBeneficiary: any) => {
              assistanceScannerBeneficiary.firstName = assistanceScannerBeneficiary.Survey?.firstName
              assistanceScannerBeneficiary.secondName = assistanceScannerBeneficiary.Survey?.secondName
              assistanceScannerBeneficiary.firstLastName = assistanceScannerBeneficiary.Survey?.firstLastName
              assistanceScannerBeneficiary.secondLastName = assistanceScannerBeneficiary.Survey?.secondLastName
              assistanceScannerBeneficiary.identificationType = assistanceScannerBeneficiary.Survey?.identificationType
              assistanceScannerBeneficiary.identification = assistanceScannerBeneficiary.Survey?.identification
              return assistanceScannerBeneficiary;
            })
            return response
          })
        )
  }

  sendReportError(observation: string, scannerId:number){
    return this._httpClient.post(`${environment.apiUrl}/app/assistanceScanner/mistakeError`, {observation, scannerId})
  }

  getAllMistakeError(){
    return this._httpClient.get(`${environment.apiUrl}/app/assistanceScanner/getAllBymistakeError`).pipe(
      map((response: any) => {

        if (!response?.assistanceScanner || !Array.isArray(response.assistanceScanner)) {
          return [];
        }

        return response.assistanceScanner.map((item: any) => {
          const data = item;
          
          const processedItem = {
            ...item,
            urlFileImageProcessed: data?.urlFileImageProcessed ?? 'Sin Procesar',
            state: data?.state,
            observation: data?.observation ?? 'Sin Observación',
            year: data?.AssistanceSheet?.AssistanceGenerate?.year,
            month: data?.AssistanceSheet?.AssistanceGenerate?.month,
            group: data?.AssistanceSheet.AssistanceGenerate?.GroupComponent.Group.name,
            component: data?.AssistanceSheet.AssistanceGenerate?.GroupComponent.Component.name,
            updateBy: data?.updatedBy,
            assistanceSignDate: data?.assistanceSignDate
          };
  
          return processedItem;
        });
      })
    );
  }

  getAllByUser(groupId: any){
    return this._httpClient.post(`${environment.apiUrl}/app/assistanceScanner/getAllByGroup`, {groupId})
    .pipe(
      map((response: any) => {
        response.assistanceScanners = response.assistanceScanners.map((assistanceScanner: any) => {
          const yearMonth = `${assistanceScanner?.AssistanceSheet?.AssistanceGenerate?.year}-${assistanceScanner?.AssistanceSheet?.AssistanceGenerate?.month}`
          assistanceScanner.group = assistanceScanner.AssistanceSheet?.AssistanceGenerate?.GroupComponent?.Group?.name;
          assistanceScanner.divipola = assistanceScanner.AssistanceSheet?.AssistanceGenerate?.GroupComponent?.Group?.Divipola?.name;
          assistanceScanner.department = assistanceScanner.AssistanceSheet?.AssistanceGenerate?.GroupComponent?.Group?.Divipola?.ListDepartment?.name;
          assistanceScanner.component = assistanceScanner.AssistanceSheet?.AssistanceGenerate?.GroupComponent?.Component?.name;
          assistanceScanner.starDay = `${yearMonth}-${assistanceScanner?.AssistanceSheet?.startDay}`;
          assistanceScanner.endDay = `${yearMonth}-${assistanceScanner?.AssistanceSheet?.endDay}`;
          assistanceScanner.date = assistanceScanner.createdAt.split('T')[0];

          return assistanceScanner;
        })
        return response
      })
    )
  }

  getAllMistakeErrorById(id: number){
    return this._httpClient.get(`${environment.apiUrl}/app/assistanceScanner/${id}/show`)
  }

  sendFixError(assistanceScannerBeneficiaryId:number, assistance:string | null, observation:string, dateActivity: Date){
    return this._httpClient.post(`${environment.apiUrl}/app/assistanceScanner/fixMistakeError`, {assistanceScannerBeneficiaryId, assistance, observation, dateActivity})
  }
}
