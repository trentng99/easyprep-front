import React, {useState, useRef} from 'react';
import { useAuth } from '../contexts/AuthContext'
import {Navigate} from 'react-router-dom'

function SignUp({user}) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { register, login } = useAuth()
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      await register(emailRef.current.value, passwordRef.current.value)
      console.log('success')
    } catch {
      setError("Failed to log in")
    }
  }

  if(user) {
    return <Navigate to="/home"/>
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <a className="link-primary" href='/login'>
              Sign In
            </a>
          </div>
          {/* <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div> */}
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              ref={emailRef}
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              ref={passwordRef}
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUp