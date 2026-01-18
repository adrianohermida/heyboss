// Limpa todos os service workers e cache do navegador
// Instruções: coloque este arquivo em seu projeto, sirva via HTTPS e acesse pelo navegador

(async () => {
  // Desregistra todos os service workers
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const reg of registrations) {
      await reg.unregister();
    }
    console.log('Todos os service workers foram desregistrados.');
  }

  // Limpa todos os caches
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    for (const name of cacheNames) {
      await caches.delete(name);
    }
    console.log('Todos os caches foram limpos.');
  }

  // Limpa localStorage e sessionStorage
  localStorage.clear();
  sessionStorage.clear();
  console.log('localStorage e sessionStorage limpos.');

  alert('Service workers, cache, localStorage e sessionStorage limpos! Recarregue a página.');
})();
