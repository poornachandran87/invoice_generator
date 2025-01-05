import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React from 'react'
import { Button, Modal, Table } from 'react-bootstrap'

const InvoiceModel = (props) => {
    const generateInvoice = () =>{
        html2canvas(document.querySelector("#invoicecapture")).then((canvas) => {
            const imgData = canvas.toDataURL("img/png",1.0)
            const pdf = new jsPDF({
                orientation : "portrait",
                unit : "pt",
                format: [612,792]
            })
            pdf.internal.scaleFactor = 1;
            const imgProps = pdf.getImageProperties(imgData)
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
            pdf.addImage(imgData, 'PNG', 0,0, pdfWidth,pdfHeight)
            pdf.save(props.info.billTo + "_invoice.pdf")
        })
    }
    return (
        <div>
            <Modal
                show={props.showModal}
                onHide={props.closeModal}
                size='lg'
                centered >
                <div id='invoicecapture' >
                    <div className='d-flex justify-content-center mt-4'>

                        <img src='./logo.jpg' width={"100px"} height={"100px"} />
                    </div>
                    <div className='d-flex flex-row justify-content-between align-items-center bg-light w-100 p-4' >

                        <div className='w-70 ' >

                            <div className='mt-5'>
                                <h1>        </h1>
                                <h6 style={{ textAlign: "center" }}>Government of India</h6>
                                <h6 style={{ textAlign: "center" }}>Ministry of Micro, Small and Medium Enterprises</h6>
                                <h6 style={{ textAlign: "center" }}>UDYAM</h6>
                                <h6 style={{ textAlign: "center" }}>REGISTRATION CERTIFICATE NUMBER</h6>
                                <h6 style={{ textAlign: "center" }}>UDYAM-TN-03-0235197</h6>
                            </div>

                        </div>
                        <div>
                            <h1 style={{ textAlign: "center", fontSize: '80px' }} className='fw-bold'  >Invoice</h1>
                            <h6 style={{ textAlign: "center" }} > No:36, EB Colony Main Road, TVS Nagar,</h6>
                            <h6 style={{ textAlign: "center" }} > Coimbatore, Tamil Nadu 641025</h6>
                            <h6 style={{ textAlign: "center" }} > Phone No: 9345316319</h6>
                            <h6 style={{ textAlign: "center" }} > punarjeevanayushnaturecure@gmail.com</h6>
                        </div>
                    </div>
                    <hr style={{ border: "1px solid black" }} />
                    <div className='d-flex flex-row justify-content-between align-items-center bg-light w-100 p-4'>
                        <div className='w-70'>
                            <div>

                                <h6 className='fw-bold mb-2'> Invoice Number#: {props.info.invoiceNumber} </h6>
                                <h6 className='fw-bold mb-2'> Invoice Date: {props.info.date.split('-').reverse().join('/')} </h6>
                            </div>
                        </div>

                        <div className='d-flex flex-column align-items-start justify-content-end'>
                            <h6 className='fw-bold mb-2'>Patient Name: <span style={{ fontWeight: 'normal' }}>{props.info.billTo}</span></h6>
                            <h6 className='fw-bold mb-2'>Phone Number: <span style={{ fontWeight: 'normal' }}>{props.info.billToNumber}</span> </h6>
                            <h6
                                className="fw-bold mb-2"
                                style={{
                                    whiteSpace: 'normal',
                                    wordBreak: 'break-word',
                                    maxWidth: '250px',
                                }}
                            >
                                Address: <span style={{ fontWeight: 'normal' }}>{props.info.billToAddress}</span>
                            </h6>
                            <hr></hr>
                            <h6 className='fw-bold mb-2'>Admit Date: <span style={{ fontWeight: 'normal' }}>{props.info.admitDate.split('-').reverse().join('/')}</span></h6>
                            <h6 className='fw-bold mb-2'>Admit Date: <span style={{ fontWeight: 'normal' }}>{props.info.dischargeDate.split('-').reverse().join('/')}</span></h6>
                        </div>
                    </div>

                    <div className='m-1'>
                        <Table className='mb-0' style={{ border: "2px solid black" }}>
                            <thead className='bg-black text-white'>
                                <th>DESCRIPTION OF SERVICE/TREATMENT</th>
                                <th>No of Days</th>
                                <th>AMOUNT</th>

                            </thead>
                            <tbody>
                                {props.items.map((item, i) => {
                                    return (
                                        <>
                                            <tr id={i} key={i} >
                                                <td style={{ width: '70px' }}>{item.name}</td>
                                                <td style={{ width: '60px' }}>{item.days}</td>
                                                <td style={{ width: '70px' }} className='text-center'>{props.currency} {item.days * item.price}</td>
                                            </tr>

                                        </>
                                    )
                                })}
                            </tbody>
                        </Table>
                        <Table className='mb-0' style={{ border: "2px solid black" }}>
                            <tbody>
                                <tr>
                                    <td>                 </td>
                                    <td>  </td>
                                    <td>  </td>
                                    <td>  </td>
                                    <td>  </td>
                                    <td>  </td>
                                    <td>  </td>
                                    <td>  </td>
                                    <th className='text-center fw-bold'> Total :</th>
                                    
                                    <td className='text-center'> {props.currency} {props.total}</td>

                                </tr>
                            </tbody>
                        </Table>

                    </div>

                </div>
                <div className='pb-4 px-4'>

                    <Button variant='primary' className='d-block w-100 mt-3 mt-md-0' onClick={generateInvoice}> Download </Button>

                </div>
            </Modal>
        </div>
    )
}

export default InvoiceModel
