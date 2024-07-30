import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { FirebaseProvider } from "./context/firebase";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminDashboard from "./components/admin/AdminDashboard";
import EmpDashboard from "./components/emp/EmpDashboard";
import ProtectedRoute from "./pages/ProtectedRoutes";
import Home from "./pages/Home";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import Book from "./components/book/Book";
import AddBooks from "./components/book/AddBooks";
import BookDetails from "./components/book/BookDetails";
import OrderDetail from "./components/book/OrderDetail";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book" element={<ProtectedRoute component={Book} />} />
        <Route
          path="/book/bookDetails/:bookid"
          element={<ProtectedRoute component={BookDetails} />}
        />
        <Route
          path="/orders"
          element={<ProtectedRoute component={OrderDetail} />}
        />
        <Route
          path="/addbook"
          element={<ProtectedRoute component={AddBooks} />}
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              component={AdminDashboard}
              // allowedRoles="Admin"
            />
          }
        />
        {/* <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute
              component={EmpDashboard}
              allowedRoles={["Employee"]}
            />
          }
        /> */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
