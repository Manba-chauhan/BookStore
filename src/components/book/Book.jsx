import {
  Container,
  Box,
  Stack,
  Button,
  InputLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  //   FormControlLabel,
  FormHelperText,
  Input,
  Grid,
  Card,
  CardContent,
  CardMedia, 
  CardActions
} from "@mui/material";
// import React from 'react';
// import { , Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useFirebase } from "../../context/firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import { BurstMode } from "@mui/icons-material";
import BookCard from "./BookCard";
import { listAll } from "firebase/storage";




const Book = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();

  const [books,setBooks] =useState([])

  useEffect(() => {

     firebase.listAllBook().then((book)=>setBooks(book.docs)).catch((error)=> console.log("eeror",error))
    //  console.log("book",books)
  }, [books,firebase]);
 
  return (
    <Box>
      <Header />
      <Container sx={{ mt: 12 }}>
       <Box sx={{mb:4,textAlign:"center"}}>
         <Typography variant="h4" color="primary" sx={{
          fontFamily:"robato",
          fontWeight:600
         }}>
           Learn Everyday And Enjoy Book Jounrey
         </Typography>
       </Box>
        <Grid container spacing={3}>
        {
          books.map((data)=>{
            return (
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <BookCard 
                  id={data.id}
                  // id={data.id}
                  {...data.data()}
                />
              </Grid>

            );
          })
        }
          
         
        </Grid>
      </Container>
    </Box>
  );
};

export default Book;
