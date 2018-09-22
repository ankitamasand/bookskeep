import React, { Component } from 'react'
import { IndexedDbWrapper } from '../utils/indexeddb'
import { Button } from 'react-bootstrap'
import BookForm from './form'

class BookData extends Component {

    onSubmit = (formData) => {
        IndexedDbWrapper.update(formData, () => console.log('Item Updated'))
    }

    render () {
        return (
            <div>
                <h4>Reading something new? Add it to your Store!</h4>
                <BookForm
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

export default BookData
