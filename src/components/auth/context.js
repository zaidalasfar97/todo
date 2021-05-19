import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import superagent from 'superagent';
dotenv.config();

const API = process.env.REACT_APP_API_SERVER;

export const LoginContext = React.createContext();

const LoginProvider = (props) => {
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        const token = cookie.load('auth');
        valToken(token);
        // eslint-disable-next-line
    }, []);
    function valToken(token) {
        try {
            const user = jwt.decode(token);
            if (user) logainState(true, token, user);
        } catch (error) {
            logainState(false, null, {});
            console.log(`Token Validation Error ${error.message}`);
        }
    }

    function logainState(loggedIn, token, user) {
        cookie.save('auth', token);
        setUser({ user });
        setLoggedIn(loggedIn);
    }

    function logoutState(loggedIn, user) {
        cookie.save('auth', null);
        setUser({ user });
        setLoggedIn(loggedIn);
    }

    async function login(username, password) {
        try {
            const response = await superagent
                .post(`${API}/signin`)
                .set('authorization', `Basic ${btoa(`${username}:${password}`)}`);
            valToken(response.body.token);
        } catch (error) {
            console.error('Signin Error', error.message);
        }
    }

    async function signup(email, username, password, role) {
        try {
            const response = await superagent.post(`${API}/signup`, {
                email,
                username,
                password,
                role,
            });

            valToken(response.body.token);
        } catch (error) {
            console.error('Signup Error', error.message);
        }
    }

    function logout() {
        logoutState(false, {});
    }

    const state = {
        loggedIn,
        user,
        setLoggedIn,
        login,
        signup,
        logout,
        setUser,
    };

    return (
        <LoginContext.Provider value={state}>
            {props.children}
        </LoginContext.Provider>
    );
};

export default LoginProvider;