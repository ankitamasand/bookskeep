import React, { Component } from 'react'
import { FieldGroup } from '../utils/field-group'
import { Button } from 'react-bootstrap'

class BookForm extends Component {

    constructor (props) {
        super(props)
        this.state = {
            formData: {}
        }
    }

    handleChange = (e, type) => {
        let { formData } = this.state
        let data = Object.assign({}, formData)
        data[type] = e.target.value
        this.setState({ formData: data })
    }

    submitForm = (e) => {
        e.preventDefault()
        let { formData } = this.state
        let { onSubmit } = this.props
        onSubmit(formData)
    }

    render () {
        return (
            <form>
                <FieldGroup
                    id='name'
                    type='text'
                    label='Name'
                    onChange={ (e) => this.handleChange(e, 'name') }
                />
                <FieldGroup
                    id='author'
                    type='text'
                    label='Author'
                    onChange={ (e) => this.handleChange(e, 'author') }
                />
                <FieldGroup
                    id='summary'
                    type='textarea'
                    label='Summary'
                    onChange={ (e) => this.handleChange(e, 'summary') }
                />
                <Button type='submit' onClick={this.submitForm}>Submit</Button>
            </form>
        )
    }
}

export default BookForm
