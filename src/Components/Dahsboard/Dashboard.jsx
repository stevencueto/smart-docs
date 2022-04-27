import {useContext} from 'react'
import {Link} from 'react-router-dom'
import {EditDoc} from './EditDoc.jsx'
import Icon from '@material-tailwind/react/Icon'
import ButtonTail from '../tailwind/Button.jsx'
import MinEditor from '../Docs/minTextEditor.jsx'
function Dashboard(props) {
  return (
    <div>
        {props.docs.map((doc)=>{
          return <div key={doc._id}>
            <MinEditor doc={doc}/>
            <Link to={`/documents/${doc.data}`}>{doc.title}</Link>
            <EditDoc key={doc.data} doc={doc} editDocAPICall={props.editDocAPICall}></EditDoc>
            <Icon name="description" size="3xl" color="blue"/>
            <ButtonTail onClick={()=>props.deleteDocAPICall(doc)}>Delete?</ButtonTail>
          </div>
        })}
    </div>
  )
}

export default Dashboard