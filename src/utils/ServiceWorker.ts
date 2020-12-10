/* eslint-disable import/prefer-default-export */
// type Config = {
//   onSuccess?: (registration: ServiceWorkerRegistration) => void;
//   onUpdate?: (registration: ServiceWorkerRegistration) => void;
// };

export const register = (onUpdateFound?: () => void) => {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);

    if (publicUrl.origin !== window.location.origin) {
        return;
    }

    window.addEventListener('load', async () => {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('./service-worker.js', { scope: './' });
                console.log('serviceWorker registered: ', registration);

                registration.onupdatefound = () => {
                    const newWorker = registration.installing;
                    console.log('onupdatefound', newWorker, registration.active);
                    if (newWorker && registration.active) {
                        newWorker.onstatechange = (evt) => {
                            console.log(evt, newWorker.state);
                            if(newWorker.state === 'installed') {
                                const hasNewVersion = confirm('we founda a new service worker, update?')
                                if (hasNewVersion) {
                                    location.reload();
                                }
                            }
                        };
                    }
                };
            } catch (registrationError) {
                console.log('serviceWorker registration failed: ', registrationError);
            }
        }
    });
};

export const onNetworkStatusChange = (
    onOnline: () => void,
    onOffline: () => void,
) => {
    if (navigator.onLine) {
        window.addEventListener('online', onOnline);
        window.addEventListener('offline', onOffline);
    }
};

export const onUpdateIsAvalable = () => {};
