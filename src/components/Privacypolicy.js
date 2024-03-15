import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import {toast, ToastContainer } from 'react-toastify';

function Privacypolicy() {
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
      <div className='pp1 pt-5'>
        <h1 className='text-center pb-5' style={{ color: 'darkblue' }}>Privacy Policy</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim iusto autem vel perferendis repellat minus dolore cupiditate dolorem magnam voluptate. Ex debitis vitae voluptatum minus nulla consequatur provident blanditiis saepe.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim iusto autem vel perferendis repellat minus dolore cupiditate dolorem magnam voluptate. Ex debitis vitae voluptatum minus nulla consequatur provident blanditiis saepe.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim iusto autem vel perferendis repellat minus dolore cupiditate dolorem magnam voluptate. Ex debitis vitae voluptatum minus nulla consequatur provident blanditiis saepe.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim iusto autem vel perferendis repellat minus dolore cupiditate dolorem magnam voluptate. Ex debitis vitae voluptatum minus nulla consequatur provident blanditiis saepe.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim iusto autem vel perferendis repellat minus dolore cupiditate dolorem magnam voluptate. Ex debitis vitae voluptatum minus nulla consequatur provident blanditiis saepe.</p>
        <Link to={'/home'}>
        <div className='mt-5 mb-5'>
          <Button variant="primary">I Agree</Button>{' '}
        </div>
        </Link>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Privacypolicy