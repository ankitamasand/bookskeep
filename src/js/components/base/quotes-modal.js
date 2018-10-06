import React, { Component, Fragment } from 'react'
import { Modal, Button, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap'
import { FieldGroup } from '../../utils/field-group'

class QuotesModal extends Component {

    state = {
        quotes: [],
        editing: null
    }

    getFormMarkup = () => {
        let { selectedBook } = this.props
        let { editing, quotes } = this.state

        return (
            <Fragment>
                <ListGroup>
                    {
                        quotes.map ((quote, index) => {
                            if (editing === index) {
                                return (
                                    <ListGroupItem key={index}>
                                        <FieldGroup
                                            id='name'
                                            type='text'
                                            label='Editing...'
                                            value={quote || ''}
                                            onChange={ (e) => this.saveQuote(e, index) }
                                        />
                                        <span className='glyph'>
                                            <Glyphicon glyph='glyphicon glyphicon-ok-sign' onClick={(e) => this.editDone(e, index)} />
                                        </span>
                                    </ListGroupItem>
                                )
                            }
                            return (
                                <ListGroupItem key={index}>
                                    <span className='quote-text'>{quote}</span>
                                    <span className='quote-actions'>
                                        <span className='glyph'>
                                            <Glyphicon glyph='glyphicon glyphicon-pencil' onClick={() => this.editQuote(index)}/>
                                        </span>
                                        <span className='glyph'>
                                            <Glyphicon glyph='glyphicon glyphicon-trash' onClick={() => this.deleteQuote(index)}/>
                                        </span>
                                    </span>
                                </ListGroupItem>
                            )
                        })
                    }
                </ListGroup>
                <Button onClick={this.addQuote}>Add Quote</Button>
            </Fragment>

        )
    }

    addQuote = () => {
        let { quotes } = this.state
        let newQuotes = [ ...quotes ]
        newQuotes.push('')
        this.setState({ quotes: newQuotes, editing: newQuotes.length - 1 })
    }

    editQuote = (index) => {
        let { editing } = this.state
        this.setState({ editing: index })
    }

    deleteQuote = (index) => {
        let { quotes } = this.state
        let newQuotes = [ ...quotes ]
        newQuotes.splice(index, 1)
        this.setState({ quotes: newQuotes })
    }

    saveQuote = (e, index) => {
        let { quotes } = this.state
        let newQuotes = [ ...quotes ]
        newQuotes[index] = e.target.value
        this.setState({ quotes: newQuotes })
    }

    editDone = () => {
        let { editing } = this.state
        this.setState({ editing: null })
    }

    saveFormData = () => {
        let { selectedBook, onSave } = this.props
        let { quotes } = this.state
        let modifiedDetails = Object.assign({}, selectedBook)
        modifiedDetails.quotes = quotes
        this.setState({ editing: null })
        onSave(modifiedDetails)
    }

    onClose = () => {
        let { onClose } = this.props
        this.setState({ editing: null })
        onClose()
    }

    render () {
        let { showModal, selectedBook } = this.props
        let { name } = selectedBook
        if (showModal) {
            return (
                <div className='static-modal'>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Quotes from {name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{this.getFormMarkup()}</Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle='primary' onClick={this.saveFormData}>Save Changes</Button>
                            <Button onClick={() => this.onClose()}>Close</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            )
        }
        return null
    }

    componentWillReceiveProps (nextProps) {
        let { selectedBook: nextSelectedBook } = nextProps
        let { quotes } = this.state
        this.setState({ quotes: nextSelectedBook.quotes || [] })
    }
}

export default QuotesModal
