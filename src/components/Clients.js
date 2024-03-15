import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Col, Row } from 'react-bootstrap'
import { deleteClient, getClientDetailsApi } from '../service/allApi'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

function Clients() {
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
                    
                    <Row className='pt-5'>
                        <Col lg={12} md={12} sm={12} xs={12}>
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
<ToastContainer/>
        </div>
    )
}

export default Clients