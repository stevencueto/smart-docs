import React, { useState } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import { NewDoc } from "./NewDoc";

export default function Modal() {
    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <Button
                color="lightBlue"
                type="button"
                onClick={(e) => setShowModalCode(true)}
                ripple="light"
            >
                Make New Document
            </Button>

            <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
                <ModalHeader toggler={() => setShowModal(false)}>
                    New Doc
                </ModalHeader>
                <ModalBody>
                    <NewDoc/>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="red"
                        buttonType="link"
                        onClick={(e) => setShowModalCode(false)}
                        ripple="dark"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}