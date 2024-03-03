import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function FinalStep() {
    return (
        <div>
            <div className='ci1'>
                {/* Header  */}
                <Row style={{ position: 'relative', right: '10%', top: '10%' }}>

                    <Col lg={4} md={4} sm={4} xs={4} style={{ position: 'relative', top: '15px' }}>
                        <Link to={'/createinvoice2'}>
                            <i class="fa-solid fa-angle-left fa-2x"></i>
                        </Link>
                    </Col>

                    <Col className='text-center' lg={8} md={8} sm={8} xs={8}>
                        <p style={{ fontSize: '25px', position: 'relative', top: '10%' }}>Create <b>Invoice</b> </p>
                        <p>Step 3 from 3</p>
                    </Col>
                </Row>
            </div>
            <div className='fs2 pb-5 pt-5'>
                <div className='fs1 container'>
                    <h3 style={{ color: 'darkblue' }}>FINAL STEP</h3>
                    <Row>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <h5 className='text-start'>Invoice Number </h5>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <div className='text-end'>
                                <Form.Control name='invoiceNumber' style={{ border: '0', width: '50%', position: "relative", left: '50%' }}
                                    type="text" placeholder="Invoice Number" />
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <h5 className='text-start'>Invoice Date </h5>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <div className='text-end'>
                                <Form.Control name='invoiceDate' style={{ border: '0', width: '50%', position: "relative", left: '50%' }}
                                    type="date" />
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <h5 className='text-start'>Payment Due </h5>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <div className='text-end'>
                                <Form.Select aria-label="Default select example" style={{ border: '0', width: '50%', position: "relative", left: '50%' }}>
                                    <option value="1">30 Days</option>
                                    <option value="2">15 Days</option>
                                    <option value="3">7 Days</option>
                                </Form.Select>
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <h5 className='text-start'>Type</h5>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <div className='text-end'>
                                <Form.Select aria-label="Default select example" style={{ border: '0', width: '50%', position: "relative", left: '50%' }}>
                                    <option value="1">Recurring</option>
                                    <option value="2">Pending</option>
                                    <option value="3">Paid</option>
                                </Form.Select>
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <h5 className='text-start'>Payment Method </h5>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <div className='text-end'>
                                <Form.Select aria-label="Default select example" style={{ border: '0', width: '50%', position: "relative", left: '50%' }}>
                                    <option value="1">Bank Transfer</option>
                                    <option value="2">Cash On Delivery</option>
                                    <option value="3">Cheque</option>
                                </Form.Select>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className='mt-5'>
                <Button variant="primary" size="lg">
                           Save Invoice
                        </Button>
                </div>
            </div>
        </div>
    )
}

export default FinalStep