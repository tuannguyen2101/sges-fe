import React from "react";
import { Route, Routes } from "react-router-dom";
import "../../css/sges/sges.scss";
import NotFound from "../notfound/NotFound";
import Login from "../security/login/Login";
import AboutUs from "./AboutUs";
import Cart from "./Cart";
import CheckOut from "./CheckOut";
import Footer from "./Footer";
import Home from "./Home";
import MyOrders from "./MyOrders";
import NavTop from "./NavTop";
import ProductDetail from "./ProductDetail";
import Profile from "./Profile";
import Shop from "./shop/Shop";
import Visit from "./Visit";

const Sges = () => {
    return (
        <>
            <NavTop />
            <main className="sges-main-content">
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="shop" element={<Shop />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<CheckOut />} />
                    <Route path="visit" element={<Visit />} />
                    <Route path="about" element={<AboutUs />} />

                    <Route path="myoder" element={<MyOrders />} />
                    <Route path="myprofile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
};

export default Sges;
