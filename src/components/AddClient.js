import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function AddClient() {
    const navigate=useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please Login First", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/login');
        }
    }, []);
    return (
        <div>
            <div>
                <Header></Header>
                <div style={{ position: 'relative' }} >
                    <div className='ho1'>
                        <div className='ho3'>
                        <i class="fa-solid fa-user "></i> <br />
                        <div style={{width:'25%',height:'25%',position:'relative',left:'38%'}}>
                        <p>You don't have any added clients at the moment</p>
                        </div>
                        </div>
                    </div>
                    <div className='ho2'>
                        <div className='ho4'>
                            <p>Add your First <b>Client Here</b></p>
                            <img style={{ height: '250px', position: 'relative', right: '5%' }}
                                src="https://i.postimg.cc/MThTP8VB/lovepik-black-dashed-arrow-png-image-400612639-wh1200-removebg-preview-1.png" alt="" />
                        </div>
                        <Link to={'/addnewclient'}>
                        <div className='ac1'>
                            <Button  size="lg">
                            <i class="fa-solid fa-user "></i>  Add New Client
                            </Button>
                        </div>
                        </Link>
                    </div>
                </div>
                <Footer></Footer>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default AddClient