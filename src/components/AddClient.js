import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
function AddClient() {
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
        </div>
    )
}

export default AddClient