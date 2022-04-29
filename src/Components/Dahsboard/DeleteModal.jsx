import {useContext} from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import DocContext from "../../context/DocContex";
export default function ModalDelete(props) {
    const {deleteDocAPICall} = useContext(DocContext)
    return (
        <>

            <Modal size="sm" active={props.showModalDelete} toggler={() => props.setShowModalDelete(false)}>
                <ModalHeader toggler={() => props.setShowModalDelete(false)}>
                    {""}
                </ModalHeader>
                <ModalBody>
                <Button 
                        color="red"
                        buttonType="link"
                        onClick={(e) => deleteDocAPICall(props.doc)}
                        ripple="dark"
                    >
                        Delete
                    </Button>
                </ModalBody>
            </Modal>
        </>
    );
}