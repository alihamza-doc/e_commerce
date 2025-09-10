import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import './app.css'
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProduct from "./pages/addProduct";
import EditProduct from "./pages/EditProducts";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";
import ManageProducts from "./pages/manageProducts";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import MyOrders from "./pages/MyOrder";
function App() {
  useEffect(() => {
    localStorage.removeItem("user"); // clears saved login
  }, []);

  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        

        {/* ✅ Pages with Navbar & Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-orders" element={<MyOrders />} />

        </Route>

        {/* ❌ Pages without Navbar & Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/manageproducts" element={<ManageProducts />} />
        <Route path="/add-product" element={<AddProduct />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
