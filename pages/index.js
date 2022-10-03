import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Herobox from '../components/Herobox'
import Placementsliders from '../components/Placementsliders'
import Caterorieshome from '../components/Caterorieshome'
import Companylist from '../components/Companylist'
import Footer from '../components/Footer'
import Processtojoin from '../components/Processtojoin'
import CourseHomelist from '../components/CourseHomelist'
import { useState, useEffect } from 'react';

export default function Home({ SetHeader_false }) {
  
  useEffect(() => {
    SetHeader_false()
  })
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Skillfilt</title>
          <meta name="description" content="Generated by create next app" />
        </Head>
        <Herobox />
        <div className={styles.dataspacer}> </div>
        <div className={styles.PlacementBox_slider}>
         <Placementsliders />
        </div>
      </div>
      <div className={styles.dataspacer}> </div>

      <div className={styles.container}>
        <Caterorieshome />
      </div>
      <div className={styles.dataspacer}> </div>
      <div className={styles.dataspacer_mob}> </div>
      <div className={styles.container}>
        <CourseHomelist />
      </div>
      <div className={styles.dataspacer}> </div>
      <div className={styles.container_full} style={{ backgroundColor:'#a1ffff'}}>
        <Companylist />
      </div>
      <div className={styles.dataspacer}> </div>
      <div className={styles.container} >
        <Processtojoin />
      </div>
      <div style={{ height: '100px' }}> </div>
      <div className={styles.container_full} style={{ backgroundColor: '#232323' }} >
        <Footer />
      </div>
    </>

  )
}
