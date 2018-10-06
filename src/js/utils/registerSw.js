export const registerSw = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then ( () => {
                return navigator.serviceWorker.ready
                console.log('Service Worker registered')
            })
            .then ((serviceWorkerRegistration) => {
                getSubscription(serviceWorkerRegistration)
                console.log('serviceWorkerRegistration', serviceWorkerRegistration)
                Notification.requestPermission((p) => {
                    console.log('p', p)
                })
            })
    }
}

const getSubscription = (serviceWorkerRegistration) => {
    serviceWorkerRegistration.pushManager.getSubscription()
        .then ((subscription) => {
            console.log('subscription', JSON.stringify(subscription))

            if (!subscription) {
                const applicationServerKey = urlB64ToUint8Array('BPZIQVuuwYUOSvrLyqw9wVuheVR3zbkV5V3XZNbvhUFc5kLq89IKU3c2u4e0ItziU-A2qcTZy2F5GWFdMeKwrIY')
                serviceWorkerRegistration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey
                }).then (subscription => {
                    console.log('subscription', JSON.stringify(subscription))
                })
            }
        })
}

const urlB64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
