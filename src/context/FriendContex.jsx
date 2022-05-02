
import { createContext, useState, useEffect, useMemo } from 'react';
import friendsLink from '../Components/helpers/friendsAPICall';

const FriendsContext = createContext({});

export const FriendsProvider = ({ children }) => {
    const [friendId, setFriendId]= useState('')
    const [friends, setFriends] = useState([])
    const [search, setSearch] = useState('');

    const populateFriends = async()=>{
        try {
            const req = await fetch(`${friendsLink}friend`, {
                method: 'GET',
                headers: {
                    'x-access-token': localStorage.getItem('docs-token'),
                }
              })
            const res = await req.json()
            if(res.success){
                setFriendId(res.data._id)
                setFriends(res.data.friends)
            }
        } catch (error) {
            
        }
    }

    const addFriend = async(id)=>{
        const friend ={friend: id}
        try {
            const req = await fetch(`${friendsLink}friend/${friendId}`, {
                method: 'PUT',
                body: JSON.stringify(friend),
                headers: {
                    'x-access-token': localStorage.getItem('docs-token'),
                }
              })
            const res = await req.json()
            if(res.success){
                setFriends(res.data)
                console.log(res.data)
            }
            console.log(res.data)
        } catch (error) {
            
        }
    }

    const provValue = useMemo(()=>({friends,populateFriends,addFriend}), [friends, setFriends])


    return (
        <FriendsContext.Provider value={provValue}>
            {children}
        </FriendsContext.Provider>
    )
}

export default FriendsContext;