import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { userLoginApi } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
function Login() {
    const navigate=useNavigate()
    const [usernameValid, setusernameValid] = useState(false)
    const [passwordValid, setpasswordValid] = useState(false)

   // state to hold user data
   const [user, setUser] = useState({
    username: "",
    password: ""
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
 
    if (name === 'password') {
        if (value.match(/^[a-zA-Z0-9@]+$/)) {
            setpasswordValid(false)
        } else {
            setpasswordValid(true)
        }
    }
  
    setUser({ ...user, [name]: value });
}
console.log(user);
const handleLogin=async(e)=>{
    e.preventDefault()
    const { password,username } = user
        if (!password || !username) {
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
        else
        {
             // api call
             const bodyData = { password,username }
             const result = await userLoginApi(bodyData)
             console.log(result);
             if (result.status>= 200 && result.status < 300) {
                localStorage.setItem("currentUserId",JSON.stringify(result.data.user._id))
                // console.log(result.data.user._id);
                localStorage.setItem("token",result.data.token)
               
                setUser({username:"",password:""})   
              
                navigate('/home')
            }
            else {
                toast.error(result.response.data.error, {
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
                <div className='cl1'>
                    <div className=' cl2'>
                        <h1 className='text-white'> you title can as long</h1>
                    </div>
                    <div className=' cl3'>
                        <p className='text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus nihil suscipit nesciunt assumenda praesentium rem et ex quia fuga eligendi ipsam esse voluptatum quisquam ipsum aut, soluta aliquid saepe eos.</p>
                    </div>
                    <div>
                        <img className='cl4' src="https://i.postimg.cc/j5KBMgMv/space-ship-removebg-preview.png" 
                        alt="space ship" />
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
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control name='password' value={user.password} onChange={(e) => setDatas(e)} type="password" placeholder="Password" />
                        </FloatingLabel>
                        {passwordValid &&
                                    <p className='text-danger'>Invalid Password</p>
                                }
                    </>
                    <Link to={'/home'} style={{ textDecoration: 'none' }}>
                        <div className="d-grid gap-2">
                            <Button onClick={(e)=>handleLogin(e)} className='btn btn-primary mt-5 px-5 py-3 mb-2'><b>Login</b> </Button>
                        </div>
                    </Link>
                    <p>Forgot your password? <b>Restore</b></p>

                    <Link to={'/register'} style={{ textDecoration: 'none' }}>
                        <div className="d-grid gap-2">
                            <Button  className='btn  mt-5 px-5 py-3 mb-2' style={{ backgroundColor: '#00308F' }}><b> Sign Up</b></Button>
                        </div>
                    </Link>
                </Col>
            </Row>
            <ToastContainer />
        </div>
    )
}

export default Login