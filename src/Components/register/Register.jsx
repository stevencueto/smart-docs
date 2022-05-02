import React, { useState, useEffect, useRef, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import './register.css'
import userLink from '../helpers/UserAPI'
import Form from 'react-bootstrap/Form'
import Button from '@material-tailwind/react/Button'
import UserContext from '../../context/UserContex'
import CardBody from '@material-tailwind/react/CardBody'
import H5 from '@material-tailwind/react/Heading5'
import Card from '@material-tailwind/react/Card'
import CardHeader from '@material-tailwind/react/CardHeader'
const Register = ()=> {
	const {setUser}= useContext(UserContext)
	let navigate = useNavigate();
	const userNameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const [errMessage, setErrMessage] = useState('');
	const [button, setButton] = useState(false);
	const [passwordInstructions, setPasswordInstructions] = useState(false);
	const [userInstructions, setUserInstructions] = useState(false)
	const validPasswordCharacters = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5,24}$/;
	const validUser = /^[A-z][A-z0-9-_]{5,23}$/;
	const [confirmPasswordInstruction, setConfirmPasswordInstruction] = useState(false);

	const [newUser, setNewUser] = useState({
        username: "",
		name: "",
        email: "",
        password: "",
		confirmPassword: "",
    });
    const  updateNewUser = (e) => {
        const {name, value} = e.target
        setNewUser({
                ...newUser,
                [name]: value
            })
    }

	const comparePassword = () =>{
		if(newUser.password === newUser.confirmPassword && validPasswordCharacters.test(newUser.password)){
			setButton(false);
			setPasswordInstructions(false)
		}else{
			setButton(true);

		}
	};
	const passwordInstructionCheck = () => {
		if(newUser.password){
			if (validPasswordCharacters.test(newUser.password)){
				setPasswordInstructions(false) 
			}else{
			setPasswordInstructions(true)
			}
		}
		if(newUser.confirmPassword){
			if(newUser.password === newUser.confirmPassword){
				setConfirmPasswordInstruction(false)
			}
		}
	}

	useEffect(()=>{
		comparePassword();
		passwordInstructionCheck()
	}, [newUser.password, newUser.confirmPassword]);
	useEffect(() => {
		const token = localStorage.getItem('docs-token')
		if(token){
			navigate("/", { replace: true });
		}
		userNameRef.current.focus();
	}, [])

	const registerUser = async(e) =>{
		console.log(e)
		e.preventDefault();
		if(newUser.password !== newUser.confirmPassword){
			passwordRef.current.focus();
		}
		newUser.confirmPassword = null;
		console.log(newUser)
		try{
			const userRequest = await fetch(`${userLink}auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newUser),
			});
			const fetchedUser = await userRequest.json();
			console.log(fetchedUser)
			if (fetchedUser.success === true) {
				localStorage.setItem('docs-token', fetchedUser.data.token);
				localStorage.setItem('docs-user', JSON.stringify(fetchedUser.data.user));
				setUser(fetchedUser.user)
				navigate("/", { replace: true })
			} else{
				if(fetchedUser.data === "User Already Exist!"){
					setErrMessage(fetchedUser.data);
					userNameRef.current.focus();
				}else if(fetchedUser.data === "Email In Use!"){				
					setErrMessage("Email already in use");
					emailRef.current.focus();
				}else if(fetchedUser.data === "No Password"){
					setErrMessage("Email already in use");
					passwordRef.current.focus();
				}
			}
		}catch(err){
			console.log(err);
			setErrMessage("Server Error");
		}
	};
	const userInstructionsCheck = () =>{
		if(newUser.username){
			if(validUser.test(newUser.username)){
			return setUserInstructions(false)
			}
			setUserInstructions(true)
		}
	}
	
	useEffect(()=>{
		userInstructionsCheck()
	},[newUser.username])

	return (
		<section className='w-96 mt-10 mb-20'>
<Card>
		<CardHeader color="lightBlue" size="lg">
                <H5 color="white">Login</H5>
            </CardHeader>
		{ errMessage && <p className='error-mesage'>
				{errMessage}
		</p> }
		<CardBody>
  <Form className='form-react' onSubmit={(e) => registerUser(e)}>
	  <Form.Group className="mb-3" controlId="formBasicEmail">
		  <Form.Label>Username</Form.Label><br/>
		  <Form.Control
		  value={newUser.username}
		  onChange={updateNewUser}
		  type="text"
		  placeholder="type here"
		  name="username"
		  ref={userNameRef}
		  onFocus={()=> setUserInstructions(true)}
		  onBlur={() => setUserInstructions(false)}
		  required/>
	  </Form.Group>
	  { userInstructions &&
	  <Form.Text className="text-muted">
	<ol className="register-intructions">
					<li className="register-intructions">	Must be 6 to 24 characters.</li>
					<li className="register-intructions">Must begin with a letter.</li>
					<li className="register-intructions"> @ . + - _ </li>
				</ol>
    </Form.Text>
	}
	  <Form.Group className="mb-3" controlId="formBasicEmail">
		  <Form.Label>Email</Form.Label><br/>
		  <Form.Control type="email"
		  value={newUser.email}
		  onChange={updateNewUser}
		  placeholder="type here"
		  name="email"
		  ref={emailRef}
		  required
		  autoComplete="off"/>
	  </Form.Group>

	  <Form.Group className="mb-3">
		  <Form.Label>Name</Form.Label><br/>
		  <Form.Control type="name"
		  value={newUser.name}
		  onChange={updateNewUser}
		  placeholder="type here"
		  name="name"
		  required
		  autoComplete="off"/>
	  </Form.Group>

	  <Form.Group className="mb-3" controlId="formBasicPassword">
		  <Form.Label>Password</Form.Label>
		  <Form.Control 
		  value={newUser.password}
		  onChange={ (e)=> updateNewUser(e)}
		  type="password"
		  placeholder="type here"
		  name="password"
		  ref={passwordRef}
		  onFocus={() => setPasswordInstructions(true)}
		  onBlur={() => setPasswordInstructions(false)}
		  required
		  />
	  </Form.Group>
	  { passwordInstructions &&
	  <Form.Text className="text-muted">
	<ol className="register-intructions">
			<li className="register-intructions">	Password bust be 8 to 24 characters.</li>
			<li className="register-intructions"> Your password can’t be too similar to your other personal information.</li>
			<li className="register-intructions"> Must include uppercase and lowercase letters, a number and a special character.</li>
			<li className="register-intructions"> Allowed special characters are: <span className='special-charachter'>! @ # $ %</span></li>
	</ol>
    </Form.Text>
	}
	<Form.Group className="mb-3" controlId="formBasicPassword">
		  <Form.Label>Confirm Password</Form.Label><br/>
		  <Form.Control 
		  value={newUser.confirmPassword}
		  onChange={ (e) => updateNewUser(e)}
		  type="password"
		  placeholder="type here"
		  name="confirmPassword"
		  required
		  onFocus={()=> setConfirmPasswordInstruction(true)}
		  onBlur={()=> setConfirmPasswordInstruction(false)}
		  />
	  </Form.Group>
	  { confirmPasswordInstruction 
					&& 
					<Form.Text className="text-muted">
						<p className="register-intructions">
                        Passwords must Match.
				</p>
				</Form.Text>
				}
				
					<Button
                        color="lightBlue"
                        buttonType="link"
                        size="lg"
                        ripple="dark"
                    >
                        Register
                    </Button>
  </Form>
  </CardBody>
  </Card>
  </section>
	)
}

export default Register;