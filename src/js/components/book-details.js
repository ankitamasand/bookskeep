import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { IndexedDbWrapper } from '../utils/indexeddb'
import { BooksHeaders } from '../constants/books-headers'
import { ActionsMenu } from './base/popover'
import DetailsModal from './base/modal'
import QuotesModal from './base/quotes-modal'

class BookDetails extends Component {

    constructor (props) {
        super (props)
        this.state = {
            showDetailsModal: false,
            showQuotesModal: false,
            selectedBook: {}
        }
    }

    onEdit = (e, id) => {
        e.preventDefault()
        let bookDetails = IndexedDbWrapper.getItem(id, (selectedBook) => {
            this.setState({ showDetailsModal: true, selectedBook })
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
            return <th width={header.width} key={header.apiKey}>{header.displayName}</th>
        })
    }

    getTableData = () => {
        let { booksData } = this.props
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
                            return <td width={header.width} key={header.apiKey}>{value}</td>
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
            },
            {
                text: 'View Quotes',
                onClick: this.viewQuotes
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

    onSave = (formData) => {
        let { updateBooksData } = this.props
        IndexedDbWrapper.update(formData, (data) => {
            updateBooksData(data, 'update')
            this.onClose()
        })
    }

    onDelete = (e, id) => {
        e.preventDefault()
        IndexedDbWrapper.deleteItem(id, () => {
            updateBooksData({ id }, 'delete')
            this.onClose()
        })
    }

    onClose = () => {
        this.setState({ showDetailsModal: false, showQuotesModal: false })
    }

    viewQuotes = (e, id) => {
        e.preventDefault()
        IndexedDbWrapper.getItem(id, (selectedBook) => {
            this.setState({ showQuotesModal: true, selectedBook })
        })
    }

    render () {
        let { showDetailsModal, selectedBook, showQuotesModal } = this.state
        return (
            <div>
                <DetailsModal
                    showModal={showDetailsModal}
                    onClose={this.onClose}
                    onSave={this.onSave}
                    selectedBook={selectedBook}
                />
                <QuotesModal
                    showModal={showQuotesModal}
                    onClose={this.onClose}
                    onSave={this.onSave}
                    selectedBook={selectedBook}
                />
                <h4>Your Books &hearts;</h4>
                {this.getTableMarkup()}
            </div>
        )
    }
}

export default BookDetails
