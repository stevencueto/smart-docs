import React from "react";
import Image from "@material-tailwind/react/Image";

export default function ProfilePic({img}) {
    return (
        <Image
            src={img}
            rounded={true}
            raised={false}
            alt="Rounded Image"
        />
    )
}