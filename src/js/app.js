import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import Header from './components/header'
import Body from './components/body'
import MainCss from '../scss/app.scss'

const App = () => {
    return (
        <Fragment>
            <Header />
            <Body />
        </Fragment>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
