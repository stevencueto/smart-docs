import DocsContainer from './DocsContainer.jsx'
import {useEffect} from "react"
import H6 from "@material-tailwind/react/Heading2";
import ModalNew from './ModalNew.jsx';

function Dashboard(props) {
  useEffect(()=>{props.handleShow(true)},[])
  return (
    <section style={{ minHeight: '80vh'}}>
      <h3 className='text-lg text-center my-4'>Your Documents </h3>
      <div className='my-4 mx-4'>
        <ModalNew/>
      </div>
      <div className='doc-grid' >
          {props.docs.map((doc)=>{
            return  <DocsContainer key={doc._id} doc={doc} editDocAPICall={props.editDocAPICall}/>
          })}
      </div>
    </section>
  )
}

export default Dashboard