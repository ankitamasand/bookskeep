import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import BookForm from './form'

class CustomModal extends Component {

    getFormMarkup = () => {
        let { onClose, onSave, selectedBook } = this.props
        return (
            <BookForm
                onSubmit={onSave}
                onClose={onClose}
                formData={selectedBook}
            />
        )
    }

    render () {
        let { selectedBook, showModal } = this.props
        let { name } = selectedBook
         if (showModal) {
             return (
                 <div className='static-modal'>
                     <Modal.Dialog>
                         <Modal.Header>
                             <Modal.Title>Editing {name}</Modal.Title>
                         </Modal.Header>
                         <Modal.Body>{this.getFormMarkup()}</Modal.Body>
                     </Modal.Dialog>
                 </div>
             )
         }
         return null
    }
}

export default CustomModal
