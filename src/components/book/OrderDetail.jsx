import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useFirebase } from "../../context/firebase";
import Header from "../header/Header";

const OrderDetail = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const firebase = useFirebase();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await firebase.getOrders(); // Updated to match your context function
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [firebase]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Header />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Your Orders
        </Typography>
        {orders.length === 0 ? (
          <Typography variant="body1">No orders found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Book Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>User Email</TableCell>
                 
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.qty}</TableCell>
                    <TableCell>{order.userID}</TableCell>
                    <TableCell>{order.userEmail}</TableCell>
                  
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default OrderDetail;
