import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { IndexedDbWrapper } from '../utils/indexeddb'
import { BooksHeaders } from '../constants/books-headers'

class BookDetails extends Component {

    constructor (props) {
        super (props)
        this.state = {
            booksData: []
        }
    }

    getTableMarkup = () => {
        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>{this.getTableHeaders()}</tr>
                </thead>
                <tbody>
                    {this.getTableData()}
                </tbody>
            </Table>
        )
    }

    getTableHeaders = () => {
        return BooksHeaders.map ((header, index) => {
            return <th key={header.apiKey}>{header.displayName}</th>
        })
    }

    getTableData = () => {
        let { booksData } = this.state
        return booksData.map ((book, index) => {
            return (
                <tr key={book.name}>
                    {
                        BooksHeaders.map ((header, subIndex) => {
                            let value = book[header.apiKey]
                            if (header.apiKey === '#') {
                                value = index+1
                            }
                            return <td key={header.apiKey}>{value}</td>
                        })
                    }
                </tr>
            )
        })
    }

    render () {
        let { booksData } = this.state
        return (
            <div>
                <h4>Your Books &hearts;</h4>
                {this.getTableMarkup()}
            </div>
        )
    }

    componentWillReceiveProps (nextProps) {
        let { dbInitialized: prevDBInitialized } = this.props
        let { dbInitialized: nextDBInitialized } = nextProps

        if (!prevDBInitialized && nextDBInitialized) {
            IndexedDbWrapper.getAll((booksData) => {
                this.setState({ booksData })
            })
        }
    }
}

export default BookDetails
