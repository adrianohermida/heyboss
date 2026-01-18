// This script clears all service workers and cache for the current origin.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
    }
  });
}
if (window.caches) {
  caches.keys().then(function(names) {
    for (let name of names)
      caches.delete(name);
  });
}
alert('Service workers and cache cleared. Please reload the page.');
