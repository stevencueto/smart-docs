import React from 'react'
import {Link} from 'react-router-dom'
import { v4 as uuidV4 } from "uuid"

function RandomComp() {
  return (
    <div>
        <Link to={`/documents/${uuidV4()}`}>New Document</Link>
    </div>
  )
}

export default RandomComp