import React from 'react'

const LoginButton = ({ onLoginResearcherClick }) => {
  return(
    <li className="pure-menu-item">
      <a href="#" className="pure-menu-link" onClick={(event) => onLoginResearcherClick(event)}>Login</a>
    </li>
  )
}

export default LoginButton
