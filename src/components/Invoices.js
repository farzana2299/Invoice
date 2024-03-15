import React, { useEffect, useState } from 'react'
import { deleteInvoiceApi, getAllInvoicesApi } from '../service/allApi';
import Header from './Header';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns';
import Footer from './Footer';
import { toast,ToastContainer } from 'react-toastify';

function Invoices() {
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

    const [invoiceDetails, setInvoiceDetails] = useState({})
    const getInvoiceDetails = async () => {
        if (localStorage.getItem("token")) {

            const token = localStorage.getItem("token")

            const reqHeader = {
                "access_token": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
            const result = await getAllInvoicesApi(reqHeader)
            setInvoiceDetails(result.data.message)
          
        }
    }
    useEffect(() => {
        getInvoiceDetails()
     

    }, [])
    console.log(invoiceDetails);

    const removeInvoice = async (_id) => {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            // console.log(_id);
            const reqHeader = {
                "access_token": `Bearer ${token}`,
                "Content-Type": "application/json"
            };
    
            try {
                const result = await deleteInvoiceApi(_id, reqHeader);
                console.log(result);
                getInvoiceDetails();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <div className='inv1 pb-5'>
                <Header></Header>
                {/* search bar  */}
                <div>
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12} className='pt-5 pb-5'>
                            <h2 style={{color:'darkblue'}}>INVOICES</h2>
                        </Col>
                    </Row>
                </div>

                {/* invoiceDetails  */}

                <div className='inv2 container mb-5'>
                    {invoiceDetails?.length > 0 ? invoiceDetails.map(i => (
                        <div>
                            <Row>
                                {/* icon */}
                                <Col lg={2} md={2} sm={2} xs={2}>
                                    <img style={{ position: 'relative', top: '40%' }}
                                        src="https://i.postimg.cc/wjnP3Lb5/download-removebg-preview-1.png" alt="icon" />
                                </Col>
                                {/* details  */}
                                <Col lg={6} md={6} sm={6} xs={6} className='text-start' style={{ position: 'relative', left: '3.5%' }}>
                                    <h3>{i.clientDetails.name}</h3>
                                    <h4>{i.invoiceNumber}</h4>
                                    <h5>{i.clientDetails.vatNumber}</h5>
                                    <p>Due Date - {format(new Date(i.dueDate), 'yyyy-MM-dd')}</p>

                                </Col>
                                {/* edit  */}
                                <Col lg={2} md={2} sm={2} xs={2}>
                                    <Link to={`/viewsingleinvoice/${i._id}`}>
                                        <div className='cli3'>
                                            <Button variant="primary" size="lg">
                                                <i class="fa-regular fa-pen-to-square "></i><h5>View</h5>
                                            </Button>{' '}
                                        </div>
                                    </Link>
                                </Col>
                                {/* delete  */}
                                <Col lg={2} md={2} sm={2} xs={2}>
                                    <div className='cli3'>
                                        <Button variant="danger" size="lg" onClick={() => removeInvoice(i._id)}>
                                            <i class="fa-solid fa-trash "></i><h5>Delete</h5>
                                        </Button>{' '}
                                    </div>
                                </Col>
                            </Row>
<hr />
                        </div>
                    )) : <h1>No  invoices are created by the user</h1>
                    }
                </div>
            </div>
            <Footer></Footer>
<ToastContainer/>
        </div>


    )
}

export default Invoices