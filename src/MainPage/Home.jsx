import React from 'react';
import { Navbar } from './Navbar';
import { LandingPage } from './LandingPage';
import { Login } from './Login';
import { SignUp } from './SignUp';

export const Home = () => {
    return (
        <>
            <Navbar>
                <LandingPage />
                <Login />
                <SignUp />
            </Navbar>

        </>
    )
}
