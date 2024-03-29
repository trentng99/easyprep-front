import React, {useState, useRef} from 'react';
import { useAuth } from '../contexts/AuthContext'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Image from 'react-bootstrap/Image';

function Login({user}) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      await login(emailRef.current.value, passwordRef.current.value)
    } catch {
      setError("Failed to log in")
    }
  }

  if(user) {
    navigate('/home')
  }

  return (
    <div className="Auth-form-container">
      {error}
    <form onSubmit={handleSubmit} className="Auth-form">
      <div className="Auth-form-content">
      <Image fluid className='logo pt-2 pb-4 w-100 px-5' src="easyprep2.png" alt="Cooking Image" />
        <h3 className="Auth-form-title">Log In</h3>
        <div className="text-center">
            Don't have an account?{" "}
            <a className="link-primary" href='/signup'>
              Sign Up
            </a>
          </div>
        <div className="form-group mt-3">
          <label>Email address</label>
          <input
            ref={emailRef}
            type="email"
            className="form-control mt-1"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            ref={passwordRef}
            type="password"
            className="form-control mt-1"
            placeholder="Enter password"
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
  )
}

export default Login