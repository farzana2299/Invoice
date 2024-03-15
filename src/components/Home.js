import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Col, Row } from 'react-bootstrap'
import { getAllInvoicesApi, getLimitedInvoicesApi } from '../service/allApi';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


function Home() {
    // const [user, setUser] = useState("")
    const navigate = useNavigate()

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
            const result = await getLimitedInvoicesApi(reqHeader)
            setInvoiceDetails(result.data.message)

        }
    }
    useEffect(() => {
        getInvoiceDetails()

    }, [])
    // console.log(invoiceDetails);

    return (
        <div className='home2'>
            <Header></Header>

            <div className='lh1 p-5 container'>
                <div style={{ position: 'relative', right: '35%' }}>
                    <p>Current Balance</p>
                    <h1><b>$25000.40</b></h1>
                </div>
                <div style={{ position: 'relative', left: '35%', top: '40%' }}>
                    <p>My Wallet</p>
                </div>
            </div>

            <div className='lh2 pt-5 p-5 container'>
                <Row className='hro1'>
                    <Col lg={6} md={6} sm={6} xs={6} style={{ borderRight: '1px solid black' }}>
                        <p>Outstanding Balances</p>
                        <h1>$20000.00</h1>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6}>
                        <p>Total Invoices</p>
                        <h1>$45000.40</h1>
                    </Col>
                </Row>
            </div>

            <div>
                {/* first */}
                <div>
                    {invoiceDetails?.length > 0 ? invoiceDetails.map(i => (
                        <div className='lh3 container mb-5'>

                            <Row style={{ position: 'relative', top: '10%' }}>
                                <Col lg={6} md={6} sm={6} xs={6} style={{ position: 'relative', right: '7%' }}>
                                    <h5>Invoice {i.invoiceNumber}</h5>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6} style={{ position: 'relative', left: '15%' }}>
                                    {/* <Button variant="success" size="sm">
                                    
                                </Button>{' '} */}
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={4} md={4} sm={4} xs={4} style={{ position: 'relative', right: '10%', top: '20px' }}>
                                    <img src="https://i.postimg.cc/wjnP3Lb5/download-removebg-preview-1.png" alt="icon" />
                                </Col>
                                <Col lg={4} md={4} sm={4} xs={6} style={{ position: 'relative', right: '25%', top: '20px' }}>
                                    <div>
                                        <h5>{i.clientDetails.name}</h5>
                                        <div style={{ color: 'grey' }}>
                                            <div style={{ position: 'relative', bottom: '5px', left: '11%', fontSize: '12px' }}>
                                                <i class="fa-solid fa-clock"> {i.paymentStatus} | Due {format(new Date(i.dueDate), 'yyyy-MM-dd')}</i>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4} md={4} sm={4} xs={2} style={{ position: 'relative', top: '20px', right: '7%' }}>
                                    <h3>$  {i.tot_total}</h3>
                                </Col>
                            </Row>

                        </div>
                    )) : <h1>No  invoices are created by the user</h1>
                    }
                </div>
            </div>
            <div style={{ position: 'relative', top: '20%', left: '20%' }}>
            <Link to={'/invoices'} style={{ textDecoration: 'none' }}>
                    <div>
                        <h6>See More ...</h6>
                    </div>
                </Link>
                </div>
            <div style={{ position: 'relative', top: '100px' }}>
                <Footer></Footer>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home