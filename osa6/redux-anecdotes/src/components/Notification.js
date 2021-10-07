import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  let visible = (props.notification === '') ? false : true

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: visible ? '' : 'none'
  }
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)