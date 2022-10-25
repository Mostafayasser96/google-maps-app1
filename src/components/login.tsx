import React, {
	useState,
	
} from 'react';
import {
	Form,
	Button,
	Modal
} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import {
	useForm,
	SubmitHandler,
} from 'react-hook-form';
import {
	LoginInputs
} from '../types';
import axios, {
	AxiosResponse
} from 'axios';
import {
	useNavigate
} from 'react-router-dom';
import {
	baseUrl
} from './consts';


const Login = () => {
	const navigate = useNavigate();
	const [show, setShow] = useState<boolean>(false);
	const triggerShow = () => setShow(!show);
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<LoginInputs>();

	const setCookie = (response: AxiosResponse<any, any>) => {
		document.cookie = `token=${response.data['token']}`;
	}
	async function getToken(data: LoginInputs) {
		try {
			const response = await axios.post(
				baseUrl +
				`/login`,
				data,
			)
			console.log(response.data['token']);
			console.log(response.request);
			console.log(response.headers);
			console.log(response.data);
            setCookie(response);
            navigate('/map');
		} catch (error) {
			console.log(error);
		}
	}
	const onSubmit: SubmitHandler<LoginInputs> = (data) => {
		console.log("login data is: ", data);
		getToken(data);
	}
	return (
		<div className='login-page'>
			<Form onSubmit={handleSubmit(onSubmit)} className='login-form'>
				<label htmlFor='color' className='username-lbl'>Username: </label>
				<input
					className='username-input'
					id='username'
					type='text'
					placeholder='Insert Username'
					{...register('username', { required: true })}
				/>
				{errors.username && <span>username is required</span>}
				<label htmlFor='name' className='password-lbl'>Password: </label>
				<input
					className='password-input'
					id='password'
					type='password'
					placeholder='Insert Password'
					{...register('password', { required: true })}
				/>
				{errors.password && <span>password is required</span>}
				<Button type="submit" className="login-sub-btn">Change</Button>
			</Form>
			<Modal show={show} onHide={triggerShow}>
				<Modal.Header>
					<Modal.Title>Error Message</Modal.Title>
				</Modal.Header>
				<Modal.Body>this is the error message inside modal</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={triggerShow}>
						Close
					</Button>
					<Button variant="primary" type='submit' onClick={triggerShow}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}
export default Login;