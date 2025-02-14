import { Injectable, KeyValueDiffers } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  constructor() { }

  // getCurrentPageIndex(matPaginator: MatPaginator): number {
  //   return matPaginator.pageIndex;
  // }

  // getPageSize(matPaginator: MatPaginator): number {
  //   return matPaginator.pageSize;
  // }

  onPageChange(matPaginator: MatPaginator, callback: (pageIndex: number, pageSize: number) => void): void {
    console.log('entra al onPAgeChange')
    matPaginator.page.subscribe((pageEvent: PageEvent) => {
      console.log(pageEvent, 'ANTES DEL CALLBACK')
      callback(pageEvent.pageIndex, pageEvent.pageSize);
    });
  }
}
