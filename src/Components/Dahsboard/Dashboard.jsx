import {useContext} from 'react'
import {Link} from 'react-router-dom'
import {EditDoc} from './EditDoc.jsx'
import Icon from '@material-tailwind/react/Icon'
import ButtonTail from '../tailwind/Button.jsx'
import DocsContainer from './DocsContainer.jsx'
function Dashboard(props) {
  const onClikc =(e)=>{
    console.log(e)
  }
  return (
    <div className='flex flex-start'>
        {props.docs.map((doc)=>{
          return <div key={doc._id}>
            <Link to={`/documents/${doc.data}`}><DocsContainer doc={doc}/></Link>
            <EditDoc key={doc.data} doc={doc} editDocAPICall={props.editDocAPICall}></EditDoc>
            <ButtonTail text={"delete"} doc={doc} click={props.deleteDocAPICall}/>
          </div>
        })}
    </div>
  )
}

export default Dashboard