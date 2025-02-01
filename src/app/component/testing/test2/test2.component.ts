import { Component } from '@angular/core';
import { IndexedDbService } from '../../../service/indexed-db.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-test2',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './test2.component.html',
    styleUrl: './test2.component.scss'
})
export class Test2Component {
  students: any[] = [];

  constructor(private indexedDbService: IndexedDbService) {}

  async addStudent(): Promise<void> {
    const student = {
      id: Math.floor(Math.random() * 1000), // ID aleatorio
      name: `Estudiante ${Math.floor(Math.random() * 100)}`,
      photo: null, // Foto podría ser una cadena Base64
      timestamp: new Date().toISOString(),
    };

    await this.indexedDbService.addStudent(student);

    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      const registration: any = await navigator.serviceWorker.ready;
      try {
        await registration.sync.register('sync-data');
      } catch (error) {
        console.error('Error al registrar la sincronización:', error);
      }
    } else {
      console.error('SyncManager no está soportado en este navegador.');
    }
  }

  async getStudents(): Promise<void> {
    this.students = await this.indexedDbService.getAllStudents();
  }

  async clearStudents(): Promise<void> {
    await this.indexedDbService.clearStore();
    this.students = [];
  }
}
