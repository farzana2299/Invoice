import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';


function Create_Invoice2() {
    const [inputFields, setInputFields] = useState([
        {
            orderId: '', itemNo: '', materialId: '', materialdescription: '', currentqty: '',
            previousqty: '', qtydifference: '', ordercommand: ''
        }
    ])
    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }
    const addFields = () => {
        let newfield = {
            orderId: '', itemNo: '', materialId: '', materialdescription: '', currentqty: '',
            previousqty: '', qtydifference: '', ordercommand: ''
        }

        setInputFields([...inputFields, newfield])
    }
    const submit = (e) => {
        e.preventDefault();
        console.log(inputFields)
    }
    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }
    return (
        <div>
            <div className='ci'>
                <div className='ci1'>
                    <Row style={{ position: 'relative', right: '10%', top: '10%' }}>

                        <Col lg={4} md={4} sm={4} xs={4} style={{ position: 'relative', top: '15px' }}>
                            <Link to={'/findclient'}>
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
                    <h2 className='pt-5' style={{ color: 'darkblue' }}>BILLING INFORMATION</h2>
                </div>

                <div>
                    <Row className='container'>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <h4 className='text-start' style={{ position: 'relative', left: '10%' }}>Bill to</h4>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <h4 className='text-end'>Clear</h4>
                        </Col>
                    </Row>
                </div>
                <div className='m-5'>

                    <div className='fc2 mb-5'>

                        <Row>
                            <Col lg={3} md={3} sm={3} xs={3} style={{ position: 'relative', top: '20px', left: '5%' }}>
                                <img src="https://i.postimg.cc/wjnP3Lb5/download-removebg-preview-1.png" alt="icon" />

                            </Col>
                            <Col lg={9} md={9} sm={9} xs={9} className='text-start' style={{ position: 'relative', top: '20px' }}>
                                <h5>NAME</h5>
                                <p>CITY, POSTCODE,COUNTRY</p>
                            </Col>
                        </Row>

                    </div>
                </div>

                {/* CURRENCY and add item  */}
                <div className='container'>
                    <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                            <>
                                <Form.Select aria-label="Default select example">
                                    <option>Currency</option>
                                    <option value="1">India INR</option>
                                    <option value="2">US Dollar</option>
                                    <option value="3">Kuwait Dinar</option>
                                </Form.Select>

                            </>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                            <div>
                                <button onClick={addFields} className='btn btn-primary ba'>ADD ITEMS  <i class="fa-solid fa-circle-plus"></i></button>
                            </div>
                        </Col>
                    </Row>

                    <br /><br />

                    {/* dynamic form of items */}
                    {inputFields.map((input, index) => {
                        return (
                            <div key={index}>
                                <div className="row">
                                    <div className="col-lg-2">

                                        <label for="orderid" class="form-label "><b>ITEM NAME</b></label> <br />
                                        <input type="text" name='orderId' class="form-control" placeholder='Billing Name' id="orderid" aria-describedby="orderid1"
                                            value={input.orderId} onChange={event => handleFormChange(index, event)}
                                        />
                                    </div>
                                    <div className="col-lg-2">
                                        <label for="itemno" class="form-label "><b>ITEM DESCRIPTION</b></label> <br />
                                        <input type="text" name='itemNo' class="form-control" placeholder='1111' id="Your Description" aria-describedby="itemno1"
                                            value={input.itemNo} onChange={event => handleFormChange(index, event)}
                                        />
                                    </div>
                                    <div className="col-lg-1">
                                        <label for="matid" class="form-label "><b>QUANTITY</b></label>
                                        <input type="text" name='materialId' class="form-control" placeholder=' 0' id="matid" aria-describedby="matid1"
                                            value={input.materialId} onChange={event => handleFormChange(index, event)}
                                        />
                                    </div>
                                    <div className="col-lg-1">
                                        <label for="matid" class="form-label "><b>UNIT</b></label>
                                        <Form.Select aria-label="Default select example">

                                            <option>Month</option>
                                            <option value="1">Jan</option>
                                            <option value="2">Feb</option>
                                            <option value="3">Mar</option>
                                            <option value="4">Apr</option>
                                            <option value="5">May</option>
                                            <option value="6">Jun</option>
                                            <option value="7">Jul</option>
                                            <option value="8">Aug</option>
                                            <option value="9">Sep</option>
                                            <option value="10">Oct</option>
                                            <option value="11">Nov</option>
                                            <option value="12">Dec</option>
                                        </Form.Select>

                                    </div>
                                    <div className="col-lg-1">
                                        <label for="currqty" class="form-label "><b> PRICE</b></label>
                                        <input type="number" name='currentqty' class="form-control" placeholder=' $0,00' id="currqty" aria-describedby="currqty1"
                                            value={input.currentqty} onChange={event => handleFormChange(index, event)}
                                        />
                                    </div>
                                    <div className="col-lg-1">
                                        <label for="preqty" class="form-label "><b>SUBTOTAL</b></label>
                                        <input type="number" name='previousqty' class="form-control" placeholder='sub Total' id="preqty" aria-describedby="preqty1"
                                            value={input.previousqty} onChange={event => handleFormChange(index, event)}
                                        />
                                    </div>
                                    <div className="col-lg-1">
                                        <label for="qtydiff" class="form-label "><b>DISCOUNT</b></label><br />
                                        <input type="number" name='qtydifference' class="form-control" placeholder=' 0' id="qtydiff" aria-describedby="qtydiff1"
                                            value={input.qtydifference} onChange={event => handleFormChange(index, event)}
                                        />
                                    </div>
                                    <div className="col-lg-1">
                                        <label for="ordercomm" class="form-label "><b>TAX %</b></label>
                                        <input type="text" name='ordercommand' class="form-control" id="ordercomm" placeholder='10.0' aria-describedby="ordercomm1"
                                            value={input.ordercommand} onChange={event => handleFormChange(index, event)}
                                        />
                                    </div>
                                    <div className="col-lg-1">
                                        <label for="ordercomm" class="form-label "><b>TOTAL</b></label>
                                        <input type="text" name='ordercommand' class="form-control" id="ordercomm" placeholder='Total' aria-describedby="ordercomm1"
                                            value={input.ordercommand} onChange={event => handleFormChange(index, event)}
                                        />
                                    </div>
                                    <div className="col-lg-1">
                                        <button onClick={() => removeFields(index)} className='btn btn-danger br'><i class="fa-solid fa-minus"></i></button>
                                    </div>

                                </div>

                            </div>
                        )
                    })}
                    <br />
                    {/* button to save items  */}
                    <div>
                        <Button variant="primary" size="lg">
                            Save
                        </Button>
                    </div>
                </div>

                {/* display total and subtotal  */}
                <div className='cri2 container mt-5'>
                    <h4 style={{color:'darkblue'}}>TOTAL</h4>
                    <div>
                        <Row>
                            <Col lg={6} md={6} sm={6} xs={6}>
                                <h5 className='text-start'>Sub Total : </h5>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={6}>
                               <h5 className='text-end'>$ 123534</h5>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col lg={6} md={6} sm={6} xs={6}>
                            <h5 className='text-start'>Tax Percentage : </h5>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={6}>
                            <h5 className='text-end'>$ 34332 </h5>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col lg={6} md={6} sm={6} xs={6}>
                            <h5 className='text-start'>Total : </h5>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={6}>
                            <h5 className='text-end'>$ 34567865 </h5>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className='mt-5'>
                    <div>
                        <Link to={'/finalstep'}>
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
        </div>
    )
}

export default Create_Invoice2