// src/serviceWorkerRegistration.js

// Check if the service worker is supported
export function register() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/firebase-messaging-sw.js') // Make sure this matches the file in your public folder
          .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      });
    } else {
      console.warn('Service Worker is not supported in this browser.');
    }
  }
  
  // Unregister the service worker if needed
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error('Service Worker unregistration failed:', error);
        });
    }
  }
  