import React from 'react'
import { withRouter } from '../../withrouter'
import Header from '../../Header'
import CopyRight from '../components/footer'
 

const ErrorType = () => {
    return (
        <div>
           <Header />
          error type
          < CopyRight />
        </div>
        
    )
}

export default withRouter(ErrorType)