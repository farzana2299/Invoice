import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Preview() {
  const { id } = useParams()
  const { state } = useLocation();
  const { invoiceData, formData } = state;
  console.log("Invoice Data", invoiceData);
  console.log("FormData", formData);

  return (
    <div className='prev1'>
      {/* Header  */}
      <div className='ci1'>
        <Row style={{ position: 'relative', right: '10%', top: '10%' }}>

          <Col lg={4} md={4} sm={4} xs={4} style={{ position: 'relative', top: '15px' }}>
            <Link to={`/finalstep/${id}`} style={{textDecoration:'none',color:'red'}}>
              <i class="fa-solid fa-angle-left fa-2x"></i>
            </Link>
          </Col>

          <Col className='text-center' lg={8} md={8} sm={8} xs={8}>
            <p style={{ fontSize: '25px', position: 'relative', top: '10%' }}>New <b>Invoice</b> </p>
            <p>Summery</p>
          </Col>
        </Row>
      </div>
      {/* info  */}
      <div className='w-75 container prev2 mb-5 mt-5'>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <h4 className='text-center' style={{ color: 'darkblue' }}>INFORMATION</h4>
            <Row>
              <Col lg={6} md={6} sm={6} xs={6}>
                <h6>{formData.invoiceNumber}</h6>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6} className='text-end'>
                <h6>{formData.paymentStatus}</h6>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={6} xs={6}>
                <p>Issue Date</p>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6} className='text-end'>
                <p>Due Date</p>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={6} xs={6}>
                <h6>{formData.invoiceDate}</h6>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6} className='text-end'>
                <h6>{formData.dueDate}</h6>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      {/* client  */}
      <div className='prev2 w-75 container mt-5 mb-5'>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <h4 className='text-center' style={{ color: 'darkblue' }}>CLIENT</h4>
            <Row>
              <Col lg={6} md={6} sm={6} xs={6}>
                <h6>Client Name</h6>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6} className='text-end'>
                <h6> {invoiceData.clientDetails.name}</h6>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={6} xs={6}>
                <h6>Address</h6>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6} className='text-end'>
                <h6>{invoiceData.clientDetails.address}</h6>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={6} xs={6}>
                <h6>Email</h6>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6} className='text-end'>
                <h6>{invoiceData.clientDetails.email}</h6>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={6} xs={6}>
                <h6>VAT Number</h6>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6} className='text-end'>
                <h6>{invoiceData.clientDetails.vatNumber}</h6>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      {/* items  */}
      <div className='prev2 w-75 container mt-5 mb-5'>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <h4 className='text-center' style={{ color: 'darkblue' }}>ITEMS</h4>
            {invoiceData.items.map((item, index) => (
              <div key={index}>
                <Row>
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <h6>ITEM NAME -  {item.itemName}</h6>
                  </Col>
                  <Col lg={6} md={6} sm={6} xs={6} className='text-end'>
                    <h6>TOTAL -  {item.total}</h6>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} md={6} sm={6} xs={6}>
                    <h6>UNIT PRICE -   {item.unitPrice}</h6>
                  </Col>
                  <Col lg={6} md={6} sm={6} xs={6} className='text-end'>
                    <h6>TAX -  {item.tax}</h6>
                  </Col>
                </Row>
                <hr />
              </div>
             
            ))}
            
          </Col>
        </Row>

      </div>
      {/* TOTAL  */}
      <div className='w-75 container prev2 mb-5 mt-5'>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <h4 className='text-center' style={{ color: 'darkblue' }}>TOTAL</h4>
            <Row>
              <Col lg={6} md={6} sm={6} xs={6}>
                <h6>Sub Total</h6>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6} className='text-end'>
                <h6>$ {invoiceData.tot_subTotal}</h6>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={6} xs={6}>
                <h6>Tax</h6>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6} className='text-end'>
                <h6>$ {invoiceData.tot_tax}</h6>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={6} xs={6}>
                <h6>Discount</h6>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6} className='text-end'>
                <h6>$ {invoiceData.tot_discount}</h6>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6} sm={6} xs={6}>
                <h6>Total</h6>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6} className='text-end'>
                <h6>$ {invoiceData.tot_total}</h6>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      {/* add button  */}
      <div className='pb-5 prev3'>
        <Button variant="primary" size="lg">
          Save Invoice
        </Button>{' '}
      </div>
    </div>
  )
}

export default Preview