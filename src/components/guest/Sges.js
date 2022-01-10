import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "../../css/sges/sges.scss";
import NotFound from "../notfound/NotFound";
import Login from "../security/login/Login";
import ChangePassword from "../security/profile/ChangePassword";
import Profile from "../security/profile/Profile";
import ProfileRead from "../security/profile/ProfileRead";
import UpdateProfile from "../security/profile/UpdateProfile";
import PrivateRoute from "../staff/PrivateRoute";
import AboutUs from "./AboutUs";
import Cart from "./Cart";
import CheckOut from "./CheckOut";
import Footer from "./Footer";
import Home from "./Home";
import MyOrders from "./MyOrders";
import NavTop from "./NavTop";
import ProductDetail from "./product/ProductDetail";
import Shop from "./shop/Shop";
import Visit from "./Visit";

const Sges = () => {
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);

    const setStorage = (asod) => {
        return auth ? localStorage.setItem(auth.username, JSON.stringify(asod)) : null;
    };

    useEffect(() => {
        setStorage(cart);
    }, [cart, auth]);

    return (
        <>
            <NavTop />
            <main className="sges-main-content">
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="/shop/*" element={<Shop />}>
                        <Route path="category/:id" element={<Shop />} />
                        <Route path="product-search/:name" element={<Shop />} />
                    </Route>
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<CheckOut />} />
                    <Route path="visit" element={<Visit />} />
                    <Route path="about" element={<AboutUs />} />

                    <Route path="myorder" element={<MyOrders />} />
                    <Route path="/myprofile/*" element={<Profile />}>
                        <Route path="/myprofile/*" element={<PrivateRoute />}>
                            <Route path=":username" element={<ProfileRead />} />
                            <Route path=":username/update" element={<UpdateProfile />} />
                            <Route path=":username/change-password" element={<ChangePassword />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
};

export default Sges;
