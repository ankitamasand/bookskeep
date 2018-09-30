import { DB, OBJECTSTORE, ADWRITE, READONLY, READWRITE } from '../constants/indexeddb'
let idb = null
let dbInstance = null

const initialize = (callback) => {
    idb = window.indexedDB
    let request = idb.open(DB, 1)

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

        dbInstance.createObjectStore(OBJECTSTORE, { keyPath: 'id' })
    }
}

const getStore = (db, mode) => {
    let transaction = dbInstance.transaction(db, mode)
    return transaction.objectStore(db)
}

const update = (data, callback) => {
    let store = getStore(OBJECTSTORE, READWRITE)
    if (!data.id) {
        data.id = new Date().getTime()
    }
    let updateRequest = store.put(data)
    updateRequest.onsuccess = (event) => {
        typeof callback === 'function' && callback(data)
    }
}

const getAll = (callback) => {
    let store = getStore(OBJECTSTORE, READONLY)
    let getAllRequest = store.getAll()
    getAllRequest.onsuccess = (event) => {
        callback(event.target.result)
    }
}

const getItem = (id, callback) => {
    let store = getStore(OBJECTSTORE, READONLY)
    let getItemRequest = store.get(id)
    getItemRequest.onsuccess = (event) => {
        callback(event.target.result)
    }
}

const deleteItem = (id, callback) => {
    let store = getStore(OBJECTSTORE, READWRITE)
    let deleteItemRequest = store.delete(id)
    deleteItemRequest.onsuccess = (event) => {
        callback()
    }
}

export const IndexedDbWrapper = {
    initialize,
    update,
    getAll,
    getItem,
    deleteItem
}
