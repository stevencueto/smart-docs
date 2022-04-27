import React from 'react'
import Icon from '@material-tailwind/react/Icon'
import MinEditor from '../Docs/minTextEditor.jsx'



const DocsContainer =(props)=> {

  return (
    <div className='doc-container'>
        <MinEditor doc={props.doc}/>
        <div className='doc-description'>
        <p>{props.doc.title}</p>
        <Icon name="description" size="3xl" color="blue"/>
        </div>
    </div>
  )
}

export default DocsContainer