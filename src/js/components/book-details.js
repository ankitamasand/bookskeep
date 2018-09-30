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
        this.setState({ showModal: false })
    }

    render () {
        let { showModal, selectedBook } = this.state
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
}

export default BookDetails
