import React from "react";
import Image from "@material-tailwind/react/Image";

export default function ProfilePic({img}) {
    return (
        <Image
            src={img || 'https://pbs.twimg.com/profile_images/1223706175910211584/tmu8d9fA.jpg'}
            rounded={true}
            raised={false}
            size="xs"
            alt="Rounded Image"
        />
    )
}