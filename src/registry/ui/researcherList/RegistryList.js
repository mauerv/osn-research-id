import React from 'react'

const RegistryList = ({ researchers, title }) => {
  return(
    <div>
      <h2>{title}</h2>
      <ul>
          {researchers.map(researcher => <li key={researcher}>{researcher}</li>)}
      </ul>
    </div>
  )
}

export default RegistryList
