import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { IndexedDbWrapper } from '../utils/indexeddb'
import { BooksHeaders } from '../constants/books-headers'
import { ActionsMenu } from './base/popover'
import CustomModal from './base/modal'

class BookDetails extends Component {

    constructor (props) {
        super (props)
        this.state = {
            booksData: [],
            showModal: false,
            selectedBook: {}
        }
    }

    onEdit = (e, id) => {
        e.preventDefault()
        let bookDetails = IndexedDbWrapper.getItem(id, (selectedBook) => {
            this.setState({ showModal: true, selectedBook })
        })
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
                            } else if (header.apiKey === 'actions') {
                                value = this.getActionsMarkup(book.id)
                            }
                            return <td key={header.apiKey}>{value}</td>
                        })
                    }
                </tr>
            )
        })
    }

    getActionsMarkup = (id) => {
        const actions = [
            {
                text: 'Edit',
                onClick: this.onEdit
            },
            {
                text: 'Delete',
                onClick: this.onDelete
            }
        ]
        return (
            <ActionsMenu
                align='left'
                trigger='click'
                actions={actions}
                id={id}
            />
        )
    }

    onSave = (data) => {
        IndexedDbWrapper.update(data, () => {
            this.syncStateWithIdb(data.id, 'update', data)
            this.onClose()
        })
    }

    onDelete = (e, id) => {
        e.preventDefault()
        IndexedDbWrapper.deleteItem(id, () => {
            this.syncStateWithIdb(id, 'delete')
            this.onClose()
        })
    }

    syncStateWithIdb = (id, mode, data) => {
        let { booksData } = this.state
        let updatedBooksData = [ ...booksData ]
        let selectedBookIndex = updatedBooksData.findIndex(book => book.id === id)

        if (selectedBookIndex > -1) {
            if (mode === 'update') {
                updatedBooksData[selectedBookIndex] = data
            } else if (mode === 'delete') {
                updatedBooksData.splice(selectedBookIndex, 1)
            }

            this.setState({ booksData: updatedBooksData })
        }
    }

    onClose = () => {
        this.setState({ showModal: false })
    }

    render () {
        let { booksData, showModal, selectedBook } = this.state
        return (
            <div>
                <CustomModal
                    showModal={showModal}
                    onClose={this.onClose}
                    onSave={this.onSave}
                    selectedBook={selectedBook}

                />
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
