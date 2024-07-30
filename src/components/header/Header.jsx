import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  Stack,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/firebase";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSignup = () => {
    return navigate("/signup");
  };

  const handleSignin = () => {
    return navigate("/login");
  };

  const handleBookpage = () => {
    if (firebase.isLoggIn) {
      return navigate("/book");
    }
    return navigate("/login");
  };

  const handleAddBookpage = () => {
    if (firebase.isLoggIn) {
      return navigate("/addbook");
    }
    return navigate("/login");
  };

 const handleOrderDetails = () => {
   if (firebase.isLoggIn) {
    console.log("jeloo")
     return navigate("/orders");
   }
   return navigate("/login");
 };
  const handleLogout = async () => {
    await firebase.logOut();
    navigate("/");
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <Box
      sx={{ width: 250, bgcolor: "primary.main", height: "100%" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box color="inherit" sx={{ float: "right", my: 1 }}>
        <Button size="large" sx={{ color: "#fff" }}>
          <CloseIcon />
        </Button>
      </Box>
      <List
        sx={{
          color: "#fff",
          // fontSize:"39px"
        }}
      >
        
        {firebase.isLoggIn ? (
          <>
            <ListItem button onClick={handleBookpage}>
              <ListItemText primary="BookStore" />
            </ListItem>
            <Divider color="#fff" />
            <ListItem button onClick={handleAddBookpage}>
              <ListItemText primary="AddListing" />
            </ListItem>
            <Divider color="#fff" />
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="SignOut" />
            </ListItem>
            <Divider color="#fff" />
          </>
        ) : (
          <>
            <ListItem button onClick={handleSignup}>
              <ListItemText primary="Signup" />
            </ListItem>
            <ListItem button onClick={handleSignin}>
              <ListItemText primary="SignIn" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        backgroundColor: "none",
        mb: 10,
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          background: "#0B3A5A",
        }}
      >
        <Container>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Button
                sx={{
                  fontFamily: "Roboto",
                  fontWeight: 500,
                  color: "#fff",
                  fontSize: "1.75rem",
                }}
                onClick={() => navigate("/book")}
              >
                Bookify
              </Button>
            </Box>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawerList()}
            </Drawer>
            <Stack
              direction="row"
              spacing={{ xs: 2, sm: 4 }}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              {firebase.isLoggIn ? (
                <>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={handleBookpage}
                  >
                    BookStore
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={handleAddBookpage}
                  >
                    AddListing
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={handleOrderDetails}
                  >
                    Orders
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleLogout}
                  >
                    SignOut
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleSignup}
                  >
                    Signup
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleSignin}
                  >
                    SignIn
                  </Button>
                </>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
