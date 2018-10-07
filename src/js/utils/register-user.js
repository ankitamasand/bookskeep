import { IndexedDbWrapper } from './indexeddb'
import { registerSw } from './register-sw'

const uuidv4 = require('uuid/v4')

export const register = () => {
    IndexedDbWrapper.getAll('user', (data) => {
        if (!data.length && !data[0].id) {
            let userDetails = {
                id: uuidv4()
            }
            IndexedDbWrapper.update('user', userDetails, () => {
                registerSw(userDetails.id)
            })
        } else {
            let userId = data[0].id
            registerSw(userId)
        }
    })
}
