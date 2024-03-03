import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
function CreateInvoice() {
    return (
        // create invoice step1 

        <div className='ci'>
            <div className='ci1'>
                <Row style={{ position: 'relative', right: '10%', top: '10%' }}>

                    <Col lg={4} md={4} sm={4} xs={4} style={{ position: 'relative', top: '15px' }}>
                        <Link to={'/home'}>
                            <i class="fa-solid fa-angle-left fa-2x"></i>
                        </Link>
                    </Col>

                    <Col className='text-center' lg={8} md={8} sm={8} xs={8}>
                        <p style={{ fontSize: '25px', position: 'relative', top: '10%' }}>Create <b>Invoice</b> </p>
                        <p>Step 1 from 3</p>
                    </Col>
                </Row>
            </div>

            <div>
                <h2 className='pt-5' style={{ color: 'darkblue' }}>Who are you Billing to?</h2>
            </div>
            <Link to={'/findclient'} style={{textDecoration:'none',color:'black'}}>
                <div className='ci2'>
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <div className='text-start ps-5 pt-2 container cri1'>
                                <h5>Bill To</h5>
                                <i class="fa-solid fa-user-plus fa-2x" style={{ color: 'darkviolet' }}></i>
                                <div style={{ position: 'relative', bottom: '25%', left: '5%' }}> <h4>Add Client</h4></div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Link>
            <div className='ci3'>
                <div className='ci4'>
                    <Link to={'/findclient'}>
                        <Button variant="primary" size="lg">
                            Next Step
                        </Button>
                    </Link>
                    <Link to={'/home'} style={{ textDecoration: 'none' }}>
                        <p style={{ color: 'darkviolet' }}>Discard Invoice</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CreateInvoice