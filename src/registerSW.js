if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      // La app debe seguir funcionando aunque falle el registro PWA.
    });
  });
}
