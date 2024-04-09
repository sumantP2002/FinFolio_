import React from 'react'
import { useGlobalContext } from '../../context/globalContext'
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layout';


function Transactions() {
    const {transactionHistory} = useGlobalContext()

    const [...history] = transactionHistory();

  return (
    <InnerLayout>
        <div>
        <div>
            <div>
                <History/>
            </div>
        </div>
    </div>
    </InnerLayout>
    
    
  )
}



export default Transactions