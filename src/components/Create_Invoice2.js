import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
function Create_Invoice2() {
  return (
    <div>
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
                        <p>Step 2 from 3</p>
                    </Col>
                </Row>
            </div>

            <div>
                <h2 className='pt-5' style={{ color: 'darkblue' }}>Billing Information</h2>
            </div>

            <div>
                <Row className='container'>
                    <Col lg={6} md={6} sm={6} xs={6}>
                       <h4 className='text-start'>Bill to</h4>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6}>
                       <h4 className='text-end'>Clear</h4>
                    </Col>
                </Row>
            </div>

            <div className='ci3'>
                <div className='ci4'>
                    <Link to={'/findclient'}>
                    <Button variant="primary" size="lg">
                        Next Step
                    </Button>
                    </Link>
                    <Link to={'/home'} style={{textDecoration:'none'}}>
                    <p style={{color:'darkviolet'}}>Discard Invoice</p>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Create_Invoice2