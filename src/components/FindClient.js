import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { getClientDetailsApi } from '../service/allApi';

function FindClient() {
    const navigate=useNavigate()
    const [clientSelect,setClientSelect]=useState(null) 

    const [clientDetails, setclientDetails] = useState({})
    const getclientDetails = async () => {
        if (localStorage.getItem("token")) {

            const token = localStorage.getItem("token")
            // console.log(token);
            const reqHeader = {
                "access_token": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
            const result = await getClientDetailsApi(reqHeader)
            setclientDetails(result.data)
            console.log(result.data);
        }
    }
    useEffect(() => {
        getclientDetails()

    }, [])
    //   console.log(clientDetails);
    return (
        <div style={{ backgroundColor: 'rgb(210, 215, 245)'}}>
            <div className='fc1'>
                <Row style={{ position: 'relative', top: '32%' }}>

                    <Col lg={6} md={6} sm={6} xs={6} style={{ position: 'relative', right: '10%' }}>
                        <Link to={'/createinvoice'} style={{ textDecoration: 'none', color: 'black' }}>
                            <h5>Back</h5>
                        </Link>
                    </Col>

                    <Col lg={6} md={6} sm={6} xs={6} style={{ position: 'relative' }}>
                        <h5>Done</h5>
                    </Col>
                </Row>
            </div>
            <div className='d-grid'>
                <h3 className='text-center'>Bill to</h3>
                <div style={{ position: 'relative', left: '20%' }}>
                    <div class="input-group">
                        <div class="form-outline" data-mdb-input-init>
                            <input type="search" id="form1" class="form-control" placeholder='Find Client' />
                        </div>
                        <button style={{ position: 'relative', right: '42px' }} type="button" class="btn " data-mdb-ripple-init>
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className='m-5'>
            {clientDetails?.length > 0 ? clientDetails.map(i => (
                <div className='fc2 mb-5' onClick={()=>
                    {
                setClientSelect(i)
                navigate('/createinvoice2')
            }
                }>
                   
                        <Row >
                            <Col lg={3} md={3} sm={3} xs={3} style={{ position: 'relative', top: '20px', left: '5%' }}>
                                <img src="https://i.postimg.cc/wjnP3Lb5/download-removebg-preview-1.png" alt="icon" />

                            </Col>
                            <Col lg={9} md={9} sm={9} xs={9} className='text-start' style={{ position: 'relative', top: '20px' }}>
                                <h5>{i.name}</h5>
                                <p style={{ color: 'grey' }}>{i.city}, {i.post_code},{i.country}</p>
                            </Col>
                        </Row>
                     
                        </div>
                       
                    )) : <h1>No Clients are added</h1>
                    }

              



            </div>
            <div>
                <Link to={'/addnewclient'}>
                    <div className='ac1 d-grid  ms-3 me-5 mb-4' fixed="bottom" >
                        <Link to={'/addnewclient'}>
                            <Button size="lg">
                                <i class="fa-solid fa-user "></i>  Add New Client
                            </Button>
                        </Link>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default FindClient