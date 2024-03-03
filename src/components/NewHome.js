import React from 'react'
import Header from './Header'
import Footer from './Footer'
function NewHome() {
  return (
    <div>
        <div>
            <Header></Header>
            <div style={{position:'relative'}} >
                <div className='ho1'>
                    <div className='ho3'>
                        <i class="fa-regular fa-file-lines fa-2x"></i>
                        <p>No Invoices Found</p>
                    </div>
                </div>
                <div className='ho2'>
                    <div className='ho4'>
                        <p>Create your First <b>Invoice</b></p>
                        <img style={{height:'300px',position:'relative',right:'5%'}}
                         src="https://i.postimg.cc/MThTP8VB/lovepik-black-dashed-arrow-png-image-400612639-wh1200-removebg-preview-1.png" alt="" />
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    </div>
  )
}

export default NewHome