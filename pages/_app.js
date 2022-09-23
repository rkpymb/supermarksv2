import Login from '../components/Login'
import { useState, useEffect } from 'react'
import { useRouter, Router } from 'next/router'
import '../styles/globals.css'
import Navbar from '../components/Navbar'
import SubNavbar from '../components/SubNavbar'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import LoadingBar from 'react-top-loading-bar'
function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenmodal] = useState(false);
  const [subheader, setSubheader] = useState(false);
  const [BackDrop, setBackDrop] = useState(false);
  const handleOpen = () => setOpenmodal(true);
  const handleClose = () => setOpenmodal(false);
  const [userlogst, setUserlogst] = useState(false);
  const [userlogData, setUserlogData] = useState();
  const BackDropOpen = () => {
    setBackDrop(true)
  }
  
  const BackDropClose = () => {
    setBackDrop(false)
  }
  const SetHeader_true = () => {
    setSubheader(true)
  }
  const SetHeader_false = () => {
    setSubheader(false)
  }
  useEffect(() => {
    Router.events.on("routeChangeStart", BackDropOpen);
    Router.events.on("routeChangeComplete", BackDropClose);
    Router.events.on("routeChangeError", BackDropClose);
    setProgress(progress + 100)
     // check login credential
    setSubheader(false)
    try {
      if (localStorage.getItem('userid')) {
        setUserlogst(true);
        const usermobnow = localStorage.getItem('userid');
        const sendUser = { usermobnow }
        const data = fetch("/api/check", {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(sendUser)
        }).then((a) => {
          return a.json();
        })
          .then((parsedUser) => {
            setUserlogData(parsedUser.data)
            

          })
       
      }
    } catch (error) {
      console.error(error)
      localStorage.clear()
    }
    // check login credential end

  }, []);
  
  

  return <>
    <LoadingBar
      color='blue'
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
    {subheader && (
      <SubNavbar handleOpen={handleOpen} userlogst={userlogst} userlogData={userlogData} />
    )}
    {!subheader && (
      <Navbar handleOpen={handleOpen} userlogst={userlogst}  />
    )}
    
   
    <Component {...pageProps} handleOpen={handleOpen} userlogst={userlogst} userlogData={userlogData} SetHeader_true={SetHeader_true} SetHeader_false={SetHeader_false} />
    <Login openModal={openModal} handleClose={handleClose} BackDropOpen={BackDropOpen} BackDropClose={BackDropClose} />
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }}
      open={BackDrop}

    >
      <CircularProgress color="inherit" />
    </Backdrop>
  </>
}

export default MyApp
