import {useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContex'
import Content from './Content'
import SelectMenu from './ProfilePic'

export default function Profile(props) {
  let navigate = useNavigate()
  const {user} =useContext(UserContext)
  useEffect(()=>{
    if(!localStorage.getItem('docs-token'))navigate('/', {replace: true})
  }, [])
  return (
    <section className='mt-20'> 
    <div className='h-32'>


    </div>
        <Content docs={props.docs}/>
        <SelectMenu/>

    </section>
  )
}
