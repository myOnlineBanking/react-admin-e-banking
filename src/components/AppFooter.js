import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">&copy; 2022 creativeLabs.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Cretaed by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          ENSA-SAFI
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
