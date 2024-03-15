import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getUserDetailsApi } from '../service/allApi';

function Header() {
    const [userDetails, setUserDetails] = useState({})
    const getUserDetails = async () => {
      if (localStorage.getItem("token")) {
  
        const token = localStorage.getItem("token")
        // console.log(token);
        const reqHeader = {
          "access_token": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
        const result = await getUserDetailsApi(reqHeader)
        setUserDetails(result?.data)
      }
    }
    useEffect(() => {
      getUserDetails()
  
    }, [])
// console.log(userDetails);
    return (
        <div>
            <div className='he1'>
                <Row>
                    <Col lg={2} md={2} sm={2} xs={2}>
                        <Sidebar></Sidebar>
                    </Col>
                    {userDetails?.length > 0 ? userDetails.map(i => (
                    <Col lg={2} md={2} sm={2} xs={2}>
                    
                        <div className='he3'>
                            <h5>{i?.first_name}</h5>
                            <h3>{i?.email}</h3>
                        </div>
                        
                    </Col>
                     )) :" "
                    }
                </Row>

                <Row className='hrow'>
                    <Col lg={2} md={2} sm={2} xs={2}>
                        <div className='he4'>
                            <i class="fa-solid fa-bell"></i>
                        </div>
                    </Col>
                    <Col lg={2} md={2} sm={2} xs={2}>
                        <Link to={'/profile'}>
                        <div className='he5'>
                            <img src="https://i.postimg.cc/wjnP3Lb5/download-removebg-preview-1.png" alt="icon" />
                        </div>
                        </Link>
                    </Col>
                </Row>

            </div>
        </div>

    )
}

export default Header