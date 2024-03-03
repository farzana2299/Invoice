import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Col, Row } from 'react-bootstrap'
import { deleteClient, getClientDetailsApi } from '../service/allApi'
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom'

function Clients() {
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
            // console.log(result.data);
        }
    }
    useEffect(() => {
        getclientDetails()

    }, [])
    // console.log(clientDetails);
    // const {id}=useParams()
    const removeClient = async (id) => {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            // console.log(token);
            const reqHeader = {
                "access_token": `Bearer ${token}`,
                "Content-Type": "application/json"
            };
    
            try {
                const result = await deleteClient(id, reqHeader);
                console.log(result);
                getclientDetails();
            } catch (error) {
                console.error(error);
            }
        }
    };
    
    return (
        <div>
            <div>
                <Header></Header>
            </div>
            <div className='cli1'>
                <div>
                    {/* search bar  */}
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <div className='container pt-5 pb-5' style={{ position: 'relative', left: '30%' }}>
                                <div class="input-group">
                                    <div class="form-outline" data-mdb-input-init>
                                        <input type="search" id="form1" class="form-control" placeholder='Find Client' />
                                    </div>
                                    <button style={{ position: 'relative', right: '42px' }} type="button" class="btn " data-mdb-ripple-init>
                                        <i class="fa fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <h2>Client List</h2>
                </div>
                {clientDetails?.length > 0 ? clientDetails.map(i => (
                    <div className='cli2 container mt-3 mb-3'>
                        <Row>
                            {/* icon */}
                            <Col lg={2} md={2} sm={2} xs={2}>
                                <img style={{ position: 'relative', top: '40%' }}
                                    src="https://i.postimg.cc/wjnP3Lb5/download-removebg-preview-1.png" alt="icon" />
                            </Col>
                            {/* details  */}
                            <Col lg={6} md={6} sm={6} xs={6} style={{ position: 'relative', right: '7%' }}>
                                <h3>{i?.name}</h3>
                                <h5>{i.address},{i?.city}</h5>
                                <p>{i?.email}</p>
                                <p>{i?.vatNumber}</p>
                            </Col>
                            {/* edit  */}
                            <Col lg={2} md={2} sm={2} xs={2}>
                                <Link to={`/editclient/${i._id}`}>
                                    <div className='cli3'>
                                        <Button variant="primary" size="lg">
                                            <i class="fa-regular fa-pen-to-square "></i><h5>Edit</h5>
                                        </Button>{' '}
                                    </div>
                                </Link>
                            </Col>
                            {/* delete  */}
                            <Col lg={2} md={2} sm={2} xs={2}>
                                <div className='cli3'>
                                    <Button onClick={() => removeClient(i._id)} variant="danger" size="lg">
                                        <i class="fa-solid fa-trash "></i><h5>Delete</h5>
                                    </Button>{' '}
                                </div>
                            </Col>
                        </Row>
                    </div>
                )) : <h1>No Clients are added</h1>
                }
                <br /><br />
            </div>

            <div className='fixed-bottomm mt-5'>
                <Footer></Footer>
            </div>

        </div>
    )
}

export default Clients