import React, {useEffect, useState} from 'react'

export const EditDoc = (props) => {
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
      console.log(editDoc)
    }
    const handleSumbit = (e)=>{
      e.preventDefault()
    }
    useEffect(()=>{
      if(editDoc.title.length > 3){
        props.editDocAPICall(editDoc)
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
        {editDoc.title.length <= 2&& "name must be >= 3 letters"}
    </div>
  )
}
