import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupScheduleBeneficiaryService {

  constructor(private _httpClient: HttpClient) { }

  // No existe la ruta "/app/groupScheduleBeneficiary/" en Back
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/groupScheduleBeneficiary/getAll`)
      .pipe(
        map((response: any) => {
          response.groupScheduleBeneficiaries = response.groupScheduleBeneficiaries.map((groupScheduleBeneficiary: any) => {
            groupScheduleBeneficiary.date = groupScheduleBeneficiary.GroupSchedule?.date;
            groupScheduleBeneficiary.time = groupScheduleBeneficiary.GroupSchedule?.time;
            return groupScheduleBeneficiary;
          })
          return response;
        })
      )
  }

  getAllByGroupSchedule(groupScheduleId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/groupScheduleBeneficiary/${groupScheduleId}/getAllBySchedule`)
      .pipe(
        map((response: any) => {
          response.groupScheduleBeneficiaries = response.groupScheduleBeneficiaries.map((groupScheduleBeneficiary: any) => {
            groupScheduleBeneficiary.dateSchedule = groupScheduleBeneficiary.GroupSchedule?.date.split('T')[0];
            groupScheduleBeneficiary.timeSchedule = groupScheduleBeneficiary.GroupSchedule?.time;
            groupScheduleBeneficiary.dateTimeAssistanceSplitted = groupScheduleBeneficiary.dateTimeAssistance?.split('T')[0];

            return groupScheduleBeneficiary;
          })
          return response;
        })
      )
  }


  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupScheduleBeneficiary/${id}/getById`, {});
  }

  create(groupScheduleBeneficiary: any, pictureFile: any, signedFile: any) {
    const selectedPictureFile = pictureFile[0] as File;
    const selectedSignedFile = signedFile[0] as File;
    const body = JSON.stringify(groupScheduleBeneficiary)
    const fd = new FormData();
    fd.append('picture', selectedPictureFile, selectedPictureFile.name);
    fd.append('signed', selectedSignedFile, selectedSignedFile.name);
    fd.append('body', body);
    return this._httpClient.post(`${environment.apiUrl}/app/groupScheduleBeneficiary/create`, fd);
  }

  edit(id: number, groupScheduleBeneficiary: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupScheduleBeneficiary/${id}/update`, { groupScheduleBeneficiary });
  }

  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/groupScheduleBeneficiary/${id}/delete`, {});
  }
}
