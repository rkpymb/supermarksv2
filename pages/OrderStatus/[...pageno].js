import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import { BASE_URL, AppName } from '../../Data/config'
import Bupass from '../../components/Bupass'
import NavbarNew from '../../components/Parts/NavbarNew'
import Skeleton from '@mui/material/Skeleton';
import Lottie from 'react-lottie'
import CheckloginContext from '../../context/auth/CheckloginContext'
import * as animationData from '../../Data/Lottie/16271-payment-successful.json'


const Slug = (props) => {
   
    const [Retdata, setRetdata] = useState([]);
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    const [ShowDATA, setShowDATA] = useState(false);
    useEffect(() => {
        const txn_date = "14-02-2023";
        const OrderCheck = async () => {
            const sendUMData = { OrderID: props.OID }
            const data = await fetch("../api/QR/OrderPaymentData", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUMData)
            }).then((a) => {
                return a.json();
            })
                .then((parsedORDERCHEK) => {
                    if (parsedORDERCHEK.statusdata == true) {
                        console.table(parsedORDERCHEK.RetData)
                        GetUPISTATUS(parsedORDERCHEK.RetData.Orderid, parsedORDERCHEK.RetData.date)
                    } else {
                        alert('Something went wrong !')
                    }

                })


        }
        OrderCheck()

        const GetUPISTATUS = async (ORID,DATEBY) => {
            const sendUMData = { OrderID: props.OID, txn_date: DATEBY }
            const data = await fetch("../api/QR/QRstatus", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUMData)
            }).then((a) => {
                return a.json();
            })
                .then((parsedQR) => {
                   
                    if (parsedQR.data.status == 'success') {
                        setRetdata(parsedQR.data)
                        UpdateOrder(parsedQR.data.upi_txn_id, parsedQR.data.customer_vpa)
                        console.log(parsedQR.data)
                       
                    } else {
                        alert('Something went wrong !')
                    }

                })


        }
        const UpdateOrder = async (upi_txn_id, customer_vpa) => {
            const sendUMData = { OrderID: props.OID, upi_txn_id: upi_txn_id, customer_vpa: customer_vpa }
            const data = await fetch("../api/QR/UpdateCourseOrder", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUMData)
            }).then((a) => {
                return a.json();
            })
                .then((parsedFinal) => {
                    console.table(parsedFinal.RetData)
                    setShowDATA(true)
                })


        }
        

    }, []);

    return <div>
        <NavbarNew/>
        {!ShowDATA &&
            <div className={styles.container} >
                <div>
                    <Skeleton variant="rectangular" style={{ minHeight: '80vh' }} />
                    <p style={{ textAlign: 'center' }}>Please wait...</p>
                </div>
            </div>
        }
        {ShowDATA &&
        
            <div className={styles.container} >
                <div className={styles.DoneBoxCourse}>
                    <div className={styles.LottieDonepayment}>
                        <Lottie options={defaultOptions}
                            width='100%'
                            height={'100%'}

                            isStopped={false}
                            isPaused={false} />
                    </div>
                    <div className={styles.DoneData}>
                        <div className={styles.DoneDataITEM}>
                            <div className={styles.DoneDataITEMA}>
                                <span className={styles.DoneDataITEMATitle}>Order ID : </span>
                            </div>
                            <div className={styles.DoneDataITEMB}>
                                {Retdata.client_txn_id}
                            </div>
                        </div>
                        <div className={styles.DoneDataITEM}>
                            <div className={styles.DoneDataITEMA}>
                                <span className={styles.DoneDataITEMATitle}>Order Title : </span>
                            </div>
                            <div className={styles.DoneDataITEMB}>
                                {Retdata.p_info}
                            </div>
                        </div>
                        <div className={styles.DoneDataITEM}>
                            <div className={styles.DoneDataITEMA}>
                                <span className={styles.DoneDataITEMATitle}>Status : </span>
                            </div>
                            <div className={styles.DoneDataITEMB}>
                                {Retdata.status}
                            </div>
                        </div>
                        <div className={styles.DoneDataITEM}>
                            <div className={styles.DoneDataITEMA}>
                                <span className={styles.DoneDataITEMATitle}>Order amount : </span>
                            </div>
                            <div className={styles.DoneDataITEMB}>
                               ₹ {Retdata.amount}
                            </div>
                        </div>
                        <div className={styles.DoneDataITEM}>
                            <div className={styles.DoneDataITEMA}>
                                <span className={styles.DoneDataITEMATitle}>Date/Time : </span>
                            </div>
                            <div className={styles.DoneDataITEMB}>
                                {Retdata.createdAt}
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ height: '50px' }}> </div>

            </div>
            
        }


    </div>
};

export async function getServerSideProps(context) {
    // console.log(ID)
    const OID = context.query.pageno[0];
    return {
        props: { OID }, // will be passed to the page component as props
    }
}


export default Slug;