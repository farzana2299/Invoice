import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { addClientApi } from '../service/allApi';

function AddNewClient() {
    const navigate=useNavigate()
    const [nameValid, setnameValid] = useState(false)
    const [emailValid, setemailValid] = useState(false)
    const [addressValid, setaddressValid] = useState(false)
    const [phoneNumberValid, setphoneNumberValid] = useState(false)
    const [vatNumberValid, setvatNumberValid] = useState(false)
    const [cityValid, setcityValid] = useState(false)
    const [post_codeValid, setpost_codeValid] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please Login First", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/login');
        }
    }, []);

    const [user, setUser] = useState({
        name: "",
        email: "",
        address: "",
        phoneNumber: "",
        vatNumber: "",
        city: "",
        country: "",
        post_code: "",
    })
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
        setUser({ ...user, [name]: value });
    }
    // console.log(user);

    const handleAdd = async (e) => {
        e.preventDefault()

        const { name,email,address,phoneNumber,vatNumber,city,country,post_code } = user

        if (!name || !email || !address || !phoneNumber || !vatNumber || !city || !country || !post_code) {
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
        else {
            const token = localStorage.getItem("token")
            const reqHeader = {
                "access_token": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
            const reqBody = {
                "name": name, "email": email, "address": address, "phoneNumber": phoneNumber, 
                "vatNumber": vatNumber, "city": city,
                "country": country, "post_code": post_code
            }
            const result = await addClientApi(reqBody, reqHeader)
            console.log(result);
            if (result.status >= 200 && result.status < 300) {
                toast.success('Client Registration Completed', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                    navigate('/findclient')
                setUser({
                    ...user, cid: "", cname: "", logo: "",
                    title: "", category: "", role: "", location: "", state: "", salary: "", jobtype: "",
                    experience: ""
                })

            }
            else {
                alert(result.response)
            }
        }
       
    }

    return (
        <div>
            <div className='container mt-5'>
                <h1 className='text-center'>Add Client</h1>

                <Form className='mt-5'>
                    <>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className='anc1'><b> Bill to</b></Form.Label>
                            <Form.Control name='name' value={user.name} onChange={(e) => setDatas(e)}
                                type="text" placeholder="Billing Name" />
                        </Form.Group>
                        {nameValid &&
                                    <p className='text-danger'>Invalid  Name</p>
                                }
                    </>
                    <>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className='anc1'><b>Address</b></Form.Label>
                            <Form.Control name='address' value={user.address} onChange={(e) => setDatas(e)}
                                type="text" placeholder="Street" />
                        </Form.Group>
                        {addressValid &&
                                    <p className='text-danger'>Invalid Street Name</p>
                                }
                    </>
                    <>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control name='city' value={user.city} onChange={(e) => setDatas(e)}
                                type="text" placeholder="City" />
                        </Form.Group>
                        {cityValid &&
                                    <p className='text-danger'>Invalid City Name</p>
                                }
                    </>

                    <Row>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <>
                                <Form.Select name='country' value={user.country} onChange={(e) => setDatas(e)} aria-label="Default select example">
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
                                    <Form.Control name='post_code' value={user.post_code} onChange={(e) => setDatas(e)}
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
                            <Form.Control name='vatNumber' value={user.vatNumber} onChange={(e) => setDatas(e)}
                                type="text" placeholder="VAT" />
                        </Form.Group>
                        {vatNumberValid &&
                                    <p className='text-danger'>Invalid vatNumber</p>
                                }
                    </>
                    <>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className='anc1'><b>Contact</b></Form.Label>
                            <Form.Control name='email' value={user.email} onChange={(e) => setDatas(e)}
                                type="email" placeholder="Email" />
                        </Form.Group>
                        {emailValid &&
                                    <p className='text-danger'>Invalid email</p>
                                }
                    </>
                    <>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control name='phoneNumber' value={user.phoneNumber} onChange={(e) => setDatas(e)}
                                type="text" placeholder="Phone" />
                        </Form.Group>
                        {phoneNumberValid &&
                                    <p className='text-danger'>Invalid phoneNumber</p>
                                }
                    </>
                    <Link to={'/createinvoice2'}>
                        <div className='ac1 d-grid  ms-3 me-5 mb-4' fixed="bottom" >
                            <Button size="lg" onClick={(e)=>handleAdd(e)}>
                                Save Client's Information
                            </Button>
                        </div>
                    </Link>
                </Form>


            </div>
            <ToastContainer />
        </div>
    )
}

export default AddNewClient