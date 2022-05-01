import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import UserContext from '../../context/UserContex';
import { useState, useEffect, useContext } from 'react';

export default function SettingsForm() {
    const {user} = useContext(UserContext)
    const [updateUser, setUpdateUser]=useState({
        ...user
    })
    const updateUserAPI = ()=>{

    }
    return (
        <Card>
            <CardHeader color="lightBlue" contentPosition="none">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">My Account</h2>
                    <Button
                        color="transparent"
                        buttonType="link"
                        size="lg"
                        style={{ padding: 0 }}
                    >
                        Settings
                    </Button>
                </div>
            </CardHeader>
            <CardBody>
                <form>
                    <h6 className="text-lightBlue-500 text-sm mt-3 mb-6 font-light uppercase">
                        User Information
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="lightBlue"
                                placeholder="Username"
                                name="username"
                                value={updateUser.username}
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <Input
                                type="email"
                                color="lightBlue"
                                placeholder="Email Address"
                                name="email"
                                value={updateUser.email}
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="lightBlue"
                                placeholder="First Name"
                                name="firstName"
                                value={updateUser?.firstName}
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="lightBlue"
                                placeholder="Last Name"
                                name="lastName"
                                value={updateUser?.lastName}
                            />
                        </div>
                    </div>

                    <h6 className="text-lightBlue-500 text-sm my-6 font-light uppercase">
                        Contact Information
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-12/12 mb-10 font-light">
                            <Input
                                type="text"
                                color="lightBlue"
                                placeholder="Address"
                            />
                        </div>
                        <div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="lightBlue"
                                placeholder="City"
                            />
                        </div>
                        <div className="w-full lg:w-4/12 px-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="lightBlue"
                                placeholder="Country"
                            />
                        </div>
                        <div className="w-full lg:w-4/12 pl-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="lightBlue"
                                placeholder="Postal Code"
                            />
                        </div>
                    </div>

                    <h6 className="text-lightBlue-500 text-sm my-6 font-light uppercase">
                        About Me
                    </h6>
                    <div className="flex flex-wrap mt-10 font-light">
                        <Textarea color="lightBlue" placeholder="About Me" />
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
