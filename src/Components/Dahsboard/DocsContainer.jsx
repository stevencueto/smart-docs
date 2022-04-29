import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Icon from '@material-tailwind/react/Icon'
import MinEditor from '../Docs/minTextEditor.jsx'
import { openDate } from '../helpers/openDate.jsx'
import Dropdown from './DocDropDown.jsx'
import { EditDoc } from './EditDoc.jsx'
import ModalEdit from './Modal.jsx'
import ModalDelete from './DeleteModal.jsx'



const DocsContainer =(props)=> {
    const [showModal, setShowModal] = useState(false);
    const handleModal = ()=>{
        setShowModal(!showModal)
    }
    const [showModalDelete, setShowModalDelete] = useState(false);
    const handleModalDelete = ()=>{
        setShowModalDelete(!showModalDelete)
        console.log('modal')
    }

    const [date, setDate] = useState('');
    useEffect(()=>{
        if(!props.doc) return
        setDate(openDate(props.doc.updatedAt))
    },[props.doc])

  return (
    <div className='relative'>
        <Link to={`/documents/${props.doc.data}`}>
            <div className='doc-container'>
                <MinEditor doc={props.doc}/>
                <div className='doc-description'>
                    <p className='doc-title'>{props.doc.title}</p>
                    <p className='open-date'><Icon name="description" size="xl" color="blue"/><span className='has-date' style={{fontWeight: 200}}> Opened At {date} </span></p>
                </div>
            </div>
            </Link>
        <div className=' absolute top-0 right-0 z-10'>
            <Dropdown handleModal={handleModal} handleModalDelete={handleModalDelete} doc={props.doc}></Dropdown>
        </div>
        <ModalEdit showModal={showModal} setShowModal={setShowModal} handleModal={handleModal} doc={props.doc}/>
        <ModalDelete showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} handleModalDelete={handleModalDelete} doc={props.doc}/>

    </div>
  )
}

export default DocsContainer