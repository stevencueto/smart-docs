import {useContext} from 'react'
import InputIcon from "@material-tailwind/react/InputIcon";
import DocContext from '../../context/DocContex';

export const NewDoc = () => {
  const {newDoc, handleChange,newDocAPICall }= useContext(DocContext)
    const handleSumbit = (e)=>{
      e.preventDefault()
      newDocAPICall(newDoc)
    }
  return (
    <div>
      <form onSubmit={(e)=>handleSumbit(e)}>
        <label htmlFor="title">Title</label>
         <InputIcon
            value={newDoc.title}
            type="text"
            color="lightBlue"
            size="regular"
            name="title"
            required
            min="4"
            onChange={(e)=> handleChange(e)}
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
