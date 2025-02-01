import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then((registration: any) => {
      // Registrar la sincronización cuando haya datos pendientes
      registration.sync.register('sync-data').then(() => {
        console.warn('Sincronización en segundo plano registrada.');
      }).catch((error: any) => {
        console.error('Error al registrar la sincronización:', error);
      });
    });
  } else {
    console.error('SyncManager no es compatible con este navegador.');
  }
  