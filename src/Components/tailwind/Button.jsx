import React from "react";
import Button from "@material-tailwind/react/Button";

export default function ButtonTail(props) {
    return (
        <Button 
            onClick={()=>props.click(props.doc)}
            color="lightBlue"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="light"
        >{props.text}</Button>
    )
}