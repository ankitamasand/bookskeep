let idb = null
let dbInstance = null

const initialize = (callback) => {
    idb = window.indexedDB
    let request = idb.open('BooksKeep', 1)

    request.onsuccess = (event) => {
        dbInstance = event.target.result
        callback()
        console.log('BooksKeep database created')
    }

    request.onerror = (event) => {
        console.log('Error in creating BooksKeep database', request.error)
    }

    request.onupgradeneeded = (event) => {
        if (!dbInstance) {
            dbInstance = event.target.result
        }

        dbInstance.createObjectStore('books', { keyPath: 'name' })
    }
}

const getStore = (db, mode) => {
    let transaction = dbInstance.transaction(db, mode)
    return transaction.objectStore(db)
}

const update = (data, callback) => {
    let store = getStore('books', 'readwrite')
    let updateRequest = store.put(data)
    updateRequest.onsuccess = (event) => {
        typeof callback === 'function' && callback()
    }
}

const getAll = (callback) => {
    let store = getStore('books', 'readonly')
    let getAllRequest = store.getAll()
    getAllRequest.onsuccess = (event) => {
        callback(event.target.result)
    }
}

export const IndexedDbWrapper = {
    initialize,
    update,
    getAll
}
