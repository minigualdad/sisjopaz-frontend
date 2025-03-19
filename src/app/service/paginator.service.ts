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
    matPaginator.page.subscribe((pageEvent: PageEvent) => {
      callback(pageEvent.pageIndex, pageEvent.pageSize);
    });
  }
}
