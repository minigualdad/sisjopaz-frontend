import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private dbName = 'AttendanceDB';
  private dbVersion = 6;
  private db: IDBDatabase | null = null;
  private initialized: Promise<void>;

  constructor() {
    this.initialized = this.initDB();
  }

  // Inicialización de la base de datos
  private initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;

        // Crear tienda 'students' si no existe
        if (!db.objectStoreNames.contains('students')) {
          db.createObjectStore('students', { keyPath: 'id' });
        }

        // Crear tienda 'preregistro' si no existe
        if (!db.objectStoreNames.contains('preregistro')) {
          const preregistroStore = db.createObjectStore('preregistro', { keyPath: 'id', autoIncrement: true });

          // Crear índices
          preregistroStore.createIndex(
            'identificationType',
            'identificationType',
            { unique: false }
          );
          preregistroStore.createIndex('identification', 'identification', {
            unique: false,
          });
          preregistroStore.createIndex(
            'type_and_identification',
            ['identificationType', 'identification'],
            {
              unique: false,
            }
          );
        }

        if (!db.objectStoreNames.contains('departments')) {
          db.createObjectStore('departments', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('divipolas')) {
          db.createObjectStore('divipolas', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('characterization')) {
          db.createObjectStore('characterization', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('questionsCharacterization')) {
          db.createObjectStore('questionsCharacterization', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('monitoring')) {
          db.createObjectStore('monitoring', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('questionsMonitoring')) {
          db.createObjectStore('questionsMonitoring', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('pendingAgreement')) {
          db.createObjectStore('pendingAgreement', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('agreement')) {
          const aggrementStore = db.createObjectStore('agreement', { keyPath: 'id', autoIncrement: true });

          // Crear índices
          aggrementStore.createIndex(
            'identificationType',
            'identificationType',
            { unique: false }
          );
          aggrementStore.createIndex('identification', 'identification', {
            unique: false,
          });
          aggrementStore.createIndex(
            'type_and_identification',
            ['identificationType', 'identification'],
            {
              unique: false,
            }
          );
        }
      };

      request.onsuccess = (event: any) => {
        this.db = event.target.result;
        resolve();
      };

      request.onerror = (event: any) => {
        console.error('Error al inicializar IndexedDB:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  // Esperar hasta que la base de datos esté inicializada
  private async waitForInitialization(): Promise<void> {
    await this.initialized;
  }

  // Método auxiliar para manejar transacciones
  private async getTransaction(
    storeName: string,
    mode: IDBTransactionMode
  ): Promise<IDBObjectStore> {
    await this.waitForInitialization(); // Espera la inicialización
    if (!this.db) {
      throw new Error('La base de datos no está inicializada');
    }
    const tx = this.db.transaction(storeName, mode);
    return tx.objectStore(storeName);
  }

  // Métodos CRUD

  async addPreregister(preregistro: any): Promise<void> {
    preregistro.id = Date.now();
    preregistro.storeDate = Date();
    const store = await this.getTransaction('preregistro', 'readwrite');
    const request = store.add(preregistro);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async findPreregisterByTypeIdentificationAndIdentification(
    type: string,
    identification: string
  ): Promise<any | null> {
    const store = await this.getTransaction('preregistro', 'readonly');
    const index = store.index('type_and_identification');
    const request = index.get([type, identification]);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async getAllPreregister(): Promise<any[]> {
    const store = await this.getTransaction('preregistro', 'readonly');
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getQuantityPreregister(): Promise<number> {
    const store = await this.getTransaction('preregistro', 'readonly');
    const request = store.count();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Eliminar preregistro por ID
  async deletePreregister(id: number): Promise<void> {
    const store = await this.getTransaction('preregistro', 'readwrite');
    try {
      const request = store.delete(id);
      request.onsuccess = () => {
      };
      request.onerror = (e) => {
          console.error('Delete failed:', e);
      };
    } catch (e) {
        console.error('Unexpected error:', e);
    }
  }

  // Agregar estudiante
  async addStudent(student: any): Promise<void> {
    const store = await this.getTransaction('students', 'readwrite'); // Espera la inicialización
    const request = store.add(student);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Obtener todos los estudiantes
  async getAllStudents(): Promise<any[]> {
    const store = await this.getTransaction('students', 'readonly'); // Espera la inicialización
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Eliminar estudiante por ID
  async deleteStudent(id: number): Promise<void> {
    const store = await this.getTransaction('students', 'readwrite'); // Espera la inicialización
    const request = store.delete(id);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Limpiar la tienda 'students'
  async clearStore(): Promise<void> {
    const store = await this.getTransaction('students', 'readwrite'); // Espera la inicialización
    const request = store.clear();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Marcar estudiante como sincronizado
  async markAsSynced(id: number): Promise<void> {
    const store = await this.getTransaction('students', 'readwrite'); // Espera la inicialización
    const getRequest = store.get(id);

    return new Promise((resolve, reject) => {
      getRequest.onsuccess = () => {
        const student = getRequest.result;
        if (student) {
          student.synced = true;
          const updateRequest = store.put(student);
          updateRequest.onsuccess = () => resolve();
          updateRequest.onerror = () => reject(updateRequest.error);
        } else {
          reject(new Error('Estudiante no encontrado'));
        }
      };
      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  async saveDivipola(divipolas: any): Promise<void> {
    const store = await this.getTransaction('divipolas', 'readwrite'); // Espera la inicialización

    return new Promise((resolve, reject) => {
      const transaction = store.transaction;
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);

      divipolas.forEach((divipola: any) => {
        const request = store.add(divipola);
      });
    });
  }

  async saveDepartments(departments: any): Promise<void> {
    const store = await this.getTransaction('departments', 'readwrite'); // Espera la inicialización

    return new Promise((resolve, reject) => {
      const transaction = store.transaction;
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);

      departments.forEach((department: any) => {
        const request = store.add(department);
      });
    });
  }

    async getDepartments(): Promise<any[]> {
      const store = await this.getTransaction('departments', 'readonly'); // Espera la inicialización
      const request = store.getAll();
  
      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }

    async getDivipola(): Promise<any[]> {
      const store = await this.getTransaction('divipolas', 'readonly'); // Espera la inicialización
      const request = store.getAll();
  
      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
  
  async addAgreement(firmaAcuerdo: any): Promise<void> {
    firmaAcuerdo.id = Date.now();
    firmaAcuerdo.storeDate = Date();
    const store = await this.getTransaction('agreement', 'readwrite');
    const request = store.add(firmaAcuerdo);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getAllAgreement(): Promise<any[]> {
    const store = await this.getTransaction('agreement', 'readonly');
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getQuantityAgreement(): Promise<number> {
    const store = await this.getTransaction('agreement', 'readonly');
    const request = store.count();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Eliminar preregistro por ID
  async deleteAgreement(id: number): Promise<void> {
    const store = await this.getTransaction('agreement', 'readwrite');
    try {
      const request = store.delete(id);
      request.onsuccess = () => {
      };
      request.onerror = (e) => {
          console.error('Delete failed:', e);
      };
    } catch (e) {
        console.error('Unexpected error:', e);
    }
  }

  async saveQuestionsCharacterization(questions: any): Promise<void> {
    const store = await this.getTransaction('questionsCharacterization', 'readwrite'); // Espera la inicialización

    return new Promise((resolve, reject) => {
      const transaction = store.transaction;
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);

      questions.forEach((question: any) => {
        const request = store.add(question);
      });
    });
  }

  async getQuestionsCharacterization(): Promise<any[]> {
    const store = await this.getTransaction('questionsCharacterization', 'readonly'); // Espera la inicialización
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async savePendingAgreement(pendingAgreement: any): Promise<void> {
    const store = await this.getTransaction('pendingAgreement', 'readwrite'); // Espera la inicialización

    return new Promise((resolve, reject) => {
      const transaction = store.transaction;
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);

      pendingAgreement.forEach((department: any) => {
        const request = store.add(department);
      });
    });
  }

  async getAllPendingAgreement(): Promise<any[]> {
    const store = await this.getTransaction('pendingAgreement', 'readonly');
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async findPendingAgreementById(id: number): Promise<any> {
    try {
      const store = await this.getTransaction('pendingAgreement', 'readonly');
      if (!store) {
        throw new Error('Store is not available');
      }
  
      const request = store.get(Number(id));
      return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error finding pending agreement by ID:', error);
      throw error;
    }
  }

  async addCharacterization(characterization: any): Promise<void> {
    characterization.id = Date.now();
    characterization.storeDate = Date();
    const store = await this.getTransaction('characterization', 'readwrite');
    const request = store.add(characterization);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getAllCharacterization(): Promise<any[]> {
    const store = await this.getTransaction('characterization', 'readonly');
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getQuantityCharacterization(): Promise<number> {
    const store = await this.getTransaction('characterization', 'readonly');
    const request = store.count();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteCharacterization(id: number): Promise<void> {
    const store = await this.getTransaction('characterization', 'readwrite');
    try {
      const request = store.delete(id);
      request.onsuccess = () => {
      };
      request.onerror = (e) => {
          console.error('Delete failed:', e);
      };
    } catch (e) {
        console.error('Unexpected error:', e);
    }
  }

  async saveQuestionsMonitoring(questions: any): Promise<void> {
    const store = await this.getTransaction('questionsMonitoring', 'readwrite'); // Espera la inicialización

    return new Promise((resolve, reject) => {
      const transaction = store.transaction;
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);

      questions.forEach((question: any) => {
        const request = store.add(question);
      });
    });
  }

  async getQuestionsMonitoring(): Promise<any[]> {
    const store = await this.getTransaction('questionsMonitoring', 'readonly'); // Espera la inicialización
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async addMonitoring(monitoring: any): Promise<void> {
    monitoring.id = Date.now();
    monitoring.storeDate = Date();
    const store = await this.getTransaction('monitoring', 'readwrite');
    const request = store.add(monitoring);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getAllMonitoring(): Promise<any[]> {
    const store = await this.getTransaction('monitoring', 'readonly');
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getQuantityMonitoring(): Promise<number> {
    const store = await this.getTransaction('monitoring', 'readonly');
    const request = store.count();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteMonitoring(id: number): Promise<void> {
    const store = await this.getTransaction('monitoring', 'readwrite');
    try {
      const request = store.delete(id);
      request.onsuccess = () => {
      };
      request.onerror = (e) => {
          console.error('Delete failed:', e);
      };
    } catch (e) {
        console.error('Unexpected error:', e);
    }
  }
}
