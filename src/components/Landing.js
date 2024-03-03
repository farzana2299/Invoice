import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
function Landing() {
  return (
    <div className='c1'>
      <Row>
        <Col lg={12}>
          <h1 className='text-white pt-5'>dok it</h1>
          <Link to={'/login'} style={{ position: 'relative', top: '150%' }}>
            <Button variant="light" size="lg">LET'S START</Button>{' '}
          </Link>
        </Col>
      </Row>
    </div>
  )
}

export default Landing