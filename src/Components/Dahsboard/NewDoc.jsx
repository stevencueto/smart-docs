import React from 'react'
import InputIcon from "@material-tailwind/react/InputIcon";

export const NewDoc = (props) => {
    const handleSumbit = (e)=>{
      e.preventDefault()
      props.newDocAPICall(props.newDoc)
    }
  return (
    <div>
      <form onSubmit={(e)=>handleSumbit(e)}>
        <label htmlFor="title">Title</label>
         <InputIcon
            value={props.newDoc.title}
            type="text"
            color="lightBlue"
            size="regular"
            name="title"
            required
            min="4"
            onChange={(e)=> props.handleChange(e)}
            outline={true}
            placeholder="Outline Input with Icon"
            iconFamily="material-icons"
            iconName="description"
        />  
        <button>
          submit
        </button>
      </form>
    </div>
  )
}
