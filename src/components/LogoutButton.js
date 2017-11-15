import React from 'react'

const LogoutButton = ({ onLogoutResearcherClick }) => {
  return(
    <li className="pure-menu-item">
      <a href="#" className="pure-menu-link" onClick={(event) => onLogoutResearcherClick(event)}>Logout</a>
    </li>
  )
}

export default LogoutButton
