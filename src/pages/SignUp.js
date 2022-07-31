import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { db } from "../firebase-config";
import {
  collection,
  addDoc,
} from "firebase/firestore";

function SignUp({user}) {
  const navigate = useNavigate();
  const passwordRef = useRef()
  const cPasswordRef = useRef()
  const { register } = useAuth()
  const [error, setError] = useState("")
  const [state, setState] = useState({})

  //Reference to users collection in firebase db
  const userCollectionRef = collection(db, "users")

  //Handle Form Submission
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if(cPasswordRef.current.value === passwordRef.current.value) {
        await register(state.email, passwordRef.current.value)
        if(register) {
          await addUser()
          navigate('/buildprofile')
        }
      } else {
        setError('Password do not match')
      }
    } catch {
      setError("An error has occured.")
    }
  }

  //Handle the the state of the form fields.
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  //Function to throw data into database
  const addUser = async () => {
    await addDoc(userCollectionRef, state);
  }

  function showPassword() {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
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
          <p className='mt-3 text-danger text-center font-weight-bold'>{error}</p>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              name='name'
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              name='email'
              type="email"
              onChange={handleChange}
              className="form-control mt-1"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <InputGroup className='mt-1'>
              <Form.Control
                type="password"
                ref={passwordRef}
                className="form-control"
                placeholder="Password"
                required
              />
              <Button variant="outline-secondary" onClick={showPassword}>
                <i className="bi bi-eye-slash"
                  id="togglePassword"></i>
              </Button>
            </InputGroup>
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <InputGroup className='mt-1'>
              <Form.Control
                type="password"
                ref={cPasswordRef}
                className="form-control"
                placeholder="Password"
                required
              />
            </InputGroup>
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