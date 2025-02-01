import { Component, OnInit } from '@angular/core';
import { IndexedDbService } from '../../../service/indexed-db.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../service/user.service';

@Component({
    selector: 'app-test4',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './test4.component.html',
    styleUrl: './test4.component.scss'
})
export class Test4Component implements OnInit {

  students: any[] = [];
  syncStatus = 'Sin sincronizar';

  constructor(private indexedDbService: IndexedDbService,
              private apiService: UserService,
  ) {}

  ngOnInit(): void {
    this.detectConnection();
  }

  detectConnection(): void {
    window.addEventListener('online', () => {
      this.syncStatus = 'Conexión detectada. Sincronizando...';
      this.syncData();
    });

    window.addEventListener('offline', () => {
      this.syncStatus = 'Modo offline. Esperando conexión.';
    });
  }

  async syncData(): Promise<void> {
    try {
      // Obtener datos no sincronizados de IndexedDB
      const students = await this.indexedDbService.getAllStudents();
      const unsyncedData = students.filter((s) => !s.synced);

      if (unsyncedData.length > 0) {
        // Enviar datos al servicio externo
        
        // Marcar como sincronizados en IndexedDB
        for (const student of unsyncedData) {
          await this.apiService.testingUpdate(student).toPromise();
          await this.indexedDbService.markAsSynced(student.id);
        }

        this.syncStatus = 'Sincronización exitosa.';
      } else {
        this.syncStatus = 'No hay datos para sincronizar.';
      }
    } catch (error) {
      this.syncStatus = 'Error al sincronizar.';
      console.error('Error al sincronizar:', error);
    }
  }

  async loadStudents(): Promise<void> {
    this.students = await this.indexedDbService.getAllStudents();
  }

  async markPresent(student: any): Promise<void> {
    student.status = 'Presente';
    await this.indexedDbService.addStudent(student);
  }

  async markAbsent(student: any): Promise<void> {
    student.status = 'Ausente';
    await this.indexedDbService.addStudent(student);
  }

  async capturePhoto(student: any): Promise<void> {
    const photo = await this.getPhoto();
    if (photo) {
      student.photo = photo;
      await this.indexedDbService.addStudent(student);
    }
  }

  private getPhoto(): Promise<string | null> {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const constraints = { video: true };

      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        video.srcObject = stream;
        video.play();

        setTimeout(() => {
          // Capturar foto después de 2 segundos
          canvas.width = 100;
          canvas.height = 100;
          context?.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Detener la cámara
          stream.getTracks().forEach((track) => track.stop());

          resolve(canvas.toDataURL('image/png')); // Convertir a Base64
        }, 2000);
      }).catch((error) => {
        console.error('Error al acceder a la cámara:', error);
        resolve(null);
      });
    });
  }

}
