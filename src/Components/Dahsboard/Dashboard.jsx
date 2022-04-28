import DocsContainer from './DocsContainer.jsx'
import {useEffect} from "react"
function Dashboard(props) {
  useEffect(()=>{props.handleShow(true)},[])
  return (
    <div className='doc-grid' >
        {props.docs.map((doc)=>{
          return  <DocsContainer key={doc._id} doc={doc} editDocAPICall={props.editDocAPICall}/>
        })}
    </div>
  )
}

export default Dashboard