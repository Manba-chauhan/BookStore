import {
  Container,
  Box,
  Stack,
  Button,
  InputLabel,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { useFirebase } from "../../context/firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";

const validationSchema = yup.object().shape({
  bname: yup.string().required("book name is required"),
  isdn: yup.number().required("isdn is required"),
  authorname: yup.string().required("author name is required"),
  desc: yup.string().required("desc is required"),
  price: yup.number().required("price is required"),
  // bookpic: yup.mixed().required("images is required")
});

const AddBooks = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [alert, setAlert] = useState(null); // State to manage alert visibility

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleAddBook = async (data) => {
    const { bname, isdn, authorname, desc, price, bookpic } = data;
    const bookpicFile = bookpic[0];
    await firebase.handleBookListing(
      bname,
      isdn,
      authorname,
      desc,
      price,
      bookpicFile
    );
    setAlert("Your Book is successfully added to your list.");
    reset();
  };

  return (
    <Box>
      <Header />
      <Container>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
          component="form"
          onSubmit={handleSubmit(handleAddBook)}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "100%", md: "50%" },
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
              width: { xs: "100%", sm: "100%", md: "50%" },
              mt: 2,
            }}
          >
            {alert && (
              <Alert severity="success" onClose={() => setAlert(null)}>
                {alert}
              </Alert>
            )}
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
                Add Books
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
                <Box sx={{ my: 2, width: { xs: "100%", sm: "50%" } }}>
                  <InputLabel>Book Name</InputLabel>
                  <TextField
                    placeholder="enter book name"
                    size="small"
                    {...register("bname")}
                    error={!!errors.bname}
                    helperText={errors.bname?.message}
                    fullWidth
                  />
                </Box>
                <Box sx={{ my: 2, width: { xs: "100%", sm: "50%" } }}>
                  <InputLabel>isdn number</InputLabel>
                  <TextField
                    placeholder="enter isdn number"
                    size="small"
                    type="number"
                    {...register("isdn")}
                    error={!!errors.isdn}
                    helperText={errors.isdn?.message}
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
                  <InputLabel>Book Author</InputLabel>
                  <TextField
                    placeholder="enter Author Name"
                    size="small"
                    {...register("authorname")}
                    error={!!errors.authorname}
                    helperText={errors.authorname?.message}
                    fullWidth
                  />
                </Box>
                <Box sx={{ my: 2, width: { xs: "100%", sm: "50%" } }}>
                  <InputLabel>Book Description</InputLabel>
                  <TextField
                    placeholder="enter Description"
                    size="small"
                    multiline
                    rows={3}
                    {...register("desc")}
                    error={!!errors.desc}
                    helperText={errors.desc?.message}
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
                  <InputLabel>Price</InputLabel>
                  <TextField
                    size="small"
                    type="number"
                    placeholder="enter price"
                    {...register("price")}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    fullWidth
                  />
                </Box>
                <Box sx={{ my: 2, width: { xs: "100%", sm: "50%" } }}>
                  <InputLabel>Book CoverPic</InputLabel>
                  <input
                    size="small"
                    type="file"
                    {...register("bookpic")}
                    error={!!errors.bookpic}
                    helperText={errors.bookpic?.message}
                  />
                </Box>
              </Stack>
              <br />
              <Button variant="contained" type="submit" fullWidth>
                ADD BOOK
              </Button>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default AddBooks;
