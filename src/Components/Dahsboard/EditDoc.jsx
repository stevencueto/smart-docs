import React, {useContext, useState} from 'react'
import DocsContext from '../../context/DocsContext'
export const EditDoc = (props) => {
    const { editDocAPICall } = useContext(DocsContext)
    const [editDoc, setEditDoc]= useState({
        ...props.doc,
    })
    const handleChange = (e)=>{
      const {name, value} = e.target
      setEditDoc({
        ...editDoc,
        [name]: value
      })
      console.log(editDoc)
    }
    const handleSumbit = (e)=>{
      e.preventDefault()
      editDocAPICall(editDoc)
    }
  return (
    <div>
      <form onSubmit={(e)=>handleSumbit(e)}>
        <label htmlFor="title">Title</label>
        <input 
        type="text" 
        name="title"
        value={editDoc.title}
        onChange={(e)=> handleChange(e)}
        /><br/>  
        <button>
          submit
        </button>
      </form>
    </div>
  )
}
