import {useContext, useState} from 'react'
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import DocContext from '../../context/DocContex';
import Icon from "@material-tailwind/react/Icon";


export const NewDoc = ({setShowModal}) => {
  const {newDoc, handleChange,newDocAPICall }= useContext(DocContext)
    const handleSumbit = (e)=>{
      e.preventDefault()
        newDocAPICall(newDoc)
        setShowModal(false)

    }
  return (
    <div>
      <form onSubmit={(e)=>handleSumbit(e)}>
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
            placeholder="title"
            iconFamily="material-icons"
            iconName="description"
        />  
        <Button
            color="lightBlue"
            buttonType="filled"
            size="regular"
            rounded={true}
            block={false}
            iconOnly={true}
            ripple="light"
        >
          <div className='my-4'>
            <Icon name="description" size="sm" />
          </div>
        </Button>
      </form>
    </div>
  )
}
