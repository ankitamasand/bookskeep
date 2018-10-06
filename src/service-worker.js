self.addEventListener('install', (event) => {
    console.log('Service Worker install event', event)
})

self.addEventListener('activate', (event) => {
    console.log('Service Worker Activate event', event)
})

self.addEventListener('push', (event) => {
    console.log('push event', event)
    event.waitUntil(
        self.registration.showNotification('Hello', { body: 'Start Reading!' })
    )
})
