function initializeDB (callback) {
    let request = indexedDB.open('BooksKeep', 1)
    request.onsuccess = function (event) {
        callback(event.target.result)
    }
}

function showNotification () {
    initializeDB( function (db) {
        let transaction = db.transaction('books', 'readonly')
        let getAllRequest = transaction.objectStore('books').getAll()
        getAllRequest.onsuccess = function (event) {
            let booksData = event.target.result
            let quotes = []
            booksData.map (book => {
                if (book.quotes) {
                    quotes.push(...book.quotes)
                }
            })
            let randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
            self.registration.showNotification('Quote', { body: randomQuote, data: randomQuote })
        }
    })
}

self.addEventListener('push', (event) => {
    event.waitUntil(showNotification());
})
