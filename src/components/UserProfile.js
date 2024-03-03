import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { editUserApi, getUserDetailsApi } from '../service/allApi';
import { ToastContainer, toast } from 'react-toastify';
function UserProfile() {

  const [passwordValid, setpasswordValid] = useState(false)
  const [emailValid, setemailValid] = useState(false)
  const [c_passwordValid, setc_passwordValid] = useState(false)
  const [first_nameValid, setfirst_nameValid] = useState(false)
  const [last_nameValid, setlast_nameValid] = useState(false)
  const [addressValid, setaddressValid] = useState(false)
  const [cityValid, setcityValid] = useState(false)
  const [postal_codeValid, setpostal_codeValid] = useState(false)

  const [userDetails, setUserDetails] = useState({})
  const getUserDetails = async () => {
    if (localStorage.getItem("token")) {

      const token = localStorage.getItem("token")
      // console.log(token);
      const reqHeader = {
        "access_token": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
      const result = await getUserDetailsApi(reqHeader)
      setUserDetails(result?.data)
    }
  }
  useEffect(() => {
    getUserDetails()

  }, [])
  // console.log(userDetails);

 
  const setDatas = (e) => {
    const { value, name } = e.target


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
      if (value === userDetails.password) {
        setc_passwordValid(false);
      } else {
        setc_passwordValid(true);
      }
    }
    if (name === 'first_name') {
      if (value.match(/^[a-zA-Z .]+$/)) {
        setfirst_nameValid(false)
      } else {
        setfirst_nameValid(true)
      }
    }
    if (name === 'last_name') {
      if (value.match(/^[a-zA-Z .]+$/)) {
        setlast_nameValid(false)
      } else {
        setlast_nameValid(true)
      }
    }
    if (name === 'address') {
      if (value.match(/^[a-zA-Z .]+$/)) {
        setaddressValid(false);
      } else {
        setaddressValid(true);
      }
    }
    if (name === 'city') {
      if (value.match(/^[a-zA-Z .]+$/)) {
        setcityValid(false)
      } else {
        setcityValid(true)
      }
    }
    if (name === 'postal_code') {
      if (value.match(/^[0-9 ]+$/)) {
        setpostal_codeValid(false)
      } else {
        setpostal_codeValid(true)
      }
    }
  
    setUserDetails({ ...userDetails, [name]: value });
  }
  console.log(userDetails);
 
  const handleEdit = async (e) => {
    e.preventDefault()
    
    const { first_name,last_name,email,country,city,password,postal_code,address } = userDetails

        const token = localStorage.getItem("token")
        const reqHeader = {
            "access_token": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
        const reqBody = {
            "first_name": first_name, " last_name": last_name, "email":email, "address": address,
             "city": city,   "country": country, "postal_code": postal_code, "password": password
        }
      
        const result = await editUserApi(userDetails._id,reqHeader, reqBody)
        console.log(result);
        if (result.status >= 200 && result.status < 300) {
            toast.success("Updated Successfully", {
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
        else {
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
   


  return (
    <div>
      <div className='up1 container pt-4'>
        <Row>
          <Col lg={4} md={4} sm={4} xs={4}>
            <Link to={'/home'}>
              <i class="fa-solid fa-angle-left fa-2x text-white"></i>
            </Link>
          </Col>
          <Col lg={4} md={4} sm={4} xs={4}>
            <h3 className='text-white'>Profile</h3>
          </Col>
          <Col lg={4} md={4} sm={4} xs={4}>
            <div className='he4'>
              <i class="fa-solid fa-bell"></i>
            </div>
          </Col>
        </Row>
      </div>
      <div className='up2 container w-75 mb-5'>
        <Form className='up4'>
          <>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className='upl'><b>Contact</b></Form.Label>
              <Form.Control type="text" name='first_name' onChange={(e) => setDatas(e)} 
              value={userDetails.first_name} placeholder="Jessica" />
            </Form.Group>
            {first_nameValid &&
              <p className='text-danger'>Invalid first name</p>
            }
          </>
          <>
            <Form.Group>
              <Form.Control type="text" name='last_name' onChange={(e) => setDatas(e)} 
              value={userDetails.last_name} placeholder="Johns" />
            </Form.Group>
            {last_nameValid &&
              <p className='text-danger'>Invalid last name</p>
            }
          </> <br />
          <>
            <Form.Group>
              <Form.Control type="email" name='email' onChange={(e) => setDatas(e)} value={userDetails.email} placeholder="finance@banana.com" />
            </Form.Group>
            {emailValid &&
              <p className='text-danger'>Invalid email</p>
            } <br />
          </>
          <>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className='upl'><b>Address</b></Form.Label>
              <Form.Control type="text" name='address' onChange={(e) => setDatas(e)} value={userDetails.address} placeholder="Lorem ipsum str" />
            </Form.Group>
            {addressValid &&
              <p className='text-danger'>Invalid address</p>
            }
          </>
          <>
            <Form.Group>
              <Form.Control type="text" name='city' onChange={(e) => setDatas(e)} value={userDetails.city} placeholder="kytv" />
            </Form.Group> <br />
            {cityValid &&
              <p className='text-danger'>Invalid city</p>
            }
          </>
          <Row>
            <Col lg={6} md={6} sm={6} xs={6}>
              <>
                <Form.Select value={userDetails.country} onChange={(e) => setDatas(e)} name='country' aria-label="Default select example">
                  <option value="1">Ukraine</option>
                  <option value="2">China</option>
                  <option value="3">USA</option>
                </Form.Select>
            
              </>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
              <>
                <Form.Group>
                  <Form.Control value={userDetails.postal_code} onChange={(e) => setDatas(e)} name='postal_code' type="text" placeholder="0813" />
                </Form.Group>
                {postal_codeValid &&
                  <p className='text-danger'>Invalid postal code </p>
                }
              </> <br />
            </Col>
          </Row>
          <>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className='upl'><b>Your Password</b></Form.Label>
              <Form.Control value={userDetails.password} onChange={(e) => setDatas(e)}  name='password' type="password" placeholder="Password" />
            </Form.Group>
            {passwordValid &&
              <p className='text-danger'>Invalid password</p>
            }
          </>
          <>
            <Form.Group>
              <Form.Control type="password" onChange={(e) => setDatas(e)}
               value={userDetails.c_password}
                name='c_password' placeholder="Confirm Password" />
            </Form.Group>
            {c_passwordValid &&
              <p className='text-danger'>Invalid confirm password</p>
            }
          </> <br />
          <div>
            <Button variant="primary" size="lg"  onClick={(e) => handleEdit(e)}>
              Save the Information
            </Button>
          </div>
        </Form>
      </div>

      <div className='up3'>
        <img style={{ width: '90px', height: '90px' }} src="https://i.postimg.cc/wjnP3Lb5/download-removebg-preview-1.png" alt="" />
      </div>
      <ToastContainer />
    </div>
  )
}

export default UserProfile