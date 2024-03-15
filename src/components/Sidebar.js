import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
function Sidebar() {
    const navigate=useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logout=(e)=>{
        e.preventDefault()
        localStorage.clear()
      
        navigate('/login')
      }

    return (
        <div>
            <>
                <div className='he2'>
                    <Button variant="light" onClick={handleShow}>
                        <i class="fa-solid fa-list"></i>
                    </Button>

                </div>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                            <h1>   dok <span style={{ color: 'green' }}>it</span></h1></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div>
                            <Link to={'/home'} style={{ textDecoration: 'none', color: 'black' }}>
                                <div className='sb1 mt-3 mb-3'>
                                    <div className='sb2'>
                                        <h4><i class="fa-solid fa-house"></i>  Home</h4>
                                    </div>
                                </div>
                            </Link>
                            <Link to={'/profile'} style={{ textDecoration: 'none', color: 'black' }}>
                                <div className='sb1 mt-3 mb-3'>
                                    <div className='sb2'>
                                        <h4><i class="fa-regular fa-address-card" style={{ color: 'lightblue' }}></i>  Profile</h4>
                                    </div>
                                </div>
                            </Link>
                            <Link to={'/invoices'} style={{ textDecoration: 'none', color: 'black' }}>
                                <div className='sb1 mt-3 mb-3'>
                                    <div className='sb2'>
                                        <h4><i class="fa-solid fa-file-invoice" 
                                        style={{ color: 'lightgreen' }}></i>  Invoices</h4>
                                    </div>
                                </div>
                            </Link>
                            <Link to={'/clients'} style={{ textDecoration: 'none', color: 'black' }}>
                                <div className='sb1 mt-3 mb-3'>
                                    <div className='sb2'>
                                        <h4><i class="fa-solid fa-user" style={{ color: 'red' }}></i> 
                                         Clients</h4>
                                    </div>
                                </div>
                            </Link>
                            <Link style={{ textDecoration: 'none', color: 'black' }}>
                                <div className='sb1 mt-3 mb-3'>
                                    <div className='sb2'>
                                        <h4><i class="fa-solid fa-briefcase" 
                                        style={{ color: 'violet' }}></i>  Reports</h4>
                                    </div>
                                </div>
                            </Link>
                            <Link style={{ textDecoration: 'none', color: 'black' }}>
                                <div className='sb1 mt-3 mb-3'>
                                    <div className='sb2'>
                                        <h4><i class="fa-solid fa-gear" 
                                        style={{ color: 'darkblue' }}></i>  Settings</h4>
                                    </div>
                                </div>
                            </Link>
                            <Link style={{ textDecoration: 'none', color: 'black' }}>
                                <div className='sb1 mt-3 mb-3'>
                                    <div className='sb2' onClick={(e)=>logout(e)}>
                                        <h4><i class="fa-solid fa-right-from-bracket"
                                        style={{ color: 'darkgreen' }}></i>  Logout</h4>
                                    </div>
                                </div>
                            </Link>
                            <hr />
                            <h5>Documentation</h5>
                            <Link to={'/privacypolicy'} style={{ textDecoration: 'none', color: 'black' }}>
                            <div className='sb1 mt-3 mb-3'>
                                <div className='sb2'>
                                    <h4><i class="fa-solid fa-rocket"></i>  Privacy Policy</h4>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        </div>
    )
}

export default Sidebar