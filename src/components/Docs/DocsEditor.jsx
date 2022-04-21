import React, { useCallback, useEffect, useState, Suspense} from "react"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { io } from "socket.io-client"

;import { EditorState, convertToRaw,convertFromRaw } from 'draft-js';
import { useParams } from "react-router-dom"
import { Editor } from 'react-draft-wysiwyg';
const DocsEditor = (props) => {
    const { id } = useParams()
    const [socket, setSocket] = useState()
    const [show, setShow] = useState(false)
    const [editorState, setEditorState] = React.useState(
      () => EditorState.createEmpty(),
      );
    const handleEditorChange = (state) => {
        setEditorState(state);
        console.log(convertToRaw(state.getCurrentContent()))
    }
  return <>
        <Editor 
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        placeholder="Write something!"
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        /> 
  </>
      }
export default DocsEditor;