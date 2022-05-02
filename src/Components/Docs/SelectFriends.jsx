import FriendsContext from "../../context/FriendContex";
import DocContext from "../../context/DocContex";
import { useContext, useState } from "react"
import Icon from '@material-tailwind/react/Icon'
import Button from "@material-tailwind/react/Button";

import React from 'react'

function SelectFriends(props) {
    const {friends} =useContext(FriendsContext)
    const [addFriend, setAddFriend] =useState("")
    const {addToDoc} = useContext(DocContext)

    const handleChange=(e)=>{
        const {value} = e.target
        setAddFriend(value)
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        addToDoc(props.doc._id, addFriend)
    }
  return (
    <div>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <select  name="friend" required value={addFriend} onChange={(e)=> handleChange(e)}>
                <option></option>
                {friends.map((one)=>{
                   return <option
                   key={one._id}
                   value={one._id}
                   >
                       {one.username}
                   </option>
                })
                }
            </select>
            <Button
            color="blue"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark"
        >
            Share <Icon name="people" />
        </Button>
        </form>
    </div>
  )
}

export default SelectFriends