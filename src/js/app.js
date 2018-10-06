import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import Header from './components/header'
import Body from './components/body'
import MainCss from '../scss/app.scss'
import { registerSw } from './utils/registerSw'

const App = () => {
    return (
        <Fragment>
            <Header />
            <Body />
        </Fragment>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
registerSw()
