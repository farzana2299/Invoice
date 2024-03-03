import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
function Home() {
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
{/* first */}
            <div className='lh3 container'>
                <Row style={{ position: 'relative', top: '10%' }}>
                    <Col lg={6} md={6} sm={6} xs={6} style={{ position: 'relative', right: '7%' }}>
                        <h5>Invoice #0001</h5>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6} style={{ position: 'relative', left: '15%' }}>
                        <Button variant="success" size="sm">
                            Paid
                        </Button>{' '}
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} md={4} sm={4} xs={4} style={{ position: 'relative', right: '10%', top: '20px' }}>
                        <img src="https://i.postimg.cc/wjnP3Lb5/download-removebg-preview-1.png" alt="icon" />
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={6} style={{ position: 'relative', right: '25%',top:'20px' }}>
                        <div>
                            <h5>Anton Dymak</h5>
                            <div style={{ color: 'grey' }}>
                                <div style={{ position: 'relative', bottom: '5px',left:'11%',fontSize:'12px' }}>
                                <i class="fa-solid fa-clock"> One Time | Due Feb 11</i> 
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={2} style={{ position: 'relative',top:'20px',right:'7%' }}>
                        <h3>$2000</h3>
                    </Col>
                </Row>
            </div>
{/* second */}
<div className='lh3 container'>
                <Row style={{ position: 'relative', top: '10%' }}>
                    <Col lg={6} md={6} sm={6} xs={6} style={{ position: 'relative', right: '7%' }}>
                        <h5>Invoice #0002</h5>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6} style={{ position: 'relative', left: '15%' }}>
                        <Button variant="danger" size="sm">
                            Pending
                        </Button>{' '}
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} md={4} sm={4} xs={4} style={{ position: 'relative', right: '10%', top: '20px' }}>
                        <img src="https://i.postimg.cc/wjnP3Lb5/download-removebg-preview-1.png" alt="icon" />
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={6} style={{ position: 'relative', right: '25%',top:'20px' }}>
                        <div>
                            <h5>Diana Johnson</h5>
                            <div style={{ color: 'grey' }}>
                                <div style={{ position: 'relative', bottom: '5px',left:'11%',fontSize:'12px' }}>
                                <i class="fa-solid fa-clock"> One Time | Due Feb 11</i> 
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={2} style={{ position: 'relative',top:'20px',right:'7%' }}>
                        <h3>$1500</h3>
                    </Col>
                </Row>
            </div>

{/* third */}
<div className='lh3 container '>
                <Row style={{ position: 'relative', top: '10%' }}>
                    <Col lg={6} md={6} sm={6} xs={6} style={{ position: 'relative', right: '7%' }}>
                        <h5>Invoice #0015</h5>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6} style={{ position: 'relative', left: '15%' }}>
                        <Button variant="warning" size="sm">
                            Overdue
                        </Button>{' '}
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} md={4} sm={4} xs={4} style={{ position: 'relative', right: '10%', top: '20px' }}>
                        <img src="https://i.postimg.cc/wjnP3Lb5/download-removebg-preview-1.png" alt="icon" />
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={6} style={{ position: 'relative', right: '25%',top:'20px' }}>
                        <div>
                            <h5>Itan Simmons</h5>
                            <div style={{ color: 'grey' }}>
                                <div style={{ position: 'relative', bottom: '5px',left:'11%',fontSize:'12px' }}>
                                <i class="fa-solid fa-clock"> Recurring | Nov,15</i> 
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={2} style={{ position: 'relative',top:'20px',right:'7%' }}>
                        <h3>$1500</h3>
                    </Col>
                </Row>
            </div>

            <div style={{ position: 'relative', top: '100px' }}>
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Home