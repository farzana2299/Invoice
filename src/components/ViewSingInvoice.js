import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getOneInvoiceApi } from '../service/allApi';
import html2pdf from 'html2pdf.js';
import Header from './Header'
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';
import { format } from 'date-fns';
import Table from 'react-bootstrap/Table';
import {toast, ToastContainer } from 'react-toastify';


function ViewSingInvoice() {
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

    const { id } = useParams()
    const [invoice, setInvoice] = useState({})

    const getInvoiceDetails = async () => {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            const reqHeader = {
                "access_token": `Bearer ${token}`,
                "Content-Type": "application/json"
            };
            try {
                const result = await getOneInvoiceApi(id, reqHeader);
                const oneInvoiceData = result?.data.invoice;
                setInvoice(oneInvoiceData);

            } catch (error) {
                console.error("Error fetching client details:", error);
            }
        }
    };
    useEffect(() => {
        getInvoiceDetails()

    }, [id])

    console.log(invoice);

    const handleDownload = () => {
        const element = document.getElementById('invoice-container');
        const options = {
            margin: 0.5,
            filename: 'invoice.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };

        html2pdf()
            .from(element)
            .set(options)
            .save();
    };


    return (
        <div>
            <div className='prev1 pb-5'>
                <div>
                    <Header></Header>
                    <Link to={'/invoices'} style={{ textDecoration: 'none' }}>
                        <div className='text-start ps-5 pt-5'>
                            <h5>Back</h5>
                        </div>
                    </Link>
                    {Object.keys(invoice).length > 0 ? (
                        <div className='pr1 w-75 container mt-5 mb-5' id="invoice-container">
                            <Row>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <h1>ABC COMPANY</h1>
                                    <h4>BC Street, Ernakulam, Kerala</h4>
                                    <p>GST- 123432343</p>
                                    <hr />
                                </Col>
                                <Row>
                                    <Col lg={6} md={6} sm={6} xs={6} className='ps-3 text-start border-end border-dark'>
                                        <h4>RECEIPIENT</h4>
                                        <h6>NAME :  {invoice.clientDetails.name} </h6>
                                        <p>ADDRESS :  {invoice.clientDetails.address}</p>
                                        <p>EMAIL :  {invoice.clientDetails.email}</p>
                                        <p>VAT NUMBER :  {invoice.clientDetails.vatNumber}</p>
                                    </Col>
                                    <Col lg={6} md={6} sm={6} xs={6} className='text-start ps-5'>
                                        <h4>INVOICE DETAILS</h4>
                                        <h6>INVOICE NUMBER :  {invoice.invoiceNumber}</h6>
                                        <p>INVOICE DATE :  {format(new Date(invoice.invoiceDate), 'yyyy-MM-dd')}</p>
                                        <p>DUE DATE :  {format(new Date(invoice.dueDate), 'yyyy-MM-dd')}</p>
                                    </Col>
                                </Row>
                            </Row>
                            <hr />
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ITEM NAME</th>
                                        <th>UNIT PRICE</th>
                                        <th>QUANTITY</th>
                                        <th>TAX</th>
                                        <th>DISCOUNT</th>
                                        <th>TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoice.items.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.itemName}</td>
                                            <td>{item.unitPrice}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.tax}</td>
                                            <td>{item.discount}</td>
                                            <td>{item.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <hr />
                            <Row>
                                <Col lg={6} md={6} sm={6} xs={6} className='border-end border-dark'>
                                    <h5 className='text-start ps-4'>FROM ,</h5>
                                    <div>
                                        <h4>MANAGER</h4>
                                        <h4>ABC COMPANY</h4>
                                    </div>
                                    <div style={{ position: 'relative', top: '40%', left: '30%' }}>
                                        <h6>Signature</h6>
                                    </div>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <div className='pt-3 pb-5'>
                                        <h3 className='pb-5'>TOTAL</h3>
                                        <Row>
                                            <Col lg={6} md={6} sm={6} xs={6} className='text-start ps-4'>
                                                <h5>TAX</h5>
                                            </Col>
                                            <Col lg={6} md={6} sm={6} xs={6} className='text-start ps-4'>
                                                <h5>$ {invoice.tot_tax}</h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={6} md={6} sm={6} xs={6} className='text-start ps-4'>
                                                <h5>DISCOUNT</h5>
                                            </Col>
                                            <Col lg={6} md={6} sm={6} xs={6} className='text-start ps-4'>
                                                <h5>$ {invoice.tot_discount}</h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={6} md={6} sm={6} xs={6} className='text-start ps-4'>
                                                <h5>GRAND TOTAL</h5>
                                            </Col>
                                            <Col lg={6} md={6} sm={6} xs={6} className='text-start ps-4'>
                                                <h5>$ {invoice.tot_total}</h5>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        <h1>Something Went Wrong.......!</h1>
                    )}
                </div>
                <div className='pb-5 '>
                    <Button variant="primary" size="lg" onClick={handleDownload}>
                        Download Invoice
                    </Button>{' '}
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default ViewSingInvoice