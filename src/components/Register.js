import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { userRegisterApi } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
function Register() {
    const navigate=useNavigate()
    const [usernameValid, setusernameValid] = useState(false)
    const [passwordValid, setpasswordValid] = useState(false)
    const [emailValid, setemailValid] = useState(false)
    const [c_passwordValid, setc_passwordValid] = useState(false)

    // state to hold user data
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        c_password: ""
    })
    const setDatas = (e) => {
        const { value, name } = e.target
        if (name === 'username') {
            if (value.match(/^[a-zA-Z .]+$/)) {
                setusernameValid(false)
            } else {
                setusernameValid(true)
            }
        }
        if (name === 'email') {
            if (value.match(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/)) {
                setemailValid(false)
            } else {
                setemailValid(true)
            }
        }
        if (name === 'password') {
            if (value.match(/^[a-zA-Z0-9@]+$/)) {
                setpasswordValid(false)
            } else {
                setpasswordValid(true)
            }
        }
        if (name === 'c_password') {
            if (value === user.password) {
                setc_passwordValid(false);
            } else {
                setc_passwordValid(true);
            }
        }
        setUser({ ...user, [name]: value });
    }
    // console.log(user);

    const handleRegister=async(e)=>{
        e.preventDefault()
        const { username,email,password,c_password } = user
        if(!username||!password||!email||!c_password)
        {
            toast.warn('Please fill all datas', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

                });
        }
        else{
            // api call 
            const result=await userRegisterApi(user)
            console.log(result);
            if (result.status >= 200 && result.status < 300)
            {
                toast.success('User Registered Successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                navigate('/login')
            }
            else{
                toast.error(result.response.data, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        }
    }
    return (
        <div className='mt-5 p-5 l'>

            <Row className='container'>
            <Col lg={6} md={6}>
                <div className='cr1'>
                    <div className=' cr2'>
                        <h1 className='text-white'>Registration</h1>
                    </div>
                    <div className=' cr3'>
                        <p className='text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
                    </div>
                </div>
                </Col>
                <Col lg={6} md={6}>
                    <>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Username"
                            className="mt-5 mb-3"
                        >
                            <Form.Control name='username' value={user.username} onChange={(e) => setDatas(e)} type="text" placeholder="Username" />
                        </FloatingLabel>
                        {usernameValid &&
                                    <p className='text-danger'>Invalid User Name</p>
                                }
                    </>
                    <>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control name='email' value={user.email} onChange={(e) => setDatas(e)} type="email" placeholder="Email" />
                        </FloatingLabel>
                        {emailValid &&
                                    <p className='text-danger'>Invalid Email</p>
                                }
                    </>
                    <>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control name='password' value={user.password} onChange={(e) => setDatas(e)} type="password" placeholder="Password" />
                        </FloatingLabel>
                        {passwordValid &&
                                    <p className='text-danger'>Invalid Password</p>
                                }
                    </>
                    <br />
                    <>
                        <FloatingLabel controlId="floatingPassword" label="Confirm Password">
                            <Form.Control name='c_password' value={user.c_password} onChange={(e) => setDatas(e)} type="password" placeholder="Confirm Password" />
                        </FloatingLabel>
                        {c_passwordValid &&
                                    <p className='text-danger'>Invalid Confirm Password</p>
                                }
                    </>
                    <Link to={'/newhome'} style={{ textDecoration: 'none' }}>
                        <div className="d-grid gap-2">
                            <Button onClick={(e)=>handleRegister(e)} className='btn btn-primary mt-5 px-5 py-3 mb-2'><b>Register</b> </Button>
                        </div>
                    </Link>
                    <p>Already Member?<Link to={'/login'} style={{ textDecoration: 'none', color: 'darkblue' }}> <b>Login</b></Link></p>

                </Col>
            </Row>
            <ToastContainer />
        </div>
    )
}

export default Register