import React, {useContext, useEffect, useState, useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import Icon from '@material-tailwind/react/Icon'
import Button from "@material-tailwind/react/Button";
import DocContext from '../../context/DocContex';
import UserContext from '../../context/UserContex';
import docsLink from '../helpers/docsAPI';

function DocHeader(props) {
    let navigate = useNavigate()
    const {user} = useContext(UserContext)
    const {editDocAPICall} = useContext(DocContext)
    const docRef = useRef(null)
    const [share, setShare] =useState(false)
    const [disabled, setDisabled] = useState(true)
    const [editDoc, setEditDoc]= useState({
        ...props.doc,
    })

    const canShareOrEditName =() =>{
        if(user._id === props.doc.user){
            setShare(true)
            setDisabled(false)
          }
          console.log(user._id , props.doc.user)
    }
    const handleChange = (e)=>{
        e.preventDefault()
        const {name, value} = e.target
        setEditDoc({
          ...editDoc,
          [name]: value
        })
      }

      useEffect(()=>{
        setEditDoc(props.doc)
      }, [props.doc])
    useEffect(()=>{
        if(disabled)return 
        editDocAPICall(editDoc)
    }, [disabled, props.doc])
    useEffect(()=>{
        if(!user) return 
        canShareOrEditName()
    }, [user, props.doc])

  return (
    <div className='max-w-screen-2xl flex justify-between items-center p-3 pb-1'>
        <span onClick={()=> navigate('/', {replace: true})}>
            <Icon
            name="description"
            size="5xl"
            color="blue"
            />
        </span>

        <div className='flex-grow px-2'>
                 <input type="text"
                value={editDoc.title}
                ref={docRef}
                onChange={handleChange}
                disabled={disabled}
                />        
            <div className='flex items-center text-sm space-x-1 -ml-1 h8 text-gray-600'>
                <p className='header-item'>File</p>
                <p className='header-item'>Edit</p>
                <p className='header-item'>Insert</p>
                <p className='header-item'>Format</p>
                <p className='header-item'>Tools</p>
                <p className='header-item'>Add-ons</p>
                <p className='header-item'>Help</p>
            </div>  
        </div>
        {share &&
        <Button
            onClick={props.handleModalFriends}
            color="blue"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark"
        >
            Share <Icon name="lock" />
        </Button>}
    </div>
  )
}

export default DocHeader