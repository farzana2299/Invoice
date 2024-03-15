import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { addItemApi, getClientDetailApi } from '../service/allApi';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { ToastContainer, toast } from 'react-toastify';
function Create_Invoice2() {

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


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [clientDetails, setClientDetails] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    const getUserDetails = async () => {
        if (localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            const reqHeader = {
                "access_token": `Bearer ${token}`,
                "Content-Type": "application/json"
            };
            try {
                const result = await getClientDetailApi(id, reqHeader);
                const clientDetailsData = result?.data.message;
                setClientDetails(clientDetailsData);
                setInvoiceData(prevState => ({
                    ...prevState,
                    clientDetails: clientDetailsData
                }));
            } catch (error) {
                console.error("Error fetching client details:", error);
            }
        }
    };
    useEffect(() => {
        getUserDetails()

    }, [])
    // console.log(clientDetails);

    const [invoiceData, setInvoiceData] = useState({
        clientDetails: {},
        currency: '',
        items: [],
        tot_subTotal: 0,
        tot_tax: 0,
        tot_discount: 0,
        tot_total: 0,
        invoiceNumber: 0,
        invoiceDate: "",
        dueDate: '',
        paymentStatus: '',
        paymentMethod: ''
    });

    const [items, setItems] = useState([]);

    // Define initial state for each item
    const initialState = {
        itemName: '',
        quantity: 0,
        description: '',
        unit: '',
        unitPrice: 0,
        taxPercentage: 0,
        tax: 0,
        discount: 0,
        discountPercentage: 0,
        subTotal: 0,
        total: 0
    };

    // State for a single item
    const [formData, setFormData] = useState(initialState);

    const addItem = () => {
        setItems([...items, formData]);
       
        const roundedFormData = {
            ...formData,
            subTotal: parseFloat(formData.subTotal).toFixed(2),
            tax: parseFloat(formData.tax).toFixed(2),
            discount: parseFloat(formData.discount).toFixed(2),
            total: parseFloat(formData.total).toFixed(2)
        };
    
        setItems([...items, roundedFormData]);
        setInvoiceData(prevState => ({
            ...prevState,
            items: [...prevState.items, roundedFormData],
            tot_subTotal: (parseFloat(prevState.tot_subTotal) + parseFloat(roundedFormData.subTotal)).toFixed(2),
            tot_tax: (parseFloat(prevState.tot_tax) + parseFloat(roundedFormData.tax)).toFixed(2),
            tot_discount: (parseFloat(prevState.tot_discount) + parseFloat(roundedFormData.discount)).toFixed(2),
            tot_total: (parseFloat(prevState.tot_total) + parseFloat(roundedFormData.total)).toFixed(2)
        }));
        setFormData(initialState);
    };
    const [itemNameValid, setitemNameValid] = useState(false)
    const [descriptionValid, setdescriptionValid] = useState(false)
    const [quantityValid, setquantityValid] = useState(false)
    const [unitPriceValid, setunitPriceValid] = useState(false)

    const setDatas = (e) => {
        const { name, value } = e.target;
        if (name === 'itemName') {
            if (value.match(/^[a-zA-Z .]+$/)) {
                setitemNameValid(false)
            } else {
                setitemNameValid(true)
            }
        }
        if (name === 'description') {
            if (value.match(/^[a-zA-Z .]+$/)) {
                setdescriptionValid(false)
            } else {
                setdescriptionValid(true)
            }
        }

        if (name === 'quantity') {
            if (value.match(/^[0-9 .]+$/)) {
                setquantityValid(false)
            } else {
                setquantityValid(true)
            }
        }
        if (name === 'unitPrice') {
            if (value.match(/^[0-9 .]+$/)) {
                setunitPriceValid(false)
            } else {
                setunitPriceValid(true)
            }
        }
        if (name === 'currency') {
            setInvoiceData(prevState => ({
                ...prevState,
                currency: value
            }));
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            subTotal: calculateSubTotal(prevState),
            tax: calculateTax(prevState),
            discount: calculateDiscount(prevState),
            total: calculateTotal(prevState)
        }));
    };
    // console.log(formData);
    // console.log(invoiceData); 
    const handleAdd = async (e) => {
        e.preventDefault()

        const { itemName, description, unit, quantity, unitPrice, taxPercentage, tax, discountPercentage,
            discount, subTotal, total } = formData
        console.log(formData);
        if (!itemName || !description || unit === "" || quantity === "" || unitPrice === "" ||
            taxPercentage === "" || discount === "" || tax === "" || discountPercentage === "" ||
            subTotal === "" || total === "") {
            toast.warn('Please fill all datas', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }
        else {
            const token = localStorage.getItem("token")
            const reqHeader = {
                "access_token": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
            const reqBody = {
                "itemName": itemName, "description": description, "unit": unit, "quantity": quantity,
                "unitPrice": unitPrice, "taxPercentage": taxPercentage,
                "tax": tax, "discountPercentage": discountPercentage,
                "discount": discount, "subTotal": subTotal, "total": total
            }
            const result = await addItemApi(clientDetails._id, reqBody, reqHeader)
            // console.log(result);
            if (result.status >= 200 && result.status < 300) {
                toast.success('Item Added Successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setFormData({
                    ...formData, itemName: "", description: "", unit: "",
                    unitPrice: "", subTotal: "", discount: "", discountPercentage: "", tax: "",
                    taxPercentage: "", total: ""

                })
                addItem();
                handleClose();
            }
            else {
                alert(result.response.data.message)
            }
        }

    }


    const calculateSubTotal = (formData) => {
        return (parseFloat(formData.quantity) * parseFloat(formData.unitPrice)).toFixed(2);
    }

    const calculateTax = (formData) => {
        return (calculateSubTotal(formData) * (parseFloat(formData.taxPercentage) / 100)).toFixed(2);
    }
    
    const calculateDiscount = (formData) => {
        return (calculateSubTotal(formData) * (parseFloat(formData.discountPercentage) / 100)).toFixed(2);
    }
    
    const calculateTotal = (formData) => {
        const subTotal = parseFloat(calculateSubTotal(formData));
        const tax = parseFloat(calculateTax(formData));
        const discount = parseFloat(calculateDiscount(formData));

        return (subTotal + tax - discount).toFixed(2);
    }



    const handleNextStep = () => {
        const { clientDetails, currency, items, tot_subTotal, tot_tax, tot_discount, tot_total } = invoiceData;
        if (clientDetails && currency && items.length > 0 && tot_subTotal && tot_tax && tot_discount && tot_total) {
            navigate(`/finalstep/${id}`, { state: { invoiceData } });
        } else {
            toast.error('Please fill all necessary details.', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
        }
    };

    

    return (
        <div>
            <div className='ci'>
                <div className='ci1'>
                    <Row style={{ position: 'relative', right: '10%', top: '10%' }}>

                        <Col lg={4} md={4} sm={4} xs={4} style={{ position: 'relative', top: '15px' }}>
                            <Link to={'/findclient'}>
                                <i class="fa-solid fa-angle-left fa-2x"></i>
                            </Link>
                        </Col>

                        <Col className='text-center' lg={8} md={8} sm={8} xs={8}>
                            <p style={{ fontSize: '25px', position: 'relative', top: '10%' }}>Create <b>Invoice</b> </p>
                            <p>Step 2 from 3</p>
                        </Col>
                    </Row>
                </div>

                <div>
                    <h2 className='pt-5 text-center' style={{ color: 'darkblue' }}>BILLING INFORMATION</h2>
                </div>

                <div>
                    <Row className='container'>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <h4 className='text-start' style={{ position: 'relative', left: '10%' }}>Bill to</h4>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <h4 className='text-end'>Clear</h4>
                        </Col>
                    </Row>
                </div>
                <div className='m-5'>
                    {clientDetails ? (
                        <div className='fc2 mb-5'>

                            <Row>
                                <Col lg={3} md={3} sm={3} xs={3} style={{ position: 'relative', top: '20px', left: '5%' }}>
                                    <img src="https://i.postimg.cc/wjnP3Lb5/download-removebg-preview-1.png" alt="icon" />

                                </Col>
                                <Col lg={9} md={9} sm={9} xs={9} className='text-start' style={{ position: 'relative', top: '20px' }}>
                                    <h5>{clientDetails.name}</h5>
                                    <p>{clientDetails.email}</p>

                                </Col>
                            </Row>

                        </div>
                    ) : (
                        <p>Loading client details...</p>
                    )}
                </div>

                {/* CURRENCY and add item  */}
                <div className='container'>
                    <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                            <>
                                <Form.Select aria-label="Default select example"
                                    value={invoiceData.currency} name='currency'
                                    onChange={(e) => setDatas(e)}
                                >
                                    <option>Currency</option>
                                    <option value="India INR">India INR</option>
                                    <option value="US Dollar">US Dollar</option>
                                    <option value="Kuwait Dinar">Kuwait Dinar</option>
                                </Form.Select>

                            </>
                        </Col>

                        <Col lg={6} md={6} sm={12} xs={12}>
                            <div>

                                <Button variant="primary" size="lg" onClick={handleShow}>
                                    Add Item
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <br />
                    {/* table  */}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ITEM NAME</th>
                                <th>ITEM DESCRIPTION</th>
                                <th>QUANTITY</th>
                                <th>UNIT</th>
                                <th>PRICE</th>
                                <th>SUBTOTAL</th>
                                <th>DISCOUNT</th>
                                <th>TAX </th>
                                <th>TOTAL</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.itemName}</td>
                                    <td>{item.description}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.unit}</td>
                                    <td>{item.unitPrice}</td>
                                    <td>{item.subTotal}</td>
                                    <td>{item.discount}</td>
                                    <td>{item.tax}</td>
                                    <td>{item.total}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </Table>


                    <br /><br />

                    {/* Total values of the table  */}

                    <div className='cri2 container mt-5'>
                        <h4 className='text-center pt-3' style={{ color: 'darkblue' }}>TOTAL</h4>
                        <div>
                            <Row>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <h5 className='text-start'>Sub Total  </h5>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <h5 className='text-end'>$ {invoiceData.tot_subTotal}</h5>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <h5 className='text-start'>Tax   </h5>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <h5 className='text-end'>$ {invoiceData.tot_tax} </h5>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <h5 className='text-start'>Discount   </h5>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <h5 className='text-end'>$ {invoiceData.tot_discount} </h5>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <h5 className='text-start'>Total  </h5>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <h5 className='text-end'>$ {invoiceData.tot_total} </h5>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div className='mt-5 pb-5'>
                        <div>
                            <Button variant="primary" size="lg" onClick={handleNextStep} >
                                Next Step
                            </Button>

                            <Link to={'/home'} style={{ textDecoration: 'none' }}>
                                <p style={{ color: 'darkviolet' }}>Discard Invoice</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ADD ITEMS</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col lg={6} md={6} sm={6}>
                            <>
                                <FloatingLabel controlId="floatingInput" label="ITEM NAME">
                                    <Form.Control name='itemName' value={formData.itemName}
                                        onChange={(e) => setDatas(e)}
                                        type="text" placeholder="itemName" />
                                </FloatingLabel>
                                {itemNameValid &&
                                    <p className='text-danger'>Invalid itemName</p>
                                }
                            </>
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                            <>
                                <FloatingLabel controlId="floatingInput" label="DESCRIPTION">
                                    <Form.Control name='description' value={formData.description}
                                        onChange={(e) => setDatas(e)}
                                        type="text" placeholder="description" />
                                </FloatingLabel>
                                {descriptionValid &&
                                    <p className='text-danger'>Invalid description</p>
                                }
                            </>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col lg={6} md={6} sm={6}>
                            <>
                                <Form.Select aria-label="Default select example" name='unit'
                                    onChange={(e) => setDatas(e)}
                                >
                                    <option>Unit</option>
                                    <option value="Jan">Jan</option>
                                    <option value="Feb">Feb</option>
                                    <option value="Mar">Mar</option>
                                    <option value="Apr">Apr</option>
                                    <option value="May">May</option>
                                    <option value="Jun">Jun</option>
                                    <option value="Jul">Jul</option>
                                    <option value="Aug">Aug</option>
                                    <option value="Sep">Sep</option>
                                    <option value="Oct">Oct</option>
                                    <option value="Nov">Nov</option>
                                    <option value="Dec">Dec</option>
                                </Form.Select>
                            </>
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                            <>
                                <FloatingLabel controlId="floatingInput" label="QUANTITY">
                                    <Form.Control name='quantity' value={formData.quantity} type="text"
                                        onChange={(e) => setDatas(e)}
                                        placeholder="quantity" />
                                </FloatingLabel>
                                {quantityValid &&
                                    <p className='text-danger'>Invalid quantity</p>
                                }
                            </>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col lg={6} md={6} sm={6}>
                            <>
                                <FloatingLabel controlId="floatingInput" label="UNIT PRICE">
                                    <Form.Control name='unitPrice' value={formData.unitPrice}
                                        onChange={(e) => setDatas(e)}
                                        type="text" placeholder="unitPrice" />
                                </FloatingLabel>
                                {unitPriceValid &&
                                    <p className='text-danger'>Invalid unitPrice</p>
                                }
                            </>
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                            <>
                                <FloatingLabel controlId="floatingInput" label="TAX PERCENTAGE">
                                    <Form.Control name='taxPercentage'
                                        value={formData.taxPercentage}
                                        onChange={(e) => setDatas(e)}
                                        type="text" placeholder="taxPercentage" />
                                </FloatingLabel>

                            </>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col lg={6} md={6} sm={6}>
                            <>
                                <FloatingLabel controlId="floatingInput" label="TAX">
                                    <Form.Control name='tax'
                                        value={calculateTax(formData)}
                                        onChange={(e) => setDatas(e)}
                                        type="text" placeholder="tax" />
                                </FloatingLabel>

                            </>
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                            <>
                                <FloatingLabel controlId="floatingInput" label="DISCOUNT PERCENTAGE">
                                    <Form.Control
                                        name='discountPercentage' onChange={(e) => setDatas(e)}
                                        value={formData.discountPercentage}
                                        type="text" placeholder="discountPercentage" />
                                </FloatingLabel>

                            </>
                        </Col>
                    </Row> <br />
                    <Row>
                        <Col lg={6} md={6} sm={6}>
                            <>
                                <FloatingLabel controlId="floatingInput" label="DISCOUNT">
                                    <Form.Control name='discount'
                                        onChange={(e) => setDatas(e)}
                                        value={calculateDiscount(formData)}
                                        type="text"
                                        placeholder="discount" />
                                </FloatingLabel>

                            </>
                        </Col>
                        <Col lg={6} md={6} sm={6}>
                            <>
                                <FloatingLabel controlId="floatingInput" label="SUB TOTAL">
                                    <Form.Control name='subTotal'
                                        onChange={(e) => setDatas(e)}
                                        value={calculateSubTotal(formData)}
                                        type="text"
                                        placeholder="subTotal" />
                                </FloatingLabel>

                            </>
                        </Col>
                    </Row> <br />
                    <Row>
                        <Col lg={6} md={6} sm={6}>
                            <>
                                <FloatingLabel controlId="floatingInput" label="TOTAL">
                                    <Form.Control name='total' onChange={(e) => setDatas(e)}
                                        value={calculateTotal(formData)}
                                        type="text"
                                        placeholder="total" />
                                </FloatingLabel>

                            </>
                        </Col>

                    </Row>

                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={(e) => handleAdd(e)}  >
                        ADD
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </div>
    )
}

export default Create_Invoice2