import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {

  constructor(private _httpClient: HttpClient) { }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  getAll() {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/getAll`)
      .pipe(
        map((response: any) => {
          response.beneficiaries = response.beneficiaries.map((beneficiary: any) => {
            beneficiary.professionalTeam = beneficiary.ProfessionalTeam?.name;
            beneficiary.startProgramDate = beneficiary?.createdAt.split('T')[0];
            beneficiary.identification = beneficiary?.identification;
            beneficiary.email = beneficiary?.email;
            beneficiary.group = beneficiary?.Group?.name;
            beneficiary.name = beneficiary.firstName;
            if (beneficiary.secondName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondName;
            } else {
              beneficiary.secondName = '';
            } 
            beneficiary.name += ' ';
            beneficiary.name += beneficiary.firstLastName;
            if (beneficiary.secondLastName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondLastName;
            } else {
              beneficiary.secondLastName = '';
            }    
            if (beneficiary.DNPCheckDate) {
              beneficiary.DNPCheckDate = beneficiary.DNPCheckDate.split('T')[0];
            } else {
              beneficiary.DNPCheckDate = 'Sin Revisar'
            }
            if (beneficiary.ARNCheckDate) {
              beneficiary.ARNCheckDate = beneficiary.ARNCheckDate.split('T')[0];
            } else {
              beneficiary.ARNCheckDate = 'Sin Revisar'
            }
            if (beneficiary.DPSCheckDate) {
              beneficiary.DPSCheckDate = beneficiary.DPSCheckDate.split('T')[0];
            } else {
              beneficiary.DPSCheckDate = 'Sin Revisar'
            }
            if (beneficiary.DNPCheck === 'no' && beneficiary.DNPCheckDate) {
              beneficiary.DNPCheck = 'No Validado'
            }
            if (beneficiary.DNPCheck === 'si' && beneficiary.DNPCheckDate) {
              beneficiary.DNPCheck = 'Validado'
            } else {
              beneficiary.DNPCheck = 'Sin Revisar'
            }
            if (beneficiary.ARNCheck === 'no' && beneficiary.ARNCheckDate) {
              beneficiary.ARNCheck = 'No Validado'
            }
            if (beneficiary.ARNCheck === 'si' && beneficiary.ARNCheckDate) {
              beneficiary.ARNCheck = 'Validado'
            } else {
              beneficiary.ARNCheck = 'Sin Revisar'
            }
            if (beneficiary.ARNCheck === 'no' && beneficiary.ARNCheckDate) {
              beneficiary.ARNCheck = 'No Validado'
            }
            if (beneficiary.DPSCheck === 'si' && beneficiary.DPSCheckDate ) {
              beneficiary.DPSCheck = 'Validado'
            } else {
              beneficiary.DPSCheck = 'Sin Revisar'
            }
            return beneficiary;
          })
          return response;
        })
      )
  }

  //No se usa

  getAllById(professionalTeamId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/${professionalTeamId}/getAllByProfessionalTeam`)
      .pipe(
        map((response: any) => {
          response.beneficiaries = response.beneficiaries.map((beneficiary: any) => {

            
            beneficiary.professionalTeam = beneficiary.ProfessionalTeam?.name;
            beneficiary.name = beneficiary?.firstName + ' ' + beneficiary.secondName + ' ' + beneficiary?.firstLastName + ' ' + beneficiary.secondLastName;
            beneficiary.stateAgreement = beneficiary?.state;
            beneficiary.identification = beneficiary?.identification;
            beneficiary.identificationType = beneficiary?.identificationType;
            beneficiary.email = beneficiary?.email;
            beneficiary.group = beneficiary.Group?.name;
            return beneficiary;
          })
          return response;
        })
      )
  }

  // No se usa
  getExcelARN(professionalTeamId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/${professionalTeamId}/getAllByrequestValidateARNInExcel`, {
        responseType: 'blob',
    });
  }

  // No se usa
  getExcelRejectedByARN(professionalTeamId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/${professionalTeamId}/getAllByrejectedARNExcel`, {
        responseType: 'blob',
    });
  }

  // No se usa
  getExcelRejectedByDNP(professionalTeamId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/${professionalTeamId}/getAllByrejectedDNPExcel`, {
        responseType: 'blob',
    });
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION])
  getPDF(id:number) {
    return this._httpClient.post(`${ environment.apiUrl }/app/beneficiary/getPDF`, {id});
  }

  // roleVerify([Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION])
  getPDFPreRegister(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/survey/pdfPreRegister`, { id });
  }

  // No se usa
  getExcelRejectedByDPS(professionalTeamId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/${professionalTeamId}/getAllByrejectedDPSExcel`, {
        responseType: 'blob',
    });
  }

  // No se usa
  getExcelDPS(professionalTeamId: number) {
      return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/${professionalTeamId}/getAllByrequestValidateDPSInExcel`, {
          responseType: 'blob',
      });
  }

  // No se usa
  getExcelDNP(professionalTeamId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/${professionalTeamId}/getAllByrequestValidateDNPInExcel`, {
        responseType: 'blob',
    });
  }

  // No se usa
  getAllARNInvalid(professionalTeamId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/${professionalTeamId}/findAllByARNInvalid`);
  }

  // No se usa
  getAllByProfessionalTeamAndAccountCertRejected(professionalTeamId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/${professionalTeamId}/getAllByBankingCertificationRejected`)
  }

  // No se usa
  getAllByProfessionalTeamAndAccountCertRejectedOrPending(professionalTeamId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/${professionalTeamId}/getAllByBankingCertificationRejectedOrPending`)
    .pipe(
      map((response: any) => {
        response.beneficiaries = response.beneficiaries.map((beneficiary: any) => {

          
          beneficiary.professionalTeam = beneficiary.ProfessionalTeam?.name;
          beneficiary.name = beneficiary.firstName;
            if (beneficiary.secondName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondName;
            } else {
              beneficiary.secondName = '';
            } 
            beneficiary.name += ' ';
            beneficiary.name += beneficiary.firstLastName;
            if (beneficiary.secondLastName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondLastName;
            } else {
              beneficiary.secondLastName = '';
            }    
          beneficiary.stateAgreement = beneficiary?.state;
          beneficiary.identification = beneficiary?.identification;
          beneficiary.identificationType = beneficiary?.identificationType;
          beneficiary.email = beneficiary?.email;
          beneficiary.group = beneficiary.Group?.name;
          beneficiary.updatedDate = beneficiary?.updatetAt?.split('T')[0];
          beneficiary.registerDate = beneficiary?.createdAt?.split('T')[0];
          beneficiary.group = beneficiary.Group?.name;

          return beneficiary;
        })
        return response;
      })
    )
  }

  //No se usa
  getAllByRejected(professionalTeamId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/${professionalTeamId}/getAllRejected`)
      .pipe(
        map((response: any) => {
          response.beneficiaries = response.beneficiaries.map((beneficiary: any) => {
            beneficiary.updatedDate = beneficiary.updatedAt.split('T')[0];

            beneficiary.professionalTeam = beneficiary.ProfessionalTeam?.name;
            beneficiary.name = beneficiary.firstName;
            if (beneficiary.secondName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondName;
            } else {
              beneficiary.secondName = '';
            } 
            beneficiary.name += ' ';
            beneficiary.name += beneficiary.firstLastName;
            if (beneficiary.secondLastName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondLastName;
            } else {
              beneficiary.secondLastName = '';
            }    
            beneficiary.stateAgreement = beneficiary?.state;
            beneficiary.identification = beneficiary?.identification;
            beneficiary.identificationType = beneficiary?.identificationType;
            beneficiary.email = beneficiary?.email;
            beneficiary.group = beneficiary.Group?.name;
            return beneficiary;
          })
          return response;
        })
      )
  }

  // No se usa
  getAllByRejectedDNP(professionalTeamId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/${professionalTeamId}/getAllRejectedDNP`)
      .pipe(
        map((response: any) => {
          response.beneficiaries = response.beneficiaries.map((beneficiary: any) => {
            beneficiary.updatedDate = beneficiary.updatedAt.split('T')[0];

           
            beneficiary.professionalTeam = beneficiary.ProfessionalTeam?.name;
            beneficiary.name = beneficiary.firstName;
            if (beneficiary.secondName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondName;
            } else {
              beneficiary.secondName = '';
            } 
            beneficiary.name += ' ';
            beneficiary.name += beneficiary.firstLastName;
            if (beneficiary.secondLastName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondLastName;
            } else {
              beneficiary.secondLastName = '';
            }    
            beneficiary.stateAgreement = beneficiary?.state;
            beneficiary.identification = beneficiary?.identification;
            beneficiary.identificationType = beneficiary?.identificationType;
            beneficiary.email = beneficiary?.email;
            beneficiary.group = beneficiary.Group?.name;
            return beneficiary;
          })
          return response;
        })
      )
  }

  // No se usa
  getAllByRejectedARN(professionalTeamId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/${professionalTeamId}/getAllRejectedARN`)
      .pipe(
        map((response: any) => {
          response.beneficiaries = response.beneficiaries.map((beneficiary: any) => {
            beneficiary.updatedDate = beneficiary.updatedAt.split('T')[0];

            
            beneficiary.professionalTeam = beneficiary.ProfessionalTeam?.name;
            beneficiary.name = beneficiary.firstName;
            if (beneficiary.secondName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondName;
            } else {
              beneficiary.secondName = '';
            } 
            beneficiary.name += ' ';
            beneficiary.name += beneficiary.firstLastName;
            if (beneficiary.secondLastName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondLastName;
            } else {
              beneficiary.secondLastName = '';
            }    
            beneficiary.stateAgreement = beneficiary?.state;
            beneficiary.identification = beneficiary?.identification;
            beneficiary.identificationType = beneficiary?.identificationType;
            beneficiary.email = beneficiary?.email;
            beneficiary.group = beneficiary.Group?.name;
            return beneficiary;
          })
          return response;
        })
      )
  }

  // No se usa
  getAllByRejectedDPS(professionalTeamId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/${professionalTeamId}/getAllRejectedDPS`)
      .pipe(
        map((response: any) => {
          response.beneficiaries = response.beneficiaries.map((beneficiary: any) => {
            beneficiary.updatedDate = beneficiary.updatedAt.split('T')[0];

            
            beneficiary.professionalTeam = beneficiary.ProfessionalTeam?.name;
            beneficiary.name = beneficiary.firstName;
            if (beneficiary.secondName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondName;
            } else {
              beneficiary.secondName = '';
            } 
            beneficiary.name += ' ';
            beneficiary.name += beneficiary.firstLastName;
            if (beneficiary.secondLastName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondLastName;
            } else {
              beneficiary.secondLastName = '';
            }    
            beneficiary.stateAgreement = beneficiary?.state;
            beneficiary.identification = beneficiary?.identification;
            beneficiary.identificationType = beneficiary?.identificationType;
            beneficiary.email = beneficiary?.email;
            beneficiary.group = beneficiary.Group?.name;
            return beneficiary;
          })
          return response;
        })
      )
  }

  // No se usa
  getAllByPendingARN(professionalTeamId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/${professionalTeamId}/getAllPendingARN`)
      .pipe(
        map((response: any) => {
          response.beneficiaries = response.beneficiaries.map((beneficiary: any) => {
            beneficiary.updatedDate = beneficiary.updatedAt.split('T')[0];

            
            beneficiary.professionalTeam = beneficiary.ProfessionalTeam?.name;
            beneficiary.name = beneficiary.firstName;
            if (beneficiary.secondName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondName;
            } else {
              beneficiary.secondName = '';
            } 
            beneficiary.name += ' ';
            beneficiary.name += beneficiary.firstLastName;
            if (beneficiary.secondLastName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondLastName;
            } else {
              beneficiary.secondLastName = '';
            }    
            beneficiary.stateAgreement = beneficiary?.state;
            beneficiary.identification = beneficiary?.identification;
            beneficiary.identificationType = beneficiary?.identificationType;
            beneficiary.email = beneficiary?.email;
            beneficiary.group = beneficiary.Group?.name;
            return beneficiary;
          })
          return response;
        })
      )
  }

  // No se usa
  getAllByPendingDNP(professionalTeamId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/${professionalTeamId}/getAllPendingDNP`)
      .pipe(
        map((response: any) => {
          response.beneficiaries = response.beneficiaries.map((beneficiary: any) => {
            beneficiary.updatedDate = beneficiary.updatedAt.split('T')[0];

            
            beneficiary.professionalTeam = beneficiary.ProfessionalTeam?.name;
            beneficiary.name = beneficiary.firstName;
            if (beneficiary.secondName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondName;
            } else {
              beneficiary.secondName = '';
            } 
            beneficiary.name += ' ';
            beneficiary.name += beneficiary.firstLastName;
            if (beneficiary.secondLastName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondLastName;
            } else {
              beneficiary.secondLastName = '';
            }    
            beneficiary.stateAgreement = beneficiary?.state;
            beneficiary.identification = beneficiary?.identification;
            beneficiary.identificationType = beneficiary?.identificationType;
            beneficiary.email = beneficiary?.email;
            beneficiary.group = beneficiary.Group?.name;
            return beneficiary;
          })
          return response;
        })
      )
  }

  // No se usa
  getAllByPendingDPS(professionalTeamId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/${professionalTeamId}/getAllPendingDPS`)
      .pipe(
        map((response: any) => {
          response.beneficiaries = response.beneficiaries.map((beneficiary: any) => {
            beneficiary.updatedDate = beneficiary.updatedAt.split('T')[0];

            
            beneficiary.professionalTeam = beneficiary.ProfessionalTeam?.name;
            beneficiary.name = beneficiary.firstName;
            if (beneficiary.secondName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondName;
            } else {
              beneficiary.secondName = '';
            } 
            beneficiary.name += ' ';
            beneficiary.name += beneficiary.firstLastName;
            if (beneficiary.secondLastName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondLastName;
            } else {
              beneficiary.secondLastName = '';
            }    
            beneficiary.stateAgreement = beneficiary?.state;
            beneficiary.identification = beneficiary?.identification;
            beneficiary.identificationType = beneficiary?.identificationType;
            beneficiary.email = beneficiary?.email;
            beneficiary.group = beneficiary.Group?.name;
            return beneficiary;
          })
          return response;
        })
      )
  }

  // No se usa
  getAllAccepted(professionalTeamId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/${professionalTeamId}/getAllAccepted`)
      .pipe(
        map((response: any) => {
          response.beneficiaries = response.beneficiaries.map((beneficiary: any) => {
            beneficiary.updatedDate = beneficiary.updatedAt.split('T')[0];

            if (beneficiary.DNPCheckDate) {
              beneficiary.DNPCheckDate = beneficiary.DNPCheckDate.split('T')[0];
            } else {
              beneficiary.DNPCheckDate = 'Sin Revisar'
            }
            if (beneficiary.ARNCheckDate) {
              beneficiary.ARNCheckDate = beneficiary.ARNCheckDate.split('T')[0];
            } else {
              beneficiary.ARNCheckDate = 'Sin Revisar'
            }
            if (beneficiary.DPSCheckDate) {
              beneficiary.DPSCheckDate = beneficiary.DPSCheckDate.split('T')[0];
            } else {
              beneficiary.DPSCheckDate = 'Sin Revisar'
            }
            if (beneficiary.DNPCheck === 'no' && beneficiary.DNPCheckDate) {
              beneficiary.DNPCheck = 'No Validado'
            }
            if (beneficiary.DNPCheck === 'si' && beneficiary.DNPCheckDate) {
              beneficiary.DNPCheck = 'Validado'
            } else {
              beneficiary.DNPCheck = 'Sin Revisar'
            }
            if (beneficiary.ARNCheck === 'no' && beneficiary.ARNCheckDate) {
              beneficiary.ARNCheck = 'No Validado'
            }
            if (beneficiary.ARNCheck === 'si' && beneficiary.ARNCheckDate) {
              beneficiary.ARNCheck = 'Validado'
            } else {
              beneficiary.ARNCheck = 'Sin Revisar'
            }
            if (beneficiary.ARNCheck === 'no' && beneficiary.ARNCheckDate) {
              beneficiary.ARNCheck = 'No Validado'
            }
            if (beneficiary.DPSCheck === 'si' && beneficiary.DPSCheckDate ) {
              beneficiary.DPSCheck = 'Validado'
            } else {
              beneficiary.DPSCheck = 'Sin Revisar'
            }
            
            beneficiary.professionalTeam = beneficiary.ProfessionalTeam?.name;
            beneficiary.name = beneficiary.firstName;
            if (beneficiary.secondName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondName;
            } else {
              beneficiary.secondName = '';
            } 
            beneficiary.name += ' ';
            beneficiary.name += beneficiary.firstLastName;
            if (beneficiary.secondLastName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondLastName;
            } else {
              beneficiary.secondLastName = '';
            }    
            beneficiary.stateAgreement = beneficiary?.state;
            beneficiary.identification = beneficiary?.identification;
            beneficiary.identificationType = beneficiary?.identificationType;
            beneficiary.email = beneficiary?.email;
            beneficiary.group = beneficiary.Group?.name;
            return beneficiary;
          })
          return response;
        })
      )
  }

  // No se usa
  getAllSignedAgreementByProfessionalTeam() {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/getAllSignedAgreementByProfessionalTeam`)
      .pipe(
        map((response: any) => {
          response.beneficiaries = response.beneficiaries.map((beneficiary: any) => {
            beneficiary.updatedDate = beneficiary.updatedAt.split('T')[0];            
            beneficiary.professionalTeam = beneficiary.ProfessionalTeam?.name;
            beneficiary.name = beneficiary.firstName;
            if (beneficiary.secondName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondName;
            } else {
              beneficiary.secondName = '';
            } 
            beneficiary.name += ' ';
            beneficiary.name += beneficiary.firstLastName;
            if (beneficiary.secondLastName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondLastName;
            } else {
              beneficiary.secondLastName = '';
            }    
            beneficiary.stateAgreement = beneficiary?.state;
            beneficiary.identification = beneficiary?.identification;
            beneficiary.identificationType = beneficiary?.identificationType;
            beneficiary.email = beneficiary?.email;
            beneficiary.group = beneficiary.Group?.name;
            return beneficiary;
          })
          return response;
        })
      )
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  getAllSignedAgreement() {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/getAllSignedAgreement`)
      .pipe(
        map((response: any) => {
          response.beneficiaries = response.beneficiaries.map((beneficiary: any) => {
            beneficiary.updatedDate = beneficiary.updatedAt.split('T')[0];            
            beneficiary.professionalTeam = beneficiary.ProfessionalTeam?.name;
            beneficiary.name = beneficiary.firstName;
            if (beneficiary.secondName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondName;
            } else {
              beneficiary.secondName = '';
            } 
            beneficiary.name += ' ';
            beneficiary.name += beneficiary.firstLastName;
            if (beneficiary.secondLastName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondLastName;
            } else {
              beneficiary.secondLastName = '';
            }    
            beneficiary.stateAgreement = beneficiary?.state;
            beneficiary.identification = beneficiary?.identification;
            beneficiary.identificationType = beneficiary?.identificationType;
            beneficiary.email = beneficiary?.email;
            beneficiary.group = beneficiary.Group?.name;
            return beneficiary;
          })
          return response;
        })
      )
  }

  // No se usa
  getAllByGroup(groupId: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/beneficiary/${groupId}/getAllByGroup`)
      .pipe(
        map((response: any) => {
          response.beneficiaries = response.beneficiaries.map((beneficiary: any) => {

            beneficiary.professionalTeam = beneficiary.ProfessionalTeam?.name;
            beneficiary.name = beneficiary.firstName;
            if (beneficiary.secondName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondName;
            } else {
              beneficiary.secondName = '';
            } 
            beneficiary.name += ' ';
            beneficiary.name += beneficiary.firstLastName;
            if (beneficiary.secondLastName) {
              beneficiary.name += ' ';
              beneficiary.name += beneficiary.secondLastName;
            } else {
              beneficiary.secondLastName = '';
            }    
            beneficiary.group = beneficiary.Group?.name;
            return beneficiary;
          })
          return response;
        })
      )
  }

  // No se usa
  show(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/beneficiary/${id}/getById`, {});
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  create(beneficiary: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/beneficiary/create`, { beneficiary });
  }

  // No se usa
  edit(id: number, beneficiary: any) {
    return this._httpClient.post(`${environment.apiUrl}/app/beneficiary/${id}/update`, { beneficiary });
  }

  // roleVerify([Roles.ADMIN, Roles.DIRECCION])
  delete(id: number) {
    return this._httpClient.post(`${environment.apiUrl}/app/beneficiary/${id}/delete`, {});
  }
}
