import {useContext} from 'react'
import UserContext from '../../context/UserContex'
import Content from './Content'
import SelectMenu from './ProfilePic'

export default function Profile(props) {
  const {user} =useContext(UserContext)
  return (
    <section className='mt-20'> 
    <div className='h-32'>


    </div>
        <Content docs={props.docs}/>
        <SelectMenu/>

    </section>
  )
}
