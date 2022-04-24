import React from 'react'
import {Link} from 'react-router-dom'
import {EditDoc} from './EditDoc.jsx'
function Dashboard(props) {
  return (
    <div>
      <ul>

      </ul>
        {props.docs.map((doc)=>{
          return <li key={doc._id}>
            {doc.title}
            <Link to={`/documents/${doc.data}`}>{doc.title}</Link>
            <EditDoc key={doc.data} doc={doc}></EditDoc>
          </li>
        })}
    </div>
  )
}

export default Dashboard