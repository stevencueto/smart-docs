import React, {useContext} from 'react'
export const NewDoc = (props) => {
    const handleSumbit = (e)=>{
      e.preventDefault()
      props.newDocAPICall(props.newDoc)
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
