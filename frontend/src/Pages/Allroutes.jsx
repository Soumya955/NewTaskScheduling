import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashBoard from './DashBoard'
import NotFoundPage from './NotFoundContainer'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'

export default function AllRoutes() {
  return (
    <>
        <Routes>
            <Route path="/" element={<SignInPage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route path="/dashboard" element={<DashBoard/>} />
            <Route path="/*" element={<NotFoundPage/>} />

        </Routes>
    </>
  )
}

