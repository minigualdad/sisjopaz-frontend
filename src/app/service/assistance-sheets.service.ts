import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssistanceSheetsService {

  constructor(private _httpClient: HttpClient) { }

  findBySerial(serial: string) {
    return this._httpClient.post(`${environment.apiUrl}/app/assistanceSheets/findBySerail`, {serial}).pipe(
      map((response : any) => {
          response.assistanceSheet = {
            id: response.data.id,
            serial: response.data.serial,
            urlFile: `${environment.apiUrl}/${response.data.AssistanceGenerate.urlFile}`,
            groupName: response.data.AssistanceGenerate.GroupComponent.Group.name,
            componentName: response.data.AssistanceGenerate.GroupComponent.Component.name
        }
        response.assistanceBeneficiaries = response?.assistance.map((item:any) => {
          item.id = item?.id;
          item.assistanceSignDate = item?.assistanceSignDate;
          item.urlFileImageProcessed = `${environment.apiUrl}/${item?.AssistanceScanner?.urlFileImageProcessed}`;
          item.assistanceScannerId = item?.AssistanceScanner?.id;
          item.name = `${item?.Survey?.firstName} ${item.secondName ? item?.Survey?.secondName : ''} ${item?.Survey?.firstLastName} ${item.secondLastName ? item?.Survey?.secondLastName : ''}`;
          item.identification = item?.Survey?.identification;
          item.identificationType = item?.Survey?.identificationType

          return item;
        })
        const data = {
          assistanceSheet: response.assistanceSheet,
          assistanceBeneficiaries: response.assistanceBeneficiaries,
        }

        return data;
      })
    );
  }
}
