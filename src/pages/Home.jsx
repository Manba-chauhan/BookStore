import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/header/Header';
import Home1 from '../components/home/Home1';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import { useEffect } from 'react';
const Home = () => {
  const navigate=useNavigate();
  const firebase=useFirebase()
  //  useEffect(() => {
  //    const isLoggedIn = firebase.isLoggedIn;
  //    if (isLoggedIn) {
  //      navigate("/book");
  //    }
  //  });
  return (
    <Box>
      <Header />
       <Home1/>
    </Box>
  );
}

export default Home;
