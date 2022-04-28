import React, { useState } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import { EditDoc } from "./EditDoc";

export default function ModalEdit(props) {

    return (
        <>

            <Modal size="sm" active={props.showModal} toggler={() => props.setShowModal(false)}>
                <ModalHeader toggler={() => props.setShowModal(false)}>
                    {props.doc.title}
                </ModalHeader>
                <ModalBody>
                    <EditDoc doc={props.doc}></EditDoc>
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