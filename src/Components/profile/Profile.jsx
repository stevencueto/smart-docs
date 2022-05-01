import {useContext} from 'react'
import UserContext from '../../context/UserContex'
import ProfilePic from './ProfilePic'
import Content from './Content'

export default function Profile(props) {
  const {user} =useContext(UserContext)
  return (
    <section className=''> 
   
      <h1 className="text-center font-semibold text-2xl" color="lightBlue">{user?.username}</h1>
        <div className='w-40 -mt-20'>
            <ProfilePic img={user?.ProfilePic}/>
        </div>
        <Content docs={props.docs}/>
    </section>
  )
}
