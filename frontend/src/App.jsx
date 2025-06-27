import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Navbar from "./components/Navbar.jsx";
import AddProduct from "./pages/addProduct.jsx";
import EditProduct from "./pages/EditProducts.jsx";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout.jsx"
import OrderConfirmation from "./pages/OrderConfirmation.jsx"
import About from "./pages/About.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import ManageProducts from "./pages/manageProducts.jsx";
function App() {
  useEffect(() => {
    localStorage.removeItem("user"); // clears saved login
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/manageproducts" element={<ManageProducts />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
