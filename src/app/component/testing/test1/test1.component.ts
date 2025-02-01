import { Component } from '@angular/core';
import { LocalStorageService } from '../../../service/local-storage.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-test1',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './test1.component.html',
    styleUrl: './test1.component.scss'
})
export class Test1Component {

  loadedData: any;

  constructor(private localStorageService: LocalStorageService) {}

  saveData(): void {
    const data = {
      students: [
        { id: 1, name: 'Juan Pérez', photo: null },
        { id: 2, name: 'Ana López', photo: null },
      ],
      timestamp: new Date().toISOString(),
    };

    this.localStorageService.setItem('attendance', data);
  }

  loadData(): void {
    this.loadedData = this.localStorageService.getItem('attendance');
  }

  clearData(): void {
    this.localStorageService.clear();
  }

}
