import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  // Guardar datos en el Local Storage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Recuperar datos del Local Storage
  getItem(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // Eliminar un elemento del Local Storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpiar todo el Local Storage
  clear(): void {
    localStorage.clear();
  }
}
