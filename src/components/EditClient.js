import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { editClientApi, getClientDetailApi } from '../service/allApi';
import Header from './Header';
import Footer from './Footer';

function EditClient() {

    const [clientDetails, setClientDetails] = useState({})
    const {id}=useParams()

    const getUserDetails = async () => {
      if (localStorage.getItem("token")) {
  
        const token = localStorage.getItem("token")
        // console.log(token);
        const reqHeader = {
          "access_token": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
        const result = await getClientDetailApi(id,reqHeader)
        setClientDetails(result?.data.message)
      }
    }
    useEffect(() => {
      getUserDetails()
  
    }, [])
    console.log(clientDetails);

    const navigate = useNavigate()
    const [nameValid, setnameValid] = useState(false)
    const [emailValid, setemailValid] = useState(false)
    const [addressValid, setaddressValid] = useState(false)
    const [phoneNumberValid, setphoneNumberValid] = useState(false)
    const [vatNumberValid, setvatNumberValid] = useState(false)
    const [cityValid, setcityValid] = useState(false)
    const [post_codeValid, setpost_codeValid] = useState(false)

    const setDatas = (e) => {
        const { value, name } = e.target
        if (name === 'name') {
            if (value.match(/^[a-zA-Z .]+$/)) {
                setnameValid(false)
            } else {
                setnameValid(true)
            }
        }
        if (name === 'email') {
            if (value.match(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/)) {
                setemailValid(false)
            } else {
                setemailValid(true)
            }
        }
        if (name === 'address') {
            if (value.match(/^[a-zA-Z0-9 ]+$/)) {
                setaddressValid(false)
            } else {
                setaddressValid(true)
            }
        }
        if (name === 'phoneNumber') {
            if (value.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
                setphoneNumberValid(false)
            } else {
                setphoneNumberValid(true)
            }
        }
        if (name === 'vatNumber') {
            if (value.match(/^[a-zA-Z0-9 ]+$/)) {
                setvatNumberValid(false)
            } else {
                setvatNumberValid(true)
            }
        }
        if (name === 'city') {
            if (value.match(/^[a-zA-Z ]+$/)) {
                setcityValid(false)
            } else {
                setcityValid(true)
            }
        }
        if (name === 'post_code') {
            if (value.match(/^[0-9 ]+$/)) {
                setpost_codeValid(false)
            } else {
                setpost_codeValid(true)
            }
        }
        setClientDetails({ ...clientDetails, [name]: value });
    }
    

    const handleEdit = async (e) => {
        e.preventDefault()

        const { name, email, address, phoneNumber, vatNumber, city, country, post_code } = clientDetails

        const token = localStorage.getItem("token")
        const reqHeader = {
            "access_token": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
        const reqBody = {
            "name":name, " phoneNumber": phoneNumber, "email":email, "address": address,
             "city": city,   "country": country, "vatNumber": vatNumber, "post_code": post_code
        }
      
        const result = await editClientApi(clientDetails._id,reqHeader, reqBody)
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
              navigate('/clients')
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
        <div >
            <div>
                <Header></Header>
            </div>
            <div className='container mt-5 ecli'>
                <h1 className='text-center' style={{color:'darkblue'}}>EDIT CLIENT INFORMATION</h1>

                <Form className='mt-5'>
                    <>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className='anc1'><b> Bill to</b></Form.Label>
                            <Form.Control name='name' value={clientDetails.name} onChange={(e) => setDatas(e)}
                                type="text" placeholder="Billing Name" />
                        </Form.Group>
                        {nameValid &&
                            <p className='text-danger'>Invalid  Name</p>
                        }
                    </>
                    <>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className='anc1'><b>Address</b></Form.Label>
                            <Form.Control name='address' value={clientDetails.address} onChange={(e) => setDatas(e)}
                                type="text" placeholder="Street" />
                        </Form.Group>
                        {addressValid &&
                            <p className='text-danger'>Invalid Street Name</p>
                        }
                    </>
                    <>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control name='city' value={clientDetails.city} onChange={(e) => setDatas(e)}
                                type="text" placeholder="City" />
                        </Form.Group>
                        {cityValid &&
                            <p className='text-danger'>Invalid City Name</p>
                        }
                    </>

                    <Row>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <>
                                <Form.Select name='country' value={clientDetails.country} onChange={(e) => setDatas(e)} aria-label="Default select example">
                                    <option>Country</option>
                                    <option value="India">India</option>
                                    <option value="China">China</option>
                                    <option value="USA">USA</option>
                                </Form.Select>
                            </>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control name='post_code' value={clientDetails.post_code} onChange={(e) => setDatas(e)}
                                        type="number" placeholder="Postcode" />
                                </Form.Group>
                                {post_codeValid &&
                                    <p className='text-danger'>Invalid post_code</p>
                                }
                            </>
                        </Col>
                    </Row>
                    <>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control name='vatNumber' value={clientDetails.vatNumber} onChange={(e) => setDatas(e)}
                                type="text" placeholder="VAT" />
                        </Form.Group>
                        {vatNumberValid &&
                            <p className='text-danger'>Invalid vatNumber</p>
                        }
                    </>
                    <>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className='anc1'><b>Contact</b></Form.Label>
                            <Form.Control name='email' value={clientDetails.email} onChange={(e) => setDatas(e)}
                                type="email" placeholder="Email" />
                        </Form.Group>
                        {emailValid &&
                            <p className='text-danger'>Invalid email</p>
                        }
                    </>
                    <>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control name='phoneNumber' value={clientDetails.phoneNumber} onChange={(e) => setDatas(e)}
                                type="text" placeholder="Phone" />
                        </Form.Group>
                        {phoneNumberValid &&
                            <p className='text-danger'>Invalid phoneNumber</p>
                        }
                    </>
                    <Link to={'/createinvoice2'}>
                        <div className='ac1 d-grid  ms-3 me-5 mb-4' fixed="bottom" >
                            <Button size="lg" onClick={(e) => handleEdit(e)}>
                                Save Client's Information
                            </Button>
                        </div>
                    </Link>
                </Form>


            </div>
            <div>
                <br /> <br />

                <Footer></Footer>
            </div>
            <ToastContainer />
        </div>
    )
}

export default EditClient