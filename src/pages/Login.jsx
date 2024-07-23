import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Stack,
  Button,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../components/header/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const firebase = useFirebase();
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  // useEffect(()=>{
  //   if(firebase.isLoggin){
  //      return navigate("/book")
  //   }
     
  // },[firebase,navigate])

  const handleLogin = async () => {
   if (!validate()) {
     return;
   }

   try {
     await firebase.login(email, password);
     // Wait for role to be updated
    //  const role = firebase.role;
     
    //    if (role === "Admin") {
    //      navigate("/admin");
    //    }else if (role === "user") {
    //      navigate("/book"); // Redirect to signup if role is undefined
    //    }
   } catch (error) {
     console.error("Error logging in:", error);
     
     navigate("/"); // Redirect to signup on error
   }
  };
  useEffect(()=>{
    // debugger
    // const isLoggedIn = firebase.isLoggedIn;
    if (firebase.isLoggIn) {
      navigate("/book");
    }
  },[firebase,navigate])

  return (
    <Box>
      <Header/>
      <Container>
        {/* <Button
          variant="outlined"
          sx={{ px: 4, mt: 2 }}
          onClick={() => navigate("/")}
        >
          Back
        </Button> */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          component="form"
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "60%", md: "50%" },
              mt: 3,
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
              mt: 3,
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
                  fontFamily: "roboto",
                }}
              >
                Welcome to the Login
              </Typography>

              <Box sx={{ my: 2 }}>
                <InputLabel>Email</InputLabel>
                <TextField
                  size="small"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  error={!!emailError}
                  helperText={emailError}
                />
              </Box>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={5}
                sx={{ my: 3 }}
              >
                <Box sx={{ my: 2, width: { xs: "100%", sm: "100%" } }}>
                  <InputLabel>Password</InputLabel>
                  <TextField
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size="small"
                    fullWidth
                    error={!!passwordError}
                    helperText={passwordError}
                  />
                </Box>
              </Stack>
              <Box sx={{ float: "right", mb: 2 }}>
                <Typography variant="span" sx={{ fontSize: "13px" }}>
                  You don't have an account?
                  <Button
                    variant="text"
                    sx={{
                      textDecoration: "underline",
                      textTransform: "capitalize",
                      fontWeight: 600,
                    }}
                    onClick={() => navigate("/signup")}
                  >
                    Create Account
                  </Button>
                </Typography>
              </Box>
              <br />
              <Button variant="contained" onClick={handleLogin} fullWidth>
                Login
              </Button>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
