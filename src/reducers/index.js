import { combineReducers } from "redux";
import prods from "./guestreducer/prods";
import prodDetail from "./guestreducer/prodDetail";
import cart from "./guestreducer/cart";
import products from "./staffreducer/products";
import productDetail from "./staffreducer/productDetail";
import myOrders from "./guestreducer/myOrder";
import auth from "./guestreducer/auth";
import profile from "./profile";
import category from "./staffreducer/category";
import customer from "./staffreducer/customer";
import product from "./guestreducer/product";
import actionProduc from "./staffreducer/actionProduct";
import cartv2 from "./guestreducer/cartv2";
const myReducer = combineReducers({
    prods,
    prodDetail,
    cart,
    myOrders,
    auth,
    products,
    productDetail,
    profile,
    category,
    customer,
    product,
    actionProduc,
    cartv2,
});

export default myReducer;
