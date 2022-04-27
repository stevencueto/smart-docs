import React, { useEffect, useState } from 'react'
import Icon from '@material-tailwind/react/Icon'
import MinEditor from '../Docs/minTextEditor.jsx'
import { openDate } from '../helpers/openDate.jsx'


const DocsContainer =(props)=> {
    const [date, setDate] = useState('');
    useEffect(()=>{
        if(!props.doc) return
        setDate(openDate(props.doc.updatedAt))
    },[props.doc])

  return (
    <div className='doc-container'>
        <MinEditor doc={props.doc}/>
        <div className='doc-description'>
            <p className='doc-title'>{props.doc.title}</p>
            <p className='open-date'><Icon name="description" size="xl" color="blue"/><span className='has-date' style={{fontWeight: 200}}> Opened At {date} </span></p>
        </div>
    </div>
  )
}

export default DocsContainer