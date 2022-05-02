import React ,{ useState, useEffect, useRef, useContext} from 'react'
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import InputIcon from "@material-tailwind/react/InputIcon";
import Button from "@material-tailwind/react/Button";
import H5 from "@material-tailwind/react/Heading5";
import UserContext from "../context/UserContex";
import { useNavigate } from "react-router-dom";
import userLink from './helpers/UserAPI'


export default function Login() {
    const {user, setUser}= useContext(UserContext)
	let navigate = useNavigate();

	const [errMessage, setErrMessage] = useState("")
    const [possibleUser, setPossibleUser] = useState({
        username: '',
        password: ''
    })
    const  updatePossibleUser = (e) => {
        const {name, value, type, checked} = e.target
        setPossibleUser(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

	const loginUser = async(e) => {
		e.preventDefault()
		try{
			const loginRequest = await fetch(`${userLink }auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					// "withCredentials": true
				},
				body: JSON.stringify(possibleUser),
			})
			const loginResponse = await loginRequest.json()
			if (loginResponse.success === true) {
				localStorage.setItem('docs-token', loginResponse.data.token)
				localStorage.setItem('docs-user', JSON.stringify(loginResponse.data.user))
				setUser(loginResponse.user)
				setPossibleUser({
					email: '',
					password: ''
				})
                navigate("/", { replace: true });
			} else{
				setErrMessage(loginResponse.data)
			}
		}catch(err){
			setErrMessage('Server Error')
		}
		
	}
	useEffect(() => {
		const token = localStorage.getItem('docs-token')
		if(token){
			navigate("/", { replace: true });
		}
	}, [])


    return (
        <section className="w-96 mt-10">
            {errMessage && <p>{errMessage}</p>}
            <form onSubmit={loginUser}>
            <Card>
            <CardHeader color="lightBlue" size="lg">
                <H5 color="white">Login</H5>
            </CardHeader>

            <CardBody>
                <div className="mb-8 px-4">
                    <InputIcon
                        type="email"
                        color="lightBlue"
                        placeholder="Username"
                        iconName="person"
                        name="email"
                        value={possibleUser.email}
                        onChange={updatePossibleUser}
                    />
                </div>
                <div className="mb-4 px-4">
                    <InputIcon
                        type="password"
                        color="lightBlue"
                        name="password"
                        placeholder="password"
                        iconName="lock"
                        value={possibleUser.password}
                        onChange={updatePossibleUser}


                    />
                </div>
            </CardBody>
            <CardFooter>
                <div className="flex justify-center">
                    <Button
                        color="lightBlue"
                        buttonType="link"
                        size="lg"
                        ripple="dark"
                    >
                        Login
                    </Button>
                </div>
            </CardFooter>
        </Card>
        </form>

        </section>
        
    );
}