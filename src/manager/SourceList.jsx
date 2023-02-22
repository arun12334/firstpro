import React from 'react'
import { withRouter } from '../withrouter'
import Header from '../Header'
import CopyRight from './components/footer'

const SourceList = () => {
    return (
        <div>
            <Header />
            <div>
                hello
            </div>
            <CopyRight />
        </div>
    )
}

export default withRouter(SourceList)