import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { IndexedDbService } from './indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  connectionStatus = false;
  constructor(private _httpClient: HttpClient,
    private indexedDbService: IndexedDbService) { }

  connectionStatusCheck(){
    if (navigator.onLine) {
      this.connectionStatus = true;
    } else {
      this.connectionStatus = false;
    }
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAll(currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getAll`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            survey.dateSlplitted = survey.date?.split('T')[0];
            survey.name = survey.firstName;
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';
            }
            survey.startProgramDate = survey.createdAt.split('T')[0];
            survey.group = survey.Group?.name;
            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            return survey;
          })
          return response;
        })
      )
  }

  filterByWord(value:string){
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getAllByValue`, {value})
    .pipe(
      map((response: any) => {
        response.surveys = response.surveys.map((survey: any) => {
          survey.dateSlplitted = survey.date?.split('T')[0];
          survey.name = survey.firstName;
          if (survey.secondName) {
            survey.name += ' ';
            survey.name += survey.secondName;
          }
          survey.name += ' ';
          survey.name += survey.firstLastName;
          if (survey.secondLastName) {
            survey.name += ' ';
            survey.name += survey.secondLastName;
          }
          survey.nameOriginal = survey.firstNameOriginal;
          if (survey.secondNameOriginal) {
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.secondNameOriginal;
          } else {
            survey.secondNameOriginal = '';
          }
          survey.nameOriginal += ' ';
          survey.nameOriginal += survey.firstLastNameOriginal;
          if (survey.secondLastNameOriginal) {
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.secondLastNameOriginal;
          } else {
            survey.secondLastNameOriginal = '';
          }
          survey.startProgramDate = survey.createdAt.split('T')[0];
          survey.group = survey.Group?.name;
          if (survey.DNPCheckDate) {
            survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
          } else {
            survey.DNPCheckDate = 'Sin Revisar'
          }
          if (survey.ARNCheckDate) {
            survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
          } else {
            survey.ARNCheckDate = 'Sin Revisar'
          }
          if (survey.DPSCheckDate) {
            survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
          } else {
            survey.DPSCheckDate = 'Sin Revisar'
          }
          if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
            survey.DNPCheck = 'No Validado'
          }
          if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
            survey.DNPCheck = 'Validado'
          } else {
            survey.DNPCheck = 'Sin Revisar'
          }
          if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
            survey.ARNCheck = 'No Validado'
          }
          if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
            survey.ARNCheck = 'Validado'
          } else {
            survey.ARNCheck = 'Sin Revisar'
          }
          if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
            survey.ARNCheck = 'No Validado'
          }
          if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
            survey.DPSCheck = 'Validado'
          } else {
            survey.DPSCheck = 'Sin Revisar'
          }
          return survey;
        })
        return response;
      })
    )
  }

  getAllWithoutGroupByDivipola(currentPage: number, pageSize: number){
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getAllWithoutGroupByDivipola`, {currentPage, pageSize})
    .pipe(
      map((response: any) => {
        response.surveys = response.surveys.surveys.map((survey: any) => {
          survey.dateSlplitted = survey.date?.split('T')[0];
          survey.divipola = survey.Divipola?.name;
          survey.name = survey.firstName;
          if (survey.secondName) {
            survey.name += ' ';
            survey.name += survey.secondName;
          }
          survey.name += ' ';
          survey.name += survey.firstLastName;
          if (survey.secondLastName) {
            survey.name += ' ';
            survey.name += survey.secondLastName;
          }
          survey.nameOriginal = survey.firstNameOriginal;
          if (survey.secondNameOriginal) {
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.secondNameOriginal;
          } else {
            survey.secondNameOriginal = '';
          }
          survey.nameOriginal += ' ';
          survey.nameOriginal += survey.firstLastNameOriginal;
          if (survey.secondLastNameOriginal) {
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.secondLastNameOriginal;
          } else {
            survey.secondLastNameOriginal = '';
          }
          survey.startProgramDate = survey.createdAt.split('T')[0];
          survey.group = survey.Group?.name;
          if (survey.DNPCheckDate) {
            survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
          } else {
            survey.DNPCheckDate = 'Sin Revisar'
          }
          if (survey.ARNCheckDate) {
            survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
          } else {
            survey.ARNCheckDate = 'Sin Revisar'
          }
          if (survey.DPSCheckDate) {
            survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
          } else {
            survey.DPSCheckDate = 'Sin Revisar'
          }
          if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
            survey.DNPCheck = 'No Validado'
          }
          if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
            survey.DNPCheck = 'Validado'
          } else {
            survey.DNPCheck = 'Sin Revisar'
          }
          if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
            survey.ARNCheck = 'No Validado'
          }
          if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
            survey.ARNCheck = 'Validado'
          } else {
            survey.ARNCheck = 'Sin Revisar'
          }
          if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
            survey.ARNCheck = 'No Validado'
          }
          if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
            survey.DPSCheck = 'Validado'
          } else {
            survey.DPSCheck = 'Sin Revisar'
          }
          return survey;
        })
        return response;
      })
    )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.COORDINACION, Roles.ENLACE_REGIONAL])
  getAllWithoutGroup(currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getAllWithoutGroup`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            survey.dateSlplitted = survey.date?.split('T')[0];
            survey.divipola = survey.Divipola?.name;
            survey.name = survey.firstName;
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';
            }
            survey.startProgramDate = survey.createdAt.split('T')[0];
            survey.group = survey.Group?.name;
            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            return survey;
          })
          return response;
        })
      )
  }



  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAllByGroup(id: number, currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/${id}/getAllByGroup`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            survey.dateSlplitted = survey.date?.split('T')[0];
            survey.name = survey.firstName;
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            } else {
              survey.secondName = ''
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            } else {
              survey.secondLastName = ''
            }
            survey.startProgramDate = survey.createdAt.split('T')[0];
            survey.group = survey.Group?.name;
            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            return survey;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.PROFESIONAL_PSICOSOCIAL])
  getAllById(id: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/survey/${id}/getAllById`)
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.map((survey: any) => {
            survey.dateSlplitted = survey.date?.split('T')[0];
            survey.name = survey.firstName;
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            } else {
              survey.secondName = ''
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            } else {
              survey.secondLastName = ''
            }
            survey.startProgramDate = survey.createdAt.split('T')[0];
            survey.group = survey.Group?.name;
            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            return survey;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION])
  getAllByProfessionalTeam(currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getAllByProfessionalTeam`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            survey.dateSlplitted = survey.date?.split('T')[0];
            survey.name = survey.firstName;
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            } else {
              survey.secondName = '';
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            }
            else {
              survey.secondLastName = '';
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';
            }
            survey.startProgramDate = survey.createdAt.split('T')[0];
            survey.group = survey.Group?.name;
            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            return survey;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAllByAccountCert(currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getAllByHasBankAccount`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            survey.dateSlplitted = survey.date?.split('T')[0];
            survey.name = survey.firstName;
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            }
            survey.startProgramDate = survey.createdAt.split('T')[0];
            survey.group = survey.Group?.name;
            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            return survey;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAllNoValidates(currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getNoRegistraduryValidate`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            survey.dateSlplitted = survey.date?.split('T')[0];
            survey.name = survey.firstName;
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            } else {
              survey.secondName = '';
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            } else {
              survey.secondLastName = '';
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';
            }
            if (survey.createdAt) {
              survey.startProgramDate = survey.createdAt?.split('T')[0];
            }
            survey.group = survey.Group?.name;
            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            return survey;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.ENLACE_REGIONAL, Roles.COORDINACION, Roles.PROFESIONAL_EDUCACION, Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_PSICOSOCIAL, Roles.PROFESIONAL_SOCIOJURIDICO])
  getAllNoValidatesByProfessional(currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getNoRegistraduryValidateByProfessional`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            survey.dateSlplitted = survey.date?.split('T')[0];
            survey.name = survey.firstName;
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';
            }
            if (survey.createdAt) {
              survey.startProgramDate = survey.createdAt?.split('T')[0];
            }
            survey.group = survey.Group?.name;
            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            return survey;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAllNoValidatesDocuments() {
    return this._httpClient.get(`${environment.apiUrl}/app/survey/getAllByNoValidatesDocuments`)
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.map((survey: any) => {
            if (!survey.documentIdentificationDate) {
              survey.documentIdentificationDate = 'Sin Verificar'
            }
            if (!survey.documentIdentificationMotive) {
              survey.documentIdentificationMotive = 'Sin Verificar'
            }
            if (!survey.documentIdentificationCheck) {
              survey.documentIdentificationCheck = 'Sin Verificar'
            }
            survey.name = survey.firstName;
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';
            }
            if (survey.createdAt) {
              survey.startProgramDate = survey.createdAt?.split('T')[0];
            }
            survey.group = survey.Group?.name;
            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            return survey;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.APOYO_A_LA_COORDINACION])
  getAllNoValidatesDocumentsBySurvey(id: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/survey/${id}/getAllNoValidatesDocumentsBySurvey`)
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.map((survey: any) => {
            if (!survey.documentIdentificationDate) {
              survey.documentIdentificationDate = 'Sin Verificar'
            }
            if (!survey.documentIdentificationMotive) {
              survey.documentIdentificationMotive = 'Sin Verificar'
            }
            if (!survey.documentIdentificationCheck) {
              survey.documentIdentificationCheck = 'Sin Verificar'
            }
            survey.name = survey.firstName;
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';
            }
            if (survey.createdAt) {
              survey.startProgramDate = survey.createdAt?.split('T')[0];
            }
            survey.group = survey.Group?.name;
            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            return survey;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAllNoValidatesBankCertification(currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getAllByNoValidatesBankCetification`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            if (!survey.accountCertificationDate) {
              survey.accountCertificationDate = 'Sin Verificar'
            }
            if (!survey.accountCertificationMotive) {
              survey.accountCertificationMotive = 'Sin Verificar'
            }
            if (!survey.accountCertificationCheck) {
              survey.accountCertificationCheck = 'Sin Verificar'
            }
            survey.name = survey.firstName;
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';
            }
            if (survey.createdAt) {
              survey.startProgramDate = survey.createdAt?.split('T')[0];
            }
            survey.group = survey.Group?.name;
            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            return survey;
          })
          return response;
        })
      )
  }

  getAllExtemporary(currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getAllExtemporary`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            survey.name = survey.firstName;
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';
            }
            if (survey.createdAt) {
              survey.startProgramDate = survey.createdAt?.split('T')[0];
            }
            survey.divipola = survey.Divipola.name
            return survey;
          })
          return response;
        })
      )
  } 

  getAllRNECValidated(currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getAllRNECValidated`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            survey.name = survey.firstName;
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';
            }
            return survey;
          })
          return response;
        })
      )
  } 

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.APOYO_A_LA_COORDINACION])
  setValidateDocuments(survey: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/setValidateDocuments`, survey);
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.APOYO_A_LA_COORDINACION])
  updateAccountCertification(form: any) {
    const fd = new FormData();
    if (form.frontImage) {
      fd.append('fileFront', form.frontImage, form.frontImage?.name || 'image.png');
      delete (form.frontImage);
    }
    if (form.backImage) {
      fd.append('fileBack', form.backImage, form.backImage?.name || 'image.png');
      delete (form.backImage);
    }
    for (const key in form) {
      fd.append(key, form[key]);
    }
    return this._httpClient.post(`${environment.apiUrl}/app/survey/updateSurveyDocuments`, fd);
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.APOYO_A_LA_COORDINACION])
  updateBankCertification(form: any) {
    const fd = new FormData();
    if (form.accountCertification) {
      fd.append('accountCertification', form.accountCertification, form.accountCertification?.name || 'file.pdf');
      delete form.accountCertification;
    }
    for (const key in form) {
      fd.append(key, form[key]);
    }
    return this._httpClient.post(
      `${environment.apiUrl}/app/survey/updateSurveyDocuments`,
      fd
    );
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.APOYO_A_LA_COORDINACION])
  getDocumentsImage(surveyId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/survey/getDocumentsImage/${surveyId}`);
  }

  // No se usa
  getAccountCertificationImage(id: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/survey/getAccountCertificationImage/${id}`);
  }

  // No se usa
  getByEmail(survey: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getByEmail`, { survey })
  }

  // No se usa
  getByIdentification(survey: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getByIdentification`, { survey })
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.PROFESIONAL_EDUCACION, Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_SOCIOJURIDICO, Roles.PROFESIONAL_PSICOSOCIAL])
  getByIdentificationTypeAndIdentification(survey: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getByIdentificationTypeAndIdentification`, { survey })
  }
  
  // roleVerify([Roles.PROFESIONAL_PSICOSOCIAL, Roles.APOYO_A_LA_COORDINACION])
  getByIdentificationTypeAndIdentificationAndRegion(survey: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getByIdentificationTypeAndIdentificationAndRegion`, { survey })
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION, Roles.COORDINACION, Roles.ENLACE_REGIONAL, Roles.APOYO_A_LA_COORDINACION, Roles.PROFESIONAL_PSICOSOCIAL])
  show(id: number) {
    this.connectionStatusCheck();
    if(this.connectionStatus){
      return this._httpClient.post(`${environment.apiUrl}/app/survey/${id}/getById`, {});
    } else {
      return from(this.indexedDbService.findPendingAgreementById(id)).pipe(
        switchMap((aggrement: any) => {
          if(aggrement){
            const objetct = { survey: []};
            objetct.survey = aggrement
            return of(objetct);
          } else {
            const objetct = { survey: []};
            return of(objetct);
          }
        })
      )
    }
  }

  // No existe en Back y no se usa
  create(survey: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/create`, { survey });
  }

  // No se usa
  edit(id: number, survey: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/${id}/update`, { survey });
  }

  editRNECData(id: number, survey: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/${id}/updateDataRNEC`, { survey });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  groupAssignation(survey: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/groupAssignation`, { survey });
  }

  groupUpdate(survey: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/groupUpdate`, { survey });
  }

  // No existe en Back
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/${id}/delete`, {});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  uploadDNPExcel(file: File) {
    const selectedFile = file;
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this._httpClient.post(environment.apiUrl + '/app/survey/uploadDNPExcel', fd, { responseType: 'blob' });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  uploadDPSExcel(file: File) {
    const selectedFile = file;
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this._httpClient.post(environment.apiUrl + '/app/survey/uploadDPSExcel', fd, { responseType: 'blob' });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  uploadARNExcel(file: File) {
    const selectedFile = file;
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this._httpClient.post(environment.apiUrl + '/app/survey/uploadARNExcel', fd, { responseType: 'blob' });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  uploadUpdateExcel(file: File) {
    const selectedFile = file;
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this._httpClient.post(environment.apiUrl + '/app/survey/uploadUpdateExcel', fd, { responseType: 'blob' });
  }

  uploadUpdateExcelById(file: File) {
    const selectedFile = file;
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this._httpClient.post(environment.apiUrl + '/app/survey/uploadUpdateExcelById', fd, { responseType: 'blob' });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  donwloadUpdateTemplateExcel() {
    return this._httpClient.post(environment.apiUrl + '/app/survey/uploadUpdateExcel', {}, { responseType: 'blob' });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  uploadGroupAssignation(file: File) {
    const selectedFile = file;
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this._httpClient.post(environment.apiUrl + '/app/survey/uploadMassiveGroup', fd, { responseType: 'blob' });
  }

  uploadGroupUpdate(file: File) {
    const selectedFile = file;
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this._httpClient.post(environment.apiUrl + '/app/survey/uploadMassiveUpdateGroup', fd, { responseType: 'blob' });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  uploadAccountCertificationLoaded(file: File) {
    const selectedFile = file;
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this._httpClient.post(environment.apiUrl + '/app/survey/uploadBankAccountPending', fd,  { responseType: 'blob' });
  }

  // No existe en Back
  uploadCorresponsabilityAgreementxcel(file: File) {
    const selectedFile = file;
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this._httpClient.post(environment.apiUrl + '/app/survey/uploadCorresponsabilityAgreementxcel', fd, { responseType: 'blob' });
  }

  // No se usa y no existe en Back
  uploadAcountCertificationExcel(file: File) {
    const selectedFile = file;
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this._httpClient.post(environment.apiUrl + '/app/survey/uploadAcountCertificationExcel', fd, { responseType: 'blob' });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  uploadValidateExcel(file: File) {
    const selectedFile = file;
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    return this._httpClient.post(environment.apiUrl + '/app/survey/uploadValidateExcel', fd, { responseType: 'blob' });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  downloadValidateExcel() {
    return this._httpClient.get(environment.apiUrl + '/app/survey/downloadValidateExcel', {
      responseType: 'blob'
    });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  downloadCoresponsabilityAgreement() {
    return this._httpClient.get(environment.apiUrl + '/app/survey/downloadCoresponsabilityAgreement', {
      responseType: 'blob'
    });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  downloadAccountCertificationLoaded() {
    return this._httpClient.get(environment.apiUrl + '/app/survey/downloadBankAccountPending', {
      responseType: 'blob'
    });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  downloadSiifReport() {
    return this._httpClient.get(environment.apiUrl + '/app/survey/downloadSIFFReport', {
      responseType: 'blob'
    });
  }

  // No se usa
  downloadPendingAccountData() {
    return this._httpClient.get(environment.apiUrl + '/app/survey/downloadAccountCertificationLoaded', {
      responseType: 'blob'
    });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  downloadDNP() {
    return this._httpClient.get(environment.apiUrl + '/app/survey/downloadDNP', {
      responseType: 'blob'
    });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  downloadDPS() {
    return this._httpClient.get(environment.apiUrl + '/app/survey/downloadDPS', {
      responseType: 'blob'
    });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  downloadARN() {
    return this._httpClient.get(environment.apiUrl + '/app/survey/downloadARN', {
      responseType: 'blob'
    });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION])
  downloadWithoutGroup() {
    return this._httpClient.get(environment.apiUrl + '/app/survey/downloadWithoutGroup', {
      responseType: 'blob'
    });
  }

  downloadPendingGroupByDivipola() {
    return this._httpClient.get(environment.apiUrl + '/app/survey/downloadWithoutGroupByDivipola', {
      responseType: 'blob'
    });
  }

  downloadTemplateGroup() {
    return this._httpClient.get(environment.apiUrl + '/app/survey/downloadGroupTemplate', {
      responseType: 'blob'
    });
  }

  downloadExtemporary() {
    return this._httpClient.get(environment.apiUrl + '/app/survey/downloadExtemporary', {
      responseType: 'blob'
    });
  }

  downloadRNECValidated() {
    return this._httpClient.get(environment.apiUrl + '/app/survey/downloadRNECValidated', {
      responseType: 'blob'
    });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION, Roles.APOYO_A_LA_COORDINACION, Roles.GESTORES_SOCIALES, Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_EDUCACION, Roles.PROFESIONAL_SOCIOJURIDICO, Roles.PROFESIONAL_PSICOSOCIAL])
  getAllByAccepted() {
    this.connectionStatusCheck();
    if(this.connectionStatus){
      return this._httpClient.get(`${environment.apiUrl}/app/survey/getAllByAccepted`)
        .pipe(
          map((response: any) => {
            response.beneficiaries = response.beneficiaries.map((survey: any) => this.transformSurvey(survey));
            return response;
          })
        );
    } else {
      return from(this.indexedDbService.getAllPendingAgreement()).pipe(
        switchMap((pendingAgreement: any[]) => {
          if (pendingAgreement && pendingAgreement.length > 0) {
            const transformedSurveys = pendingAgreement.map((survey: any) => this.transformSurvey(survey));
            const result = { beneficiaries: transformedSurveys };
            return of(result);
          } else {
            const fallbackResponse = { beneficiaries: [] };
            return of(fallbackResponse);
          }
        })
      );
    }
  }
//RUTA NUEVA
  getAllByAcceptedPaginated(currentPage: number, pageSize: number) {
    this.connectionStatusCheck();
    if(this.connectionStatus){
      return this._httpClient.post(`${environment.apiUrl}/app/survey/getAllByAcceptedPaginated`, {currentPage, pageSize})
        .pipe(
          map((response: any) => {
            response.surveys = response.surveys.surveys.map((survey: any) => this.transformSurvey(survey));
            return response;
          })
        );
    } else {
      return from(this.indexedDbService.getAllPendingAgreement()).pipe(
        switchMap((pendingAgreement: any[]) => {
          if (pendingAgreement && pendingAgreement.length > 0) {
            const transformedSurveys = pendingAgreement.map((survey: any) => this.transformSurvey(survey));
            const result = { beneficiaries: transformedSurveys };
            return of(result);
          } else {
            const fallbackResponse = { beneficiaries: [] };
            return of(fallbackResponse);
          }
        })
      );
    }
  }

  private transformSurvey(survey: any): any {
    survey.updatedDate = survey.updatedAt.split('T')[0];
    survey.secondName = survey.secondName || '';
    survey.name = `${survey.firstName} ${survey.secondName} ${survey.firstLastName} ${survey.secondLastName || ''}`;
    survey.stateAgreement = survey.state;
    survey.identification = survey.identification;
    survey.identificationType = survey.identificationType;
    survey.email = survey.email;
    survey.group = survey.Group?.name || '';
    return survey;
  }

  // No se usa
  getAllByRejected(professionalTeamId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/survey/${professionalTeamId}/getAllByRejected`)
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.map((survey: any) => {
            survey.updatedDate = survey.updatedAt.split('T')[0];

            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            }

            survey.name = survey?.firstName + ' ' + survey.secondName + ' ' + survey?.firstLastName + ' ' + survey.secondLastName;
            survey.stateAgreement = survey?.state;
            survey.identification = survey?.identification;
            survey.identificationType = survey?.identificationType;
            survey.email = survey?.email;
            survey.group = survey.Group?.name;
            return survey;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION])
  getAllByRejectedDNP(currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getAllRejectedDNP`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            survey.updatedDate = survey.updatedAt.split('T')[0];

            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            }else {
              survey.secondName = '';
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            } else {
              survey.secondLastName = '';
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';

            }
            survey.nameOriginal = survey?.firstNameOriginal + ' ' + survey.secondNameOriginal + ' ' + survey?.firstLastNameOriginal + ' ' + survey.secondLastNameOriginal;
            survey.name = survey?.firstName + ' ' + survey.secondName + ' ' + survey?.firstLastName + ' ' + survey.secondLastName;
            survey.stateAgreement = survey?.state;
            survey.identification = survey?.identification;
            survey.identificationType = survey?.identificationType;
            survey.email = survey?.email;
            survey.group = survey.Group?.name;
            return survey;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION])
  getAllByRejectedARN(currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getAllRejectedARN`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            survey.updatedDate = survey.updatedAt.split('T')[0];
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            } else {
              survey.secondName = '';
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            } else {
              survey.secondLastName = '';
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';

            }
            survey.nameOriginal = survey?.firstNameOriginal + ' ' + survey.secondNameOriginal + ' ' + survey?.firstLastNameOriginal + ' ' + survey.secondLastNameOriginal;
            survey.name = survey?.firstName + ' ' + survey.secondName + ' ' + survey?.firstLastName + ' ' + survey.secondLastName;
            survey.stateAgreement = survey?.state;
            survey.identification = survey?.identification;
            survey.identificationType = survey?.identificationType;
            survey.email = survey?.email;
            survey.group = survey.Group?.name;
            return survey;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION])
  getAllByRejectedDPS(currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getAllRejectedDPS`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            survey.updatedDate = survey.updatedAt.split('T')[0];
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            } else {
              survey.secondName = '';
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            } else {
              survey.secondLastName = '';
            }            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';

            }
            survey.nameOriginal = survey?.firstNameOriginal + ' ' + survey.secondNameOriginal + ' ' + survey?.firstLastNameOriginal + ' ' + survey.secondLastNameOriginal;
            survey.name = survey?.firstName + ' ' + survey.secondName + ' ' + survey?.firstLastName + ' ' + survey.secondLastName;
            survey.stateAgreement = survey?.state;
            survey.identification = survey?.identification;
            survey.identificationType = survey?.identificationType;
            survey.email = survey?.email;
            survey.group = survey.Group?.name;
            return survey;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION])
  getAllByPendingDNP(currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getAllPendingDNP`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            survey.updatedDate = survey.updatedAt.split('T')[0];
            if (!survey.createdAt) {
              survey.createdAt = 'Sin Fecha Para Mostrar'
            } else {
              survey.createdAt = survey.createdAt.split('T')[0];
            }
            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            } else {
              survey.secondName = '';
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            } else {
              survey.secondLastName = '';
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';

            }
            survey.nameOriginal = survey?.firstNameOriginal + ' ' + survey.secondNameOriginal + ' ' + survey?.firstLastNameOriginal + ' ' + survey.secondLastNameOriginal;
            survey.name = survey?.firstName + ' ' + survey.secondName + ' ' + survey?.firstLastName + ' ' + survey.secondLastName;
            survey.stateAgreement = survey?.state;
            survey.identification = survey?.identification;
            survey.identificationType = survey?.identificationType;
            survey.email = survey?.email;
            survey.group = survey.Group?.name;
            return survey;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION])
  getAllByPendingARN(currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getAllPendingARN`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            survey.updatedDate = survey.updatedAt.split('T')[0];
            if (survey.bornDate) {
              survey.bornDate = survey.bornDate.split('T')[0];
            }
            if (!survey.createdAt) {
              survey.createdAt = 'Sin Fecha Para Mostrar'
            } else {
              survey.createdAt = survey.createdAt.split('T')[0];
            }

            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            } else {
              survey.secondName = '';
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            } else {
              survey.secondLastName = '';
            }

            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';

            }
            survey.nameOriginal = survey?.firstNameOriginal + ' ' + survey.secondNameOriginal + ' ' + survey?.firstLastNameOriginal + ' ' + survey.secondLastNameOriginal;
            survey.name = survey?.firstName + ' ' + survey.secondName + ' ' + survey?.firstLastName + ' ' + survey.secondLastName;
            survey.stateAgreement = survey?.state;
            survey.identification = survey?.identification;
            survey.identificationType = survey?.identificationType;
            survey.email = survey?.email;
            survey.group = survey.Group?.name;
            return survey;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION])
  getAllByPendingDPS(currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getAllPendingDPS`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            survey.updatedDate = survey.updatedAt.split('T')[0];
            if (!survey.createdAt) {
              survey.createdAt = 'Sin Fecha Para Mostrar'
            } else {
              survey.createdAt = survey.createdAt.split('T')[0];
            }
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            } else {
              survey.secondName = '';
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            } else {
              survey.secondLastName = '';
            }
            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';

            }
            survey.nameOriginal = survey?.firstNameOriginal + ' ' + survey.secondNameOriginal + ' ' + survey?.firstLastNameOriginal + ' ' + survey.secondLastNameOriginal;
            survey.name = survey?.firstName + ' ' + survey.secondName + ' ' + survey?.firstLastName + ' ' + survey.secondLastName;
            survey.stateAgreement = survey?.state;
            survey.identification = survey?.identification;
            survey.identificationType = survey?.identificationType;
            survey.email = survey?.email;
            survey.group = survey.Group?.name;
            return survey;
          })
          return response;
        })
      )
  }

  // No se usa
  getAllByPendingDPSRegion() {
    return this._httpClient.get(`${environment.apiUrl}/app/survey/getAllpendingDPSRegion`)
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.map((survey: any) => {
            survey.updatedDate = survey.updatedAt.split('T')[0];
            if (!survey.createdAt) {
              survey.createdAt = 'Sin Fecha Para Mostrar'
            } else {
              survey.createdAt = survey.createdAt.split('T')[0];
            }
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            } else {
              survey.secondName = '';
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            } else {
              survey.secondLastName = '';
            }
            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';

            }
            survey.nameOriginal = survey?.firstNameOriginal + ' ' + survey.secondNameOriginal + ' ' + survey?.firstLastNameOriginal + ' ' + survey.secondLastNameOriginal;
            survey.name = survey?.firstName + ' ' + survey.secondName + ' ' + survey?.firstLastName + ' ' + survey.secondLastName;
            survey.stateAgreement = survey?.state;
            survey.identification = survey?.identification;
            survey.identificationType = survey?.identificationType;
            survey.email = survey?.email;
            survey.group = survey.Group?.name;
            return survey;
          })
          return response;
        })
      )
  }

  // No se usa
  getAllByPendingDNPRegion() {
    return this._httpClient.get(`${environment.apiUrl}/app/survey/getAllpendingDNPRegion`)
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.map((survey: any) => {
            survey.updatedDate = survey.updatedAt.split('T')[0];
            if (!survey.createdAt) {
              survey.createdAt = 'Sin Fecha Para Mostrar'
            } else {
              survey.createdAt = survey.createdAt.split('T')[0];
            }
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            } else {
              survey.secondName = '';
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            } else {
              survey.secondLastName = '';
            }
            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';

            }
            survey.nameOriginal = survey?.firstNameOriginal + ' ' + survey.secondNameOriginal + ' ' + survey?.firstLastNameOriginal + ' ' + survey.secondLastNameOriginal;
            survey.name = survey?.firstName + ' ' + survey.secondName + ' ' + survey?.firstLastName + ' ' + survey.secondLastName;
            survey.stateAgreement = survey?.state;
            survey.identification = survey?.identification;
            survey.identificationType = survey?.identificationType;
            survey.email = survey?.email;
            survey.group = survey.Group?.name;
            return survey;
          })
          return response;
        })
      )
  }

  // No se usa
  getAllByPendingARNRegion() {
    return this._httpClient.get(`${environment.apiUrl}/app/survey/getAllpendingARNRegion`)
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.map((survey: any) => {
            survey.updatedDate = survey.updatedAt.split('T')[0];
            if (!survey.createdAt) {
              survey.createdAt = 'Sin Fecha Para Mostrar'
            } else {
              survey.createdAt = survey.createdAt.split('T')[0];
            }
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            } else {
              survey.secondName = '';
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            } else {
              survey.secondLastName = '';
            }
            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';

            }
            survey.nameOriginal = survey?.firstNameOriginal + ' ' + survey.secondNameOriginal + ' ' + survey?.firstLastNameOriginal + ' ' + survey.secondLastNameOriginal;
            survey.name = survey?.firstName + ' ' + survey.secondName + ' ' + survey?.firstLastName + ' ' + survey.secondLastName;
            survey.stateAgreement = survey?.state;
            survey.identification = survey?.identification;
            survey.identificationType = survey?.identificationType;
            survey.email = survey?.email;
            survey.group = survey.Group?.name;
            return survey;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAllByPendingDPSGeneral(currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getAllpendingDPSGeneral`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            survey.updatedDate = survey.updatedAt.split('T')[0];
            if (!survey.createdAt) {
              survey.createdAt = 'Sin Fecha Para Mostrar'
            } else {
              survey.createdAt = survey.createdAt.split('T')[0];
            }
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            } else {
              survey.secondName = '';
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            } else {
              survey.secondLastName = '';
            }
            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';

            }
            survey.nameOriginal = survey?.firstNameOriginal + ' ' + survey.secondNameOriginal + ' ' + survey?.firstLastNameOriginal + ' ' + survey.secondLastNameOriginal;
            survey.name = survey?.firstName + ' ' + survey.secondName + ' ' + survey?.firstLastName + ' ' + survey.secondLastName;
            survey.stateAgreement = survey?.state;
            survey.identification = survey?.identification;
            survey.identificationType = survey?.identificationType;
            survey.email = survey?.email;
            survey.group = survey.Group?.name;
            return survey;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAllByPendingDNPGeneral(currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getAllpendingDNPGeneral`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            survey.updatedDate = survey.updatedAt.split('T')[0];
            if (!survey.createdAt) {
              survey.createdAt = 'Sin Fecha Para Mostrar'
            } else {
              survey.createdAt = survey.createdAt.split('T')[0];
            }
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            } else {
              survey.secondName = '';
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            } else {
              survey.secondLastName = '';
            }
            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';

            }
            survey.nameOriginal = survey?.firstNameOriginal + ' ' + survey.secondNameOriginal + ' ' + survey?.firstLastNameOriginal + ' ' + survey.secondLastNameOriginal;
            survey.name = survey?.firstName + ' ' + survey.secondName + ' ' + survey?.firstLastName + ' ' + survey.secondLastName;
            survey.stateAgreement = survey?.state;
            survey.identification = survey?.identification;
            survey.identificationType = survey?.identificationType;
            survey.email = survey?.email;
            survey.group = survey.Group?.name;
            return survey;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN])
  getAllByPendingARNGeneral(currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getAllpendingARNGeneral`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            survey.updatedDate = survey.updatedAt.split('T')[0];
            if (!survey.createdAt) {
              survey.createdAt = 'Sin Fecha Para Mostrar'
            } else {
              survey.createdAt = survey.createdAt.split('T')[0];
            }
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            } else {
              survey.secondName = '';
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            } else {
              survey.secondLastName = '';
            }
            if (survey.DNPCheckDate) {
              survey.DNPCheckDate = survey.DNPCheckDate.split('T')[0];
            } else {
              survey.DNPCheckDate = 'Sin Revisar'
            }
            if (survey.ARNCheckDate) {
              survey.ARNCheckDate = survey.ARNCheckDate.split('T')[0];
            } else {
              survey.ARNCheckDate = 'Sin Revisar'
            }
            if (survey.DPSCheckDate) {
              survey.DPSCheckDate = survey.DPSCheckDate.split('T')[0];
            } else {
              survey.DPSCheckDate = 'Sin Revisar'
            }
            if (survey.DNPCheck === 'no' && survey.DNPCheckDate) {
              survey.DNPCheck = 'No Validado'
            }
            if (survey.DNPCheck === 'si' && survey.DNPCheckDate) {
              survey.DNPCheck = 'Validado'
            } else {
              survey.DNPCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.ARNCheck === 'si' && survey.ARNCheckDate) {
              survey.ARNCheck = 'Validado'
            } else {
              survey.ARNCheck = 'Sin Revisar'
            }
            if (survey.ARNCheck === 'no' && survey.ARNCheckDate) {
              survey.ARNCheck = 'No Validado'
            }
            if (survey.DPSCheck === 'si' && survey.DPSCheckDate) {
              survey.DPSCheck = 'Validado'
            } else {
              survey.DPSCheck = 'Sin Revisar'
            }
            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';

            }
            survey.nameOriginal = survey?.firstNameOriginal + ' ' + survey.secondNameOriginal + ' ' + survey?.firstLastNameOriginal + ' ' + survey.secondLastNameOriginal;
            survey.name = survey?.firstName + ' ' + survey.secondName + ' ' + survey?.firstLastName + ' ' + survey.secondLastName;
            survey.stateAgreement = survey?.state;
            survey.identification = survey?.identification;
            survey.identificationType = survey?.identificationType;
            survey.email = survey?.email;
            survey.group = survey.Group?.name;
            return survey;
          })
          return response;
        })
      )
  }

  // No se usa
  getAllByRejectedDPSRegion() {
    return this._httpClient.get(`${environment.apiUrl}/app/survey/getAllRejectedDPSRegion`)
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.map((survey: any) => {
            survey.updatedDate = survey.updatedAt.split('T')[0];
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            } else {
              survey.secondName = '';
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            } else {
              survey.secondLastName = '';
            }            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';

            }
            survey.nameOriginal = survey?.firstNameOriginal + ' ' + survey.secondNameOriginal + ' ' + survey?.firstLastNameOriginal + ' ' + survey.secondLastNameOriginal;
            survey.name = survey?.firstName + ' ' + survey.secondName + ' ' + survey?.firstLastName + ' ' + survey.secondLastName;
            survey.stateAgreement = survey?.state;
            survey.identification = survey?.identification;
            survey.identificationType = survey?.identificationType;
            survey.email = survey?.email;
            survey.group = survey.Group?.name;
            return survey;
          })
          return response;
        })
      )
  }

  // No se usa
  getAllByRejectedDNPRegion() {
    return this._httpClient.get(`${environment.apiUrl}/app/survey/getAllRejectedDNPRegion`)
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.map((survey: any) => {
            survey.updatedDate = survey.updatedAt.split('T')[0];
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            } else {
              survey.secondName = '';
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            } else {
              survey.secondLastName = '';
            }            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';

            }
            survey.nameOriginal = survey?.firstNameOriginal + ' ' + survey.secondNameOriginal + ' ' + survey?.firstLastNameOriginal + ' ' + survey.secondLastNameOriginal;
            survey.name = survey?.firstName + ' ' + survey.secondName + ' ' + survey?.firstLastName + ' ' + survey.secondLastName;
            survey.stateAgreement = survey?.state;
            survey.identification = survey?.identification;
            survey.identificationType = survey?.identificationType;
            survey.email = survey?.email;
            survey.group = survey.Group?.name;
            return survey;
          })
          return response;
        })
      )
  }

  // No se usa
  getAllByRejectedARNRegion() {
    return this._httpClient.get(`${environment.apiUrl}/app/survey/getAllRejectedARNRegion`)
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.map((survey: any) => {
            survey.updatedDate = survey.updatedAt.split('T')[0];
            if (survey.secondName) {
              survey.name += ' ';
              survey.name += survey.secondName;
            } else {
              survey.secondName = '';
            }
            survey.name += ' ';
            survey.name += survey.firstLastName;
            if (survey.secondLastName) {
              survey.name += ' ';
              survey.name += survey.secondLastName;
            } else {
              survey.secondLastName = '';
            }            survey.nameOriginal = survey.firstNameOriginal;
            if (survey.secondNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondNameOriginal;
            } else {
              survey.secondNameOriginal = '';
            }
            survey.nameOriginal += ' ';
            survey.nameOriginal += survey.firstLastNameOriginal;
            if (survey.secondLastNameOriginal) {
              survey.nameOriginal += ' ';
              survey.nameOriginal += survey.secondLastNameOriginal;
            } else {
              survey.secondLastNameOriginal = '';

            }
            survey.nameOriginal = survey?.firstNameOriginal + ' ' + survey.secondNameOriginal + ' ' + survey?.firstLastNameOriginal + ' ' + survey.secondLastNameOriginal;
            survey.name = survey?.firstName + ' ' + survey.secondName + ' ' + survey?.firstLastName + ' ' + survey.secondLastName;
            survey.stateAgreement = survey?.state;
            survey.identification = survey?.identification;
            survey.identificationType = survey?.identificationType;
            survey.email = survey?.email;
            survey.group = survey.Group?.name;
            return survey;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION])
  getAllByProfessionalTeamAndAccountCertRejectedOrPending(currentPage: number, pageSize: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/getAllByBankingCertificationRejectedOrPending`, {currentPage, pageSize})
      .pipe(
        map((response: any) => {
          response.surveys = response.surveys.surveys.map((survey: any) => {
            survey.updatedDate = survey.updatedAt.split('T')[0];
            survey.name = survey?.firstName + ' ' + survey.secondName + ' ' + survey?.firstLastName + ' ' + survey.secondLastName;
            survey.stateAgreement = survey?.state;
            survey.identification = survey?.identification;
            survey.identificationType = survey?.identificationType;
            survey.email = survey?.email;
            survey.group = survey.Group?.name;
            return survey;
          })
          return response;
        })
      )
  }

  // roleVerify(RoleGroups.ALL)
  pdfAssistanceTemplate(data: any): Observable<Blob> {
    return this._httpClient.post(environment.apiUrl + '/app/survey/pdfAssistanceTemplate', { data }, { responseType: 'blob' });
  }

  assistanceBenficiaries(data: any): Observable<Blob> {
    return this._httpClient.post(environment.apiUrl + '/app/groupComponentDateActivityBeneficiary/downloadGroupAssistantByPeriod', { data }, { responseType: 'blob' });
  }

  updateBankData(id: number, survey: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/${id}/updateBankData`, { survey });
  }

  downloadYounger(id: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/survey/${id}/downloadAllByGroup`, {
      responseType: 'blob'
    });
  }
  
  //Cambiar la ruta
  downloadAssistanceBeneficiaries(id: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/survey/${id}/downloadAssistanceBeneficiariesByGroup`, {
      responseType: 'blob'
    });
  }

  downloadSurveys() {
    return this._httpClient.get(environment.apiUrl + '/app/survey/downloadAllBeneficiaries', {
      responseType: 'blob'
    });
  }
}
