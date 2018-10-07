export const registerSw = (userId) => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then ( () => {
                return navigator.serviceWorker.ready
                console.log('Service Worker registered')
            })
            .then ((serviceWorkerRegistration) => {
                getSubscription(serviceWorkerRegistration, userId)
                Notification.requestPermission()
            })
    }
}

const getSubscription = (serviceWorkerRegistration, userId) => {
    serviceWorkerRegistration.pushManager.getSubscription()
        .then ((subscription) => {
            if (!subscription) {
                const applicationServerKey = urlB64ToUint8Array('BPZIQVuuwYUOSvrLyqw9wVuheVR3zbkV5V3XZNbvhUFc5kLq89IKU3c2u4e0ItziU-A2qcTZy2F5GWFdMeKwrIY')
                serviceWorkerRegistration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey
                }).then (subscription => {
                    saveSubscription(subscription, userId)
                })
            } else {
                saveSubscription(subscription, userId)
            }
        })
}

const saveSubscription = (subscription, userId) => {
    let data = {
        subscription,
        id: userId
    }
    fetch ('http://localhost:3000/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then (data => {
        console.log('subscription for userId saved successfully', userId)
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
