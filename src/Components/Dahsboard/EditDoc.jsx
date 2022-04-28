import React, {useEffect, useState, useContext} from 'react'
import DocContext from '../../context/DocContex'

export const EditDoc = (props) => {
  const {editDocAPICall} = useContext(DocContext)
    const [editDoc, setEditDoc]= useState({
        ...props.doc,
    })
    const handleChange = (e)=>{
      e.preventDefault()
      const {name, value} = e.target
      setEditDoc({
        ...editDoc,
        [name]: value
      })
    }
    useEffect(()=>{
      if(editDoc.title.length > 3){
        editDocAPICall(editDoc)
      }
    }, [editDoc])
  return (
    <div>
        <input 
        type="text" 
        name="title"
        value={editDoc.title}
        min="4"
        required
        onChange={(e)=> handleChange(e)}
        />
        {editDoc.title.length <= 2 && "name must be >= 3 characters"}
    </div>
  )
}
