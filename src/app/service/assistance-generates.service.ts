import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/enviroment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssistanceGeneratesService {

   constructor(private _httpClient: HttpClient) { }

   getAll() {
    return this._httpClient.get<any>(`${environment.apiUrl}/app/assistanceScanner/getAll`).pipe(
      map(response => {
        return response.assistances.map((assistance:any) => {
          const year = assistance.AssistanceSheet?.AssistanceGenerate?.year;
          const month = assistance.AssistanceSheet?.AssistanceGenerate?.month;
          
          // Formateamos el mes para que siempre tenga 2 dígitos
          const formattedMonth = month ? month.toString().padStart(2, '0') : '00';
          
          return {
            id: assistance.id,
            urlFile: assistance.AssistanceSheet?.AssistanceGenerate?.urlFile || null, 
            group: assistance.AssistanceSheet?.AssistanceGenerate?.GroupComponent?.Group?.name,
            url: assistance.AssistanceSheet?.AssistanceGenerate?.urlFile || null,
            component: assistance.AssistanceSheet?.AssistanceGenerate?.GroupComponent?.Component?.name || null,
            version: assistance.AssistanceSheet?.AssistanceGenerate?.version || null,
            urlOriginal: assistance.urlFileImageOriginal || null,
            urlProcessed: assistance.urlFileImageProcessed || null,
            state: assistance.state || null,
            startDay: assistance.AssistanceSheet?.startDay || null,
            endDay: assistance.AssistanceSheet?.endDay || null,
            date: year ? `${year}-${formattedMonth}` : null
          };
        });
      })
    );
  }

  downloadData() {
    return this._httpClient.get(environment.apiUrl + '/app/assistanceGenerates/downloadData', {
      responseType: 'blob'
    });
  }

  downloadById(id: number) {
    return this._httpClient.get(`${environment.apiUrl}/app/assistanceGenerates/${id}/downloadDataById'`, {
      responseType: 'blob'
    });
  }
}
