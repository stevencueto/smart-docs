import {useContext} from 'react'
import {Link} from 'react-router-dom'
import {EditDoc} from './EditDoc.jsx'
import { Container } from '../StyledComponents/Container.styled.jsx'
import ThemeContextPer from '../../context/DocsContext.jsx'

function Dashboard(props) {
  const {theme} = useContext(ThemeContextPer)
  return (
    <Container bg={theme}>
      <ul>
      </ul>
        {props.docs.map((doc)=>{
          return <li key={doc._id}>
            {doc.title}
            <Link to={`/documents/${doc.data}`}>{doc.title}</Link>
            <EditDoc key={doc.data} doc={doc} editDocAPICall={props.editDocAPICall}></EditDoc>
            <button onClick={()=>props.deleteDocAPICall(doc)}>Delete?</button>
          </li>
        })}
    </Container>
  )
}

export default Dashboard