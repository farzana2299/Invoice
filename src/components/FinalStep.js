import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function FinalStep() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { state } = useLocation();
    const { invoiceData } = state;
    // console.log(invoiceData);


    const [formData, setFormData] = useState({
        invoiceNumber: invoiceData.invoiceNumber || '',
        invoiceDate: invoiceData.invoiceDate || '',
        dueDate: invoiceData.dueDate || '',
        paymentStatus: invoiceData.paymentStatus || '',
        paymentMethod: invoiceData.paymentMethod || ''
    });

    const setDatas = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    // console.log(formData);

    const handleNextStep = () => {
        const { invoiceNumber, invoiceDate, dueDate, paymentMethod, paymentStatus } = formData;
        if (invoiceNumber && invoiceDate && dueDate && paymentMethod && paymentStatus) {
            navigate(`/preview/${id}`, { state: { invoiceData, formData } });
        } else {
            toast.error('Please fill all necessary details.', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
        }
    };

    return (
        <div>
            <div className='ci1'>
                {/* Header  */}
                <Row style={{ position: 'relative', right: '10%', top: '10%' }}>

                    <Col lg={4} md={4} sm={4} xs={4} style={{ position: 'relative', top: '15px' }}>
                        <Link to={`/createinvoice2/${id}`}>
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
                    <h3 className='text-center' style={{ color: 'darkblue' }}>FINAL STEP</h3>
                    <Row>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <h5 className='text-start'>Invoice Number </h5>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <div className='text-end'>
                                <Form.Control
                                    name='invoiceNumber'
                                    value={formData.invoiceNumber}
                                    onChange={(e) => setDatas(e)}
                                    style={{ border: '0', width: '50%', position: "relative", left: '50%' }}
                                    type="text"
                                    placeholder="Invoice Number" />
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
                                <Form.Control
                                    name='invoiceDate'
                                    value={formData.invoiceDate}
                                    onChange={(e) => setDatas(e)}
                                    style={{ border: '0', width: '50%', position: "relative", left: '50%' }}
                                    type="date" />
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <h5 className='text-start'>Payment Due Date</h5>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <div className='text-end'>
                                <Form.Control
                                    name='dueDate'
                                    value={formData.dueDate}
                                    onChange={(e) => setDatas(e)}
                                    style={{ border: '0', width: '50%', position: "relative", left: '50%' }}
                                    type="date" />
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
                                <Form.Select aria-label="Default select example"
                                    value={formData.paymentStatus}
                                    name='paymentStatus'
                                    onChange={(e) => setDatas(e)}
                                    style={{ border: '0', width: '50%', position: "relative", left: '50%' }}>
                                    <option>Payment Status</option>
                                    <option value="Recurring">Recurring</option>
                                    <option value="One Time">One Time</option>
                                    <option value="Paid">Paid</option>
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
                                <Form.Select aria-label="Default select example"
                                    value={formData.paymentMethod}
                                    name='paymentMethod'
                                    onChange={(e) => setDatas(e)}
                                    style={{ border: '0', width: '50%', position: "relative", left: '50%' }}>
                                    <option>Payment Method</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="Cash On Delivery">Cash On Delivery</option>
                                    <option value="Cheque">Cheque</option>
                                </Form.Select>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className='mt-5 pb-5' style={{position:'relative',left:'45%'}}>
                    <Button variant="primary" size="lg" onClick={handleNextStep}>
                        Next Step
                    </Button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default FinalStep