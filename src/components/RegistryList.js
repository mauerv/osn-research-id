import React from 'react'
import RegistryListItem from './RegistryListItem'

const RegistryList = ({ researchers, title, isOwner, onButtonClick }) => {
  return(
    <div>
      <h2>{title}</h2>
      <ul>
          {researchers.map(researcher => {
            if (researcher != 0x0) {
              if (isOwner) {
                return <RegistryListItem key={researcher} id={researcher} onButtonClick={onButtonClick}/>
              } else {
                return <li key={researcher}><p>{researcher}</p></li>
              }
            }
          })}
      </ul>
    </div>
  )
}

export default RegistryList
