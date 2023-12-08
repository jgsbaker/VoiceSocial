import React, {useContext} from 'react'
import {Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Navbar from './pages/components/NavBar'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Public from './pages/Public'
import { AContext } from './pages/components/auth/authContext'
import ProtectedRoute from "./pages/components/ProtectedRoute"
export default function App(){
  const {logout, auth: {token} } = useContext(AContext)
  return (
    <BrowserRouter>
      <div className="app">
      {token && <Navbar logout={logout}/>}
      <h3 style={{color: "darkblue"}}>Voice Social</h3>
        <Routes>
        <Route 
            path="/"
            element={token ? <Navigate to="/profile"/> : <Auth />}
          />
          <Route 
            path="/profile"
            element={
              <ProtectedRoute token={token} redirectTo="/">
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/public"
            element={
            <ProtectedRoute token={token} redirectTo="/">
              <Public style={{padding: 5}}/>
            </ProtectedRoute>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}