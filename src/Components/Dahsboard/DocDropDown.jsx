import React from "react";
import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"
import DropdownLink from "@material-tailwind/react/DropdownLink"
export default function DropdownComp(props) {
    return (
        <Dropdown
            color="lightBlue"
            placement="bottom-start"
            buttonText="..."
            buttonType="filled"
            size="small"
            rounded={false}
            block={false}
            ripple="light"
        >
            <DropdownItem color="lightBlue" ripple="light" onClick={(e)=> props.handleModal()}>
                Rename
            </DropdownItem>
            <DropdownItem
                href="#"
                color="lightBlue"
                ripple="light"
                onClick={()=>{props.handleModalDelete(); console.log('modal')}}
            >
                Remove
            </DropdownItem>
            <DropdownItem color="lightBlue" ripple="light">
                Open in a new Tab
            </DropdownItem>
        </Dropdown>
    )
}