import React, { Component, Fragment } from 'react'
import { IndexedDbWrapper } from '../utils/indexeddb'
import BookData from './book-data'
import BookDetails from './book-details'

class Body extends Component {

    constructor (props) {
        super(props)
        this.state = {
            booksData: []
        }
    }

    render () {
        let { booksData } = this.state
        return (
            <Fragment>
                <BookDetails
                    booksData={booksData}
                    updateBooksData={this.updateBooksData}
                />
                <BookData
                    updateBooksData={this.updateBooksData}
                />
            </Fragment>
        )
    }

    initializeDB = () => {
        IndexedDbWrapper.getAll((booksData) => {
            this.setState({ booksData })
        })
    }

    updateBooksData = (data, mode) => {
        let { booksData } = this.state
        let newBooksData = [ ...booksData ]
        let selectedBookIndex = newBooksData.findIndex( book => book.id === data.id)

        if (selectedBookIndex > -1) {
            if (mode === 'update') {
                newBooksData[selectedBookIndex] = data
            } else if (mode === 'delete') {
                newBooksData.splice(selectedBookIndex, 1)
            }
        } else {
            newBooksData.push(data)
        }

        this.setState({ booksData: newBooksData })
    }

    componentDidMount () {
        IndexedDbWrapper.initialize(this.initializeDB)
    }
}

export default Body
