import DocsContainer from './DocsContainer.jsx'
import { Link } from 'react-router-dom'
function Dashboard(props) {
  return (
    <div className='doc-grid' >
        {props.docs.map((doc)=>{
          return <Link to={`/documents/${doc.data}`} key={doc._id}>
            <DocsContainer  doc={doc} editDocAPICall={props.editDocAPICall}/>
          </Link>
        })}
    </div>
  )
}

export default Dashboard