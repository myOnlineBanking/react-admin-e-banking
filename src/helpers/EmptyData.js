import React from 'react'

function EmptyData({ status,  text }) {
    return (
      <div className={"alert text-center alert-" + status} role="alert">
        <strong> {text} </strong>
      </div>
    );
}

EmptyData.defaultProps = {
    status: 'warning',
    text: 'no data found',
  }
export default EmptyData
