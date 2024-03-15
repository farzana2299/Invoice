import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { getClientDetailsApi } from '../service/allApi';
import {toast, ToastContainer } from 'react-toastify';

function FindClient() {
    const navigate=useNavigate()
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

    const [clientDetails, setclientDetails] = useState({})
    const getclientDetails = async () => {
        if (localStorage.getItem("token")) {

            const token = localStorage.getItem("token")
            // console.log(token);
            const reqHeader = {
                "access_token": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
            const result = await getClientDetailsApi(reqHeader)
            setclientDetails(result.data)
            console.log(result.data);
        }
    }
    useEffect(() => {
        getclientDetails()

    }, [])
    //   console.log(clientDetails);
    return (
        <div style={{ backgroundColor: 'rgb(210, 215, 245)' }}>
            <div className='ci1'>
                <Row style={{ position: 'relative', right: '10%', top: '10%' }}>

                    <Col lg={4} md={4} sm={4} xs={4} style={{ position: 'relative', top: '15px' }}>
                        <Link to={'/createinvoice'}>
                            <i class="fa-solid fa-angle-left fa-2x"></i>
                        </Link>
                    </Col>

                    <Col className='text-center' lg={8} md={8} sm={8} xs={8}>
                        <p style={{ fontSize: '25px', position: 'relative', top: '10%' }}>Create <b>Invoice</b> </p>
                        <p>Step 1 from 3</p>
                    </Col>
                </Row>
            </div>
            <div className='fc1'>
                <Row style={{ position: 'relative', top: '32%' }}>

                    <Col lg={6} md={6} sm={6} xs={6} style={{ position: 'relative', right: '10%' }}>

                    </Col>

                    <Col lg={6} md={6} sm={6} xs={6} style={{ position: 'relative' }}>
                        <h5>Done</h5>
                    </Col>
                </Row>
            </div>
            <div className='d-grid'>
                <h3 style={{ color: 'darkblue' }} className='text-center'>BILL TO</h3>
                <div style={{ position: 'relative', left: '20%' }}>
                    <div class="input-group">
                        <div class="form-outline" data-mdb-input-init>
                            <input type="search" id="form1" class="form-control" placeholder='Find Client' />
                        </div>
                        <button style={{ position: 'relative', right: '42px' }} type="button" class="btn " data-mdb-ripple-init>
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className='m-5'>
                {clientDetails?.length > 0 ? clientDetails.map(i => (

                    <div className='fc2 mb-5'>
                        <Link to={`/createinvoice2/${i._id}`} style={{textDecoration:'none',color:'black'}}>
                            <Row>
                                <Col lg={3} md={3} sm={3} xs={3} style={{ position: 'relative', top: '20px', left: '5%' }}>
                                    <img src="https://i.postimg.cc/wjnP3Lb5/download-removebg-preview-1.png" alt="icon" />

                                </Col>
                                <Col lg={9} md={9} sm={9} xs={9} className='text-start' style={{ position: 'relative', top: '20px' }}>
                                    <h5>{i.name}</h5>
                                    <p>{i.city}, {i.post_code},{i.country}</p>
                                </Col>
                            </Row>
                        </Link>
                    </div>

                )) : <h1>No Clients are added</h1>
                }
            </div>

            <div>
                <Link to={'/addnewclient'}>
                    <div className='ac1 d-grid  ms-3 me-5 mb-4 pb-5' fixed="bottom" >
                        <Link to={'/addnewclient'}>
                            <Button size="lg">
                                <i class="fa-solid fa-user "></i>  Add New Client
                            </Button>
                        </Link>
                    </div>
                </Link>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default FindClient