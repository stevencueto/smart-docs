import React, { useContext } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import SelectFriends from "./SelectFriends";
export default function ShareModal(props) {
    return (
        <>

            <Modal size="sm" active={props.showModalFriends} toggler={() => props.setShowModalFriends(false)}>
                <ModalHeader toggler={() => props.setShowModalFriends(false)}>
                    Please Select Friend
                </ModalHeader>
                <ModalBody >
                <SelectFriends doc={props.doc}/>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="red"
                        buttonType="link"
                        ripple="dark"
                    >
                        Go Back
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}