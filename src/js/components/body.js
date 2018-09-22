import React, { Component, Fragment } from 'react'
import { IndexedDbWrapper } from '../utils/indexeddb'
import BookData from './book-data'
import BookDetails from './book-details'

class Body extends Component {

    constructor (props) {
        super(props)
        this.state = {
            dbInitialized: false
        }
    }

    render () {
        let { dbInitialized } = this.state
        return (
            <Fragment>
                <BookDetails
                    dbInitialized={dbInitialized}
                />
                <BookData
                    dbInitialized={dbInitialized}
                />
            </Fragment>
        )
    }

    initializeDB = () => {
        this.setState({
            dbInitialized: true
        })
    }

    componentDidMount () {
        IndexedDbWrapper.initialize(this.initializeDB)
    }
}

export default Body
