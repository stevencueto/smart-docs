import React, { useState } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import { NewDoc } from "./NewDoc";
import Icon from "@material-tailwind/react/Icon";


export default function ModalNew() {
    const [showModal, setShowModal] = React.useState(false);

    return (
        <>
            <Button
                color="lightBlue"
                buttonType="filled"
                size="regular"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="light"
                onClick={(e) => setShowModal(true)}
            >
                <Icon name="description" size="sm" />
                New Docuement
            </Button>

            <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
                <ModalHeader toggler={() => setShowModal(false)}>
                    New Document
                </ModalHeader>
                <ModalBody>
                    <NewDoc setShowModal={setShowModal}/>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="red"
                        buttonType="link"
                        onClick={(e) => setShowModal(false)}
                        ripple="dark"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}