import React, { useState, useEffect } from "react";
import {
  Stack,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Box,
  IconButton,
} from "@mui/material";
import { useFirebase } from "../../context/firebase";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const BookCard = (props) => {
  const [url, setURL] = useState(null);
  const [qty, setQty] = useState(1);
  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    firebase
      .getImgURL(props.imgURL)
      .then((url) => setURL(url))
      .catch((err) => console.log("error"));
  }, [props.imgURL, firebase]);

  const placeOrder = async (id) => {
    const result = await firebase.placeOrder(id, qty);
    console.log("result", result);
    return result;
  };

  const handleQtyChange = async (newQty) => {
    if (newQty < 1) return; // Prevent quantity from being less than 1
    setQty(newQty);
    await firebase.updateQty(props.id, newQty); // Update Firebase with new quantity
  };

  return (
    <Card sx={{ p: 1, borderRadius: "12px", bgcolor: "secondary.light" }}>
      <Box
        sx={{
          height: { xs: 340, sm: 350, md: 240 },
          objectFit: "contain",
          borderRadius: "12px",
        }}
      >
        <CardMedia
          sx={{
            height: "100%",
            width: "100%",
            borderRadius: "12px",
          }}
          image={url}
          title="Book Image"
        />
      </Box>
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "roboto",
            fontWeight: 700,
            fontSize: "2rem",
            my: 0,
            color: "primary.main",
          }}
        >
          {props.name}
        </Typography>
        <Typography
          sx={{
            fontFamily: "roboto",
            fontWeight: 200,
            fontSize: "1.2rem",
            my: 1,
            color: "primary.light",
          }}
        >
          Author Name:{" "}
          <span style={{ fontWeight: "bold" }}>{props.authorname}</span>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "roboto",
            fontSize: "14px",
            textAlign: "justify",
          }}
        >
          {props.desc}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            fontFamily: "roboto",
            fontWeight: 700,
            fontSize: "2rem",
            my: 0,
            color: "primary.light",
          }}
        >
          <Typography
            sx={{
              fontFamily: "roboto",
              fontWeight: 200,
              fontSize: "1rem",
              my: 2,
              color: "primary.light",
            }}
          >
            ISDN Number:{" "}
            <span style={{ fontWeight: "bold" }}>{props.isdn}</span>
          </Typography>
          <Typography
            sx={{
              fontFamily: "roboto",
              fontWeight: 200,
              fontSize: "1rem",
              my: 2,
              color: "primary.light",
            }}
          >
            Price:{" "}
            <span style={{ fontWeight: "bold" }}>
              <IconButton size="small">
                <CurrencyRupeeIcon />
              </IconButton>
              {props.price}
            </span>
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={3} sx={{ mt: -1 }}>
          <Stack direction="row" alignItems="center">
            <IconButton size="small" onClick={() => handleQtyChange(qty - 1)}>
              <RemoveIcon />
            </IconButton>
            <Button variant="body1" sx={{ px: 2 }}>
              {qty}
            </Button>
            <IconButton size="small" onClick={() => handleQtyChange(qty + 1)}>
              <AddIcon />
            </IconButton>
          </Stack>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ px: 2, textWrap: "nowrap" }}
            endIcon={<ReadMoreIcon />}
            onClick={() => navigate(`/book/bookDetails/${props.id}`)}
          >
            Read More
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default BookCard;
