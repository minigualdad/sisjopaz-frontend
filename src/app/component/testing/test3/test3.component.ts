import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndexedDbService } from '../../../service/indexed-db.service';
import { UserService } from '../../../service/user.service';

@Component({
    selector: 'app-test3',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './test3.component.html',
    styleUrl: './test3.component.scss'
})
export class Test3Component {
  students: any[] = [];

  constructor(
    private apiService: UserService,
    private indexedDbService: IndexedDbService
  ) {}

  async fetchAndSaveStudents(): Promise<void> {
    try {
      // Obtener datos desde el servicio externo
      const response: any = await this.apiService.testing().toPromise();

      // Guardar cada estudiante en IndexedDB
      for (const student of response.data) {
        await this.indexedDbService.addStudent({
          ...student,
          timestamp: new Date().toISOString(), // Añadir timestamp
        });
      }

    } catch (error) {
      console.error('Error al descargar estudiantes:', error);
    }
  }

  async getStudents(): Promise<void> {
    this.students = await this.indexedDbService.getAllStudents();
  }
}
