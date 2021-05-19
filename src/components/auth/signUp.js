import React, { useContext, useState } from 'react';
import { If, Else, Then } from 'react-if';
import { LoginContext } from './context';

const SignUp = () => {
    const loginContext = useContext(LoginContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user');

    function changeUsername(e) {
        setUsername(e.target.value);
    }

    function changePassword(e) {
        setPassword(e.target.value);
    }

    function changeEmail(e) {
        setEmail(e.target.value);
    }

    function changeRole(e) {
        setRole(e.target.value);
    }

    function submitSignup(e) {
        e.preventDefault();
        loginContext.signup(email, username, password, role);
    }

    return (
        <If condition={loginContext.loggedIn}>
            <Then>
                <div></div>
            </Then>
            <Else>
                <form onSubmit={submitSignup} style={{ margin: 'auto  auto', padding: 'auto auto' }}>
                    <input type="email" name="email" placeholder="Enter Email" onChange={changeEmail} />
                    <input type="text" name="username" placeholder="Enter Username" onChange={changeUsername} />
                    <input type="password" name="password" placeholder="Enter password" onChange={changePassword} />
                    <select name="roles" id="roles" onChange={changeRole}>
                        <option value="user">user</option>
                        <option value="editor">editor</option>
                        <option value="admin">admin</option>
                    </select>

                    <button style={{ borderRadius: '8px', width: '100px' }}>SignUp</button>
                </form>
            </Else>
        </If>
    );
};

export default SignUp;