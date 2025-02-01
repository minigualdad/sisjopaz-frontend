self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('online', () => {
  syncPreregistros();
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-preregistros') {
    event.waitUntil(syncPreregistros());
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'sync-preregistros') {
    syncPreregistros();
  }
});

// Función para sincronizar preregistros
async function syncPreregistros() {
  const dbRequest = indexedDB.open('AttendanceDB', 4);

  dbRequest.onsuccess = async (event) => {
    const db = event.target.result;

    // Acceder a la tienda 'preregistro'
    const tx = db.transaction('preregistro', 'readonly');
    const store = tx.objectStore('preregistro');

    // Obtener registros no sincronizados
    const request = store.getAll();
    request.onsuccess = async (e) => {
      const preregistros = e.target.result.filter((record) => !record.synced);
      for (const preregistro of preregistros) {
        try {
          const response = await uploadToServer(preregistro);
          if (response.ok) {

            // Eliminar el registro sincronizado
            const deleteTx = db.transaction('preregistro', 'readwrite');
            const deleteStore = deleteTx.objectStore('preregistro');
            deleteStore.delete(preregistro.id);
          }
        } catch (error) {
          console.error(`Error al sincronizar el registro ${preregistro.id}:`, error);
        }
      }
    };
  };

  dbRequest.onerror = (error) => {
    console.error('Error al abrir IndexedDB:', error);
  };
}


async function uploadToServer(record) {
  const url = 'http://localhost:9550/app/survey/createPreregister'; // Ruta del servidor (reemplaza si es diferente)
  
  const formData = new FormData();

  if (record.frontImage) {
    const blobFront = record.frontImage;
    formData.append('fileFront', blobFront, 'frontImage.png'); // Nombre del archivo
  }
  if (record.backImage) {
    const blobBack = record.backImage;
    formData.append('fileBack', blobBack, 'backImage.png'); // Nombre del archivo
  }

  for (const key in record) {
    if (key !== 'frontImage' && key !== 'backImage') {
      formData.append(key, record[key]);
    }
  }

  // Enviar la solicitud al servidor
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error en la subida: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error('Error al subir datos:', error);
    return { success: false };
  }

}