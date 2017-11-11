import React from 'react'

const Button = ({text, icon, onButtonClick}) => {
  return(
    <button onClick={onButtonClick}>
      <p>{text}</p>
      <img src={icon} />
    </button>
  )
}

export default Button
