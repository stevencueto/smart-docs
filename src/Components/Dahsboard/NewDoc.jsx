import React, {useContext} from 'react'
import DocsContext from '../../context/DocsContext'
export const NewDoc = (props) => {
    const { newDocAPICall } = useContext(DocsContext)
    const handleSumbit = (e)=>{
      e.preventDefault()
      newDocAPICall()
    }
  return (
    <div>
      <form onSubmit={(e)=>handleSumbit(e)}>
        <label htmlFor="title">Title</label>
        <input 
        type="text" 
        name="title"
        value={props.newDoc.title}
        onChange={(e)=> props.handleChange(e)}
        /><br/>  
        <button>
          submit
        </button>
      </form>
    </div>
  )
}
