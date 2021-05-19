import React, { useContext, useState } from 'react';
import { If, Else, Then } from 'react-if';
import { LoginContext } from './context';

const Login = () => {
	const loginContext = useContext(LoginContext);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	function changeUsername(e) {
		setUsername(e.target.value);
	}

	function changePassword(e) {
		setPassword(e.target.value);
	}

	function submitHandle(e) {
		e.preventDefault();
		loginContext.login(username, password);
	}

	return (
		<If condition={loginContext.loggedIn}>
			<Then>
				<button onClick={loginContext.logout}>Log Out</button>
			</Then>
			<Else>
				<form onSubmit={submitHandle}>
					<input
						type="text"
						name="username"
						placeholder="Enter Username"
						onChange={changeUsername}
					/>
					<input
						type="password"
						name="password"
						placeholder="Enter password"
						onChange={changePassword}
					/>
					<button style={{borderRadius:'8px' ,width:'100px'}}>Login</button>
				</form>
			</Else>
		</If>
	);
};

export default Login;