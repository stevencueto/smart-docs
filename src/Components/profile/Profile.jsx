import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Content from './Content'
import SelectMenu from './ProfilePic'

export default function Profile(props) {
  let navigate = useNavigate()
  useEffect(()=>{
    navigate('/', {replace: true})
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
