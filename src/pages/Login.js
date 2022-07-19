import React, {useState, useRef} from 'react';
import { useAuth } from '../contexts/AuthContext'
import {Navigate} from 'react-router-dom'

function Login({user}) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")

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
    return <Navigate to="/home"/>
  }

  return (
    <div className="Auth-form-container">
    <form className="Auth-form">
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Log In</h3>
        <div className="text-center">
          Not registered yet?{" "}
          <a className="link-primary" href="/signup">
            Sign Up
          </a>
        </div>
        <div className="form-group mt-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control mt-1"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
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
        <p className="text-center mt-2">
          Forgot <a href="#">password?</a>
        </p>
      </div>
    </form>
  </div>
  )
}

export default Login