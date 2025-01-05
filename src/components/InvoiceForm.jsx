import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, FormLabel, InputGroup, Row } from 'react-bootstrap'
import InvoiceItem from './reusable/InvoiceItem'
import InvoiceModel from './reusable/InvoiceModel'

const InvoiceForm = () => {
    const [state, setState] = useState({
        isOpen: false,
        date: new Date().toLocaleDateString('en-GB'),
        admitDate : new Date().toLocaleDateString('en-GB'),
        dischargeDate : new Date().toLocaleDateString('en-GB'),
        currency: "₹",
        currentDate: "",
        invoiceNumber: "1",
        billTo: "",
        billToAddress: "",
        billToNumber: "",
        billFrom: "Punarjeevan Ayush Nature Cure Center",
        billFromAddress: "NO: 36, EB Colony Main Rd, EB Colony, TVS Nagar, Coimbatore, Tamil Nadu 641025",
        billFromNumber: "9345316319",
        billFromEmail: "punarjeevanayushnaturecure@gmail.com",
        notes: "",
        days: 1,
        subTotal: "0.00",
        discountAmount: 0,
        discountRate: "0"
    })
    const [total, setTotal] = useState(0.00)
    const [items, setItems] = useState([{
        id: "0",
        name: "",
        days: 1,
        price: 9500
    }])
    const onChange = (event) => {
        setState((state) => ({
            ...state,
            [event.target.name]: event.target.value,
        }))
    }
    const onItemizedItemEdit = (event) => {
        const individualItem = {
            id: event.target.id,
            name: event.target.name,
            value: event.target.value
        }

        var newItems = items.map((item) => {
            for (var key in item) {
                if (key === individualItem.name && individualItem.id) {
                    item[key] = individualItem.value
                }
            }
            return item
        })
        setItems(newItems)

    }
    const handleAddEvent = (event) => {
        var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
        var item = {
            id,
            name: "",
            price: 1.0,
            days: 1
        }
        setItems((items) => [...items, item])
    }
    const handleRowDel = (item) => {
        if (items.length > 1) {

            setItems((items) => items.filter((data) => data.id !== item.id))
        }
        else {
            setItems([{
                id: "0",
                name: "",
                days: 1,
                price: 0.00
            }])
        }
    }
    const handleCalculateTotal = (items) => {
        var subTotal = 0;
        items.map((item) => {
            subTotal += parseFloat(item.price).toFixed(2) * parseInt(item.days)
        })
        
        const discountAmount = parseFloat( parseFloat(subTotal) * parseFloat(state.discountRate/100)).toFixed(2)

        const total = parseFloat(subTotal) - parseFloat(discountAmount)

        setTotal(total)

        setState(state => ({
            ...state,
            subTotal,
            discountAmount
        }))
    }
    useEffect(() => {
        handleCalculateTotal(items)
    }, [items, state.discountRate])

    return (
        <Form onSubmit={(e) => {
            e.preventDefault()
            setState((state) => ({ ...state, isOpen: true }))
        }}>
            <div className='d-flex justify-content-center m-2'>

                <img src='./logo.jpg' width={"100px"} height={"100px"} />
            </div>
            <Row>
                <Col md={8} lg={9}>
                    <Card className='d-flex p-4 p-xl-5 my-3 my-xl-4'>
                        <div className='d-flex flex-row justify-content-between '>


                            <div className='d-flex flex-row mb-3'>
                                <div className='mb-2'>
                                    <span className='fw-bold'>Date:&nbsp; </span>
                                    
                                    <Form.Control
                                    placeholder='Enter Date'
                                    value={state.date}
                                    type='date'
                                    name='date'
                                    className='my-2'
                                    onChange={onChange}
                                    autoComplete='date'
                                    required={true}
                                />
                                </div>

                            </div>
                            <div className='d-flex flex-row mb-3'>
                                <div className='mb-2'>
                                    <span className='fw-bold'>Invoice&nbsp;Number :&nbsp;</span>
                                    <span>{state.invoiceNumber}</span>
                                </div>

                            </div>
                        </div>
                        <hr className='my-4' />
                        <Row className='mb-5'>
                            <Col>
                                <Form.Label className='fw-bold'>Paitent Details:</Form.Label>
                                <Form.Control
                                    placeholder='Enter Name'
                                    value={state.billTo}
                                    type='text'
                                    name='billTo'
                                    className='my-2'
                                    onChange={onChange}
                                    autoComplete='name'
                                    required={true}
                                />


                                <Form.Control
                                    placeholder='Enter Number'
                                    value={state.billToNumber}
                                    type='tel'
                                    name='billToNumber'
                                    className='my-2'
                                    onChange={onChange}
                                    autoComplete='number'
                                    required={true}
                                />


                                <Form.Control
                                    placeholder='Enter Address'
                                    value={state.billToAddress}
                                    type='text'
                                    name='billToAddress'
                                    className='my-2'
                                    onChange={onChange}
                                    autoComplete='address'
                                    required={true}
                                />
                                <Form.Label className='fw-bold'>Admit Date:</Form.Label>
                                <Form.Control
                                    placeholder='Enter Admit Date'
                                    value={state.admitDate}
                                    type='date'
                                    name='admitDate'
                                    className='my-2'
                                    onChange={onChange}
                                    autoComplete='admitDate'
                                    required={true}
                                />
                                <Form.Label className='fw-bold'>Discharge Date:</Form.Label>
                                <Form.Control
                                    placeholder='Enter Discharge Date'
                                    value={state.dischargeDate}
                                    type='date'
                                    name='dischargeDate'
                                    className='my-2'
                                    onChange={onChange}
                                    autoComplete='dischargeDate'
                                    required={true}
                                />
                            </Col>
                            <Col>
                                <Form.Label className='fw-bold'>Bill From:</Form.Label>
                                <Form.Control value={state.billFrom} className='my-2' disabled={true} />
                                <Form.Control value={state.billFromAddress} className='my-2' disabled={true} />
                                <Form.Control value={state.billFromNumber} className='my-2' disabled={true} />
                                <Form.Control value={state.billFromEmail} className='my-2' disabled={true} />
                            </Col>
                        </Row>
                        <InvoiceItem items={items} onItemizedItemEdit={onItemizedItemEdit} onRowAdd={handleAddEvent} onRowDel={handleRowDel} currency={state.currency} />
                        <Row className='mt-4 justify-content-end'>
                            <Col lg={6}>
                            <div className='d-flex flex-row align-items-start justify-content-between'>
                                <span className='fw-bold' >Subtotal:</span>
                                <span>{state.currency} {state.subTotal} </span>
                            </div>
                            <div className='d-flex flex-row align-items-start justify-content-between mt-2'>
                                <span className='fw-bold' >Discount:</span>
                                <span>{state.discountRate}% {state.currency} {state.discountAmount} </span>
                            </div>
                            <div className='d-flex flex-row align-items-start justify-content-between mt-2' style={{fontSize:'1.25rem'}}>
                                <span className='fw-bold' >Total:</span>
                                <span> {state.currency} {total} </span>
                            </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col md={4} lg={3}>
                    <div className='sticky-top pt-md-3 pt-xl-4'>
                        <Button variant='primary' type='submit' className='d-block w-100' >
                            Review Invoice
                        </Button>
                        <Form.Group className='my-3'>
                            <Form.Label className='fw-bold'>Discount Rate: </Form.Label>
                            <InputGroup className='my-1 flex-nowrap'>
                                <Form.Control
                                    name='discountRate'
                                    type='number'
                                    value={state.discountRate}
                                    onChange={onChange}
                                    className='bg-white-border'
                                    placeholder='0.00'
                                    min={'0'}
                                    step={'1'}
                                    max={'100.00'}
                                />
                                <InputGroup.Text className='bg-light fw-bold text-secondary small'> % </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </div>
                </Col>
            </Row>
            <InvoiceModel showModal={state.isOpen} closeModal={() => setState(state => ({ ...state, isOpen: false }))} info={state} items={items} total={total} currency={state.currency}/>
        </Form>
    )
}

export default InvoiceForm
