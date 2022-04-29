import React, { useContext } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import UserContext from '../../context/UserContex'
export default function ModalPermission(props) {
    const {user} =useContext(UserContext)
    return (
        <>

            <Modal size="sm" active={props.showModal} toggler={() => props.setShowModal(false)}>
                <ModalHeader toggler={() => props.setShowModal(false)}>
                    {user?.username || "User Not Allowed"}
                </ModalHeader>
                <ModalBody>
                    You do not have persmission for this documents, please request it!
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="red"
                        buttonType="link"
                        onClick={(e) => props.handleModal(false)}
                        ripple="dark"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}