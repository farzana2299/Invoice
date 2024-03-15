import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
      <div className='fo1'>
        <div>
          <Row>
            <Col>
              <Link to={'/home'} style={{ textDecoration: 'none' }}>
                <div className='fo2'>
                  <i class="fa-solid fa-house fa-2x"></i><br />
                  <p>Home</p>
                </div>
              </Link>
            </Col>

            <Col>
              <Link to={'/invoices'} style={{ textDecoration: 'none' }}>
                <div className='fo2' style={{ position: 'relative' }}>
                  <i class="fa-regular fa-file-lines fa-2x"></i>
                  <p>Invoice</p>
                </div>
              </Link>
            </Col>

            <Col>
              <Link to={'/createinvoice'} style={{ textDecoration: 'none' }}>
                <div style={{ position: 'relative', bottom: '60%' }}>
                  <img src="https://i.postimg.cc/XYd9bQQd/add-removebg-preview-1-1.png" alt="" />
                </div>
              </Link>
            </Col>

            <Col>
              <Link to={'/clients'} style={{ textDecoration: 'none' }}>
                <div className='fo2' style={{ position: 'relative' }}>
                  <i class="fa-solid fa-user fa-2x"></i>
                  <p>Clients</p>
                </div>
              </Link>
            </Col>
            <Col>
              <div className='fo2' style={{ position: 'relative' }}>
                <i class="fa-solid fa-briefcase fa-2x"></i>
                <p>Reports</p>
              </div>
            </Col>

          </Row>
        </div>

      </div>
    </div>
  )
}

export default Footer