import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './Home'
import { Login } from './Login'
import { Navbar } from './Navbar'

export const LandingPage = () => {
    return (
        <>
            <Navbar />
            <Home />
        </>
    )
}
