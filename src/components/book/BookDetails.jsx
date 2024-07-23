import {
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
  Button
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/firebase";
import { useParams } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Header from "../header/Header";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from "@mui/icons-material/Add";
const BookDetails = () => {
  const firebase = useFirebase();
  const params = useParams();
  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  const [qty ,setQty]=useState(1)
  console.log("params", params);

  useEffect(() => {
    firebase
      .getBookID(params.bookid)
      .then((value) => setData(value.data()))
      .catch((err) => console.log("error", err));
  }, []);

  useEffect(() => {
    if (data) {
      const imgURL = data.imgURL;
      firebase
        .getImgURL(imgURL)
        .then((url) => setURL(url))
        .catch((err) => console.log(err));
    }
  }, [data]);
  return (
    <>
      {data == null ? (
        <Typography>Loading....</Typography>
      ) : (
        <>
          <Box>
            <Header />
            <Container sx={{ mt: 15 }}>
              <Stack
                direction={{ xs: "column", sm: "column", md: "row" }}
                spacing={3}
              >
                <Box sx={{ width: { xs: "100%", md: "50%" }, height: 400 }}>
                  <img
                    src={url}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                  />
                </Box>
                <Box sx={{ width: { xs: "100%", md: "50%" } }}>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "robato",
                        fontWeight: 700,
                        fontSize: "2rem",
                        my: 0,
                        color: "primary.main",
                      }}
                      component={Box}
                    >
                      {data.name}
                    </Typography>
                    <Divider color="primary" />
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{ my: 2 }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "robato",
                          fontWeight: 200,
                          fontSize: "1.2rem",
                          my: 1,
                          color: "primary.light",
                        }}
                      >
                        Author Name :{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {data.authorname}
                        </span>
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "robato",
                          fontWeight: 200,
                          fontSize: "1.2rem",
                          my: 1,
                          color: "primary.light",
                        }}
                      >
                        Sold By :{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {data.userEmail}
                        </span>
                      </Typography>
                    </Stack>
                    <Typography
                      sx={{
                        fontFamily: "robato",
                        fontWeight: 600,
                        fontSize: "1.2rem",
                        my: 1,
                        color: "primary.light",
                      }}
                    >
                      Book Description
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "robato",
                        // fontWeight: 700,
                        fontSize: "20px",
                        textAlign: "justify",
                        // my: 1,
                        // color: "primary.light",
                      }}
                      component={Box}
                    >
                      {data.desc}
                    </Typography>
                    <Stack
                      direction="row"
                      //   spacing={14}
                      justifyContent="space-between"
                      sx={{
                        fontFamily: "robato",
                        fontWeight: 700,
                        fontSize: "2rem",
                        my: 0,
                        color: "primary.light",
                      }}
                      //   component={Box}
                    >
                      <Typography
                        sx={{
                          fontFamily: "robato",
                          fontWeight: 200,
                          fontSize: "1.3rem",
                          my: 2,
                          color: "primary.light",
                        }}
                      >
                        ISDN Number -{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {data.isdn}
                        </span>{" "}
                      </Typography>

                      <Typography
                        // color="primary.dark"
                        sx={{
                          fontFamily: "robato",
                          fontWeight: 200,
                          fontSize: "1.3rem",
                          my: 2,
                          color: "primary.light",
                        }}
                      >
                        Price -{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          <IconButton size="small">
                            <CurrencyRupeeIcon color="primary.main" />
                          </IconButton>
                          {data.price}
                        </span>{" "}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={3} sx={{ mt: 3 }}>
                      {qty == null ? (
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          sx={{ px: 4 }}
                          endIcon={<ShoppingCartIcon />}
                        >
                          BuyNow
                        </Button>
                      ) : (
                        <Box sx={{ width: "50%" }}>
                          <IconButton>
                            <RemoveIcon color="secondary.main" />
                          </IconButton>
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ px: 0, textWrap: "nowrap", width: 10 }}
                            // endIcon={<FavoriteBorderIcon />}
                            onClick={(e) =>
                              navigate(`/book/bookDetails/${props.id}/`)
                            }
                          >
                            {qty}
                          </Button>
                          <IconButton>
                            <AddIcon />
                          </IconButton>
                        </Box>
                      )}

                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ px: 4, textWrap: "nowrap" }}
                        endIcon={<FavoriteBorderIcon />}
                        onClick={(e) =>
                          navigate(`/book/bookDetails/${props.id}/`)
                        }
                      >
                        LIke
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Stack>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default BookDetails;
