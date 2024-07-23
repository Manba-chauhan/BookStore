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
  FormHelperText
} from "@mui/material";
// import React from 'react';
// import { , Box } from "@mui/material";
import React, { useState ,useEffect} from "react";
import { useFirebase } from "../context/firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";

const validationSchema = yup.object().shape({
  fname: yup.string().required("first name is required"),
  lname: yup.string().required("last name is required"),
  address: yup.string().required("address is required"),
  role: yup.string().required("role is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});
  
const Signup = () => {
     const navigate =useNavigate()
const firebase = useFirebase();
    const{
        register,
        handleSubmit,
        formState:{errors},
        reset
    }=useForm({
        resolver:yupResolver(validationSchema)
    })

  const onSubmit=(data)=>{

    const { fname,lname,address,role,email,password}=data
    firebase.signup(fname, lname, address, role, email, password);

    reset()
    // navigate("/book")    
  }
   useEffect(() => {
     if (firebase.isLoggin) {
       return navigate("/book");
     }
   }, [firebase, navigate]);

  


  console.log("firebase", firebase);
  return (
    <Box>
    <Header/>
      <Container>
        {/* <Button
          variant="outlined"
          sx={{ px: 4, mt: 2 }}
          color="primary"
          onClick={() => navigate("/")}
        >
          Back
        </Button> */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "60%", md: "50%" },
              mt: 2,
            }}
          >
            <img
              src="https://img.lovepik.com/photo/45009/7677.jpg_wh860.jpg"
              alt="img"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", sm: "60%", md: "50%" },
              mt: 2,
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography
                component={Box}
                sx={{
                  fontSize: "2.8rem",
                  textAlign: "center",
                  mb: 3,
                  color: "primary.main",
                  fontWeight: "bold",
                  fontFamily:"robato"
                }}
              >
                {" "}
                Explore the World
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
                <Box sx={{ my: 2, width: { xs: "100%", sm: "50%" } }}>
                  <InputLabel>FirstName</InputLabel>
                  <TextField
                    placeholder="enter your FirstName"
                    size="small"
                    {...register("fname")}
                    error={!!errors.fname}
                    helperText={errors.fname?.message}
                    fullWidth
                  />
                </Box>
                <Box sx={{ my: 2, width: { xs: "100%", sm: "50%" } }}>
                  <InputLabel>LastName</InputLabel>
                  <TextField
                    placeholder="enter your LastName"
                    size="small"
                    {...register("lname")}
                    error={!!errors.lname}
                    helperText={errors.lname?.message}
                    fullWidth
                  />
                </Box>
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={5}
                sx={{ my: 3 }}
              >
                <Box sx={{ my: 2, width: { xs: "100%", sm: "50%" } }}>
                  <InputLabel>Address</InputLabel>
                  <TextField
                    size="small"
                    placeholder="enter your Address"
                    {...register("address")}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    fullWidth
                  />
                </Box>
                <Box sx={{ my: 2, width: { xs: "100%", sm: "50%" } }}>
                  <InputLabel>Role</InputLabel>
                  <FormControl fullWidth size="small" error={!!errors.role}>
                    <Select {...register("role")} defaultValue=" ">
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="user">user</MenuItem>
                    </Select>
                    <FormHelperText>{errors.role?.message}</FormHelperText>
                  </FormControl>
                </Box>
              </Stack>
              <Box sx={{ my: 2 }}>
                <InputLabel>email</InputLabel>
                <TextField
                  size="small"
                  placeholder="enter your email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                />
              </Box>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={5}
                sx={{ my: 3 }}
              >
                <Box sx={{ my: 2, width: { xs: "100%", sm: "100%" } }}>
                  <InputLabel>password</InputLabel>
                  <TextField
                    placeholder="enter your password"
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    size="small"
                    fullWidth
                  />
                </Box>
              </Stack>

              <br></br>
              <Button
                variant="contained"
                // color='secondary'

                type="submit"
                fullWidth
              >
                Signup
              </Button>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Signup;
