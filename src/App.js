import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { setAuth } from "./actions";
import Authorized from "./components/admin/Authorized";
import Sges from "./components/guest/Sges";
import Noti from "./components/noti/Noti";
import OAuth2RedirectHandler from "./components/security/oauth2/OAuth2RedirectHandler";
import CategoryIndex from "./components/staff/categorys/CategoryIndex";
import CustomerIndex from "./components/staff/customer/CustomerIndex";
import Dashboard from "./components/staff/Dashboard";
import OrderList from "./components/staff/orders/OrderList";
import PrivateRoute from "./components/staff/PrivateRoute";
import ProductIndex from "./components/staff/products/ProductIndex";
import Barchartmonth from "./components/staff/thongke/Barchartmonth";
import ThongKe from "./components/staff/thongke/ThongKe";

const App = () => {
    const auth = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const isAdmin = (roles) => {
        if (roles && roles.includes(1)) {
            return true;
        } else return false;
    };

    const isStaff = (roles) => {
        if (roles && roles.includes(2)) {
            return true;
        } else return false;
    };

    const getProfile = () => {
        if (localStorage.getItem("token")) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            myHeaders.append("Cookie", "JSESSIONID=C6B69B1366935F0C4E7CCAC8732291BA");

            var requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };

            fetch("http://localhost:8080/getProfile", requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    let user = JSON.parse(result);
                    let auth = {
                        id: user.id,
                        username: user.username,
                        fullName: user.fullName,
                        email: user.email,
                        photo: user.photo,
                        roles: user.roles,
                    };
                    dispatch(setAuth(auth));
                })
                .catch((error) => console.log("error", error));
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <>
            <Noti />
            <Router>
                <Routes>
                    <Route path="/*" element={<Sges />} />
                    <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
                    <Route path="/admin/*" element={<PrivateRoute />}>
                        <Route path="/admin/*" element={<Dashboard />}>
                            <Route path="thongke" element={<ThongKe />} />
                            <Route path="theothang" element={<Barchartmonth />} />
                            <Route path="product" element={<ProductIndex />} />
                            <Route path="category" element={<CategoryIndex />} />
                            <Route path="Adminstrator" element={<Authorized />} />
                            <Route path="Order" element={<OrderList />} />
                            <Route path="customer" element={<CustomerIndex />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </>
    );
};

export default App;

// class App extends Component {
//     componentDidMount = () => {
//         this.getProfile();
//     };

//     isAdmin = (roles) => {
//         if (roles && roles.includes(1)) {
//             return true;
//         } else return false;
//     };

//     isStaff = (roles) => {
//         if (roles && roles.includes(2)) {
//             return true;
//         } else return false;
//     };

//     getProfile = () => {
//         if (localStorage.getItem("token")) {
//             var myHeaders = new Headers();
//             myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
//             myHeaders.append("Cookie", "JSESSIONID=C6B69B1366935F0C4E7CCAC8732291BA");

//             var requestOptions = {
//                 method: "GET",
//                 headers: myHeaders,
//                 redirect: "follow",
//             };

//             fetch("http://localhost:8080/getProfile", requestOptions)
//                 .then((response) => response.text())
//                 .then((result) => {
//                     console.log(result);
//                     let user = JSON.parse(result);
//                     let auth = {
//                         id: user.id,
//                         username: user.username,
//                         fullName: user.fullName,
//                         email: user.email,
//                         roles: user.roles,
//                     };
//                     this.props.setAuth(auth);
//                 })
//                 .catch((error) => console.log("error", error));
//         }
//     };

//     render() {
//         let { auth } = this.props;
//         return (
//             <Router>
//                 {/* <Redirect exact to="/sges" /> */}
//                 <Route path="/sges">
//                     <NavTop isStaff={this.isStaff} isAdmin={this.isAdmin} />
//                     <Route exact path="/sges">
//                         <Home />
//                     </Route>
//                     <Route exact path="/sges/collection">
//                         <Collection />
//                     </Route>
//                     <Route exact path="/sges/productdetail">
//                         <ProductDetail />
//                     </Route>
//                     <Route exact path="/sges/cart">
//                         <Cart />
//                     </Route>
//                     <Route exact path="/sges/login">
//                         <Login setRole={this.setRole} />
//                     </Route>
//                     <Route exact path="/sges/checkout">
//                         {auth === null ? <Redirect to="/sges/login" /> : <CheckOut />}
//                     </Route>
//                     <Route exact path="/sges/myorder">
//                         {auth === null ? <Redirect to="/sges/login" /> : <MyOrders />}
//                     </Route>
//                     <Route exact path="/sges/visit">
//                         <Visit />
//                     </Route>
//                     <Route exact path="/sges/myprofile">
//                         {auth === null ? (
//                             <Redirect to="/sges/login" />
//                         ) : (
//                             <Profile auth={auth} isUpdate={false} />
//                         )}
//                     </Route>
//                     <Route exact path="/sges/updateprofile">
//                         {auth === null ? (
//                             <Redirect to="/sges/login" />
//                         ) : (
//                             <Profile auth={auth} isUpdate={true} />
//                         )}
//                     </Route>
//                     <Route exact path="/sges/changepassword">
//                         {auth === null ? (
//                             <Redirect to="/sges/login" />
//                         ) : (
//                             <Profile auth={auth} changepass={true} />
//                         )}
//                     </Route>
//                     <Route exact path="/sges/aboutus">
//                         <AboutUs />
//                     </Route>
//                     <NavBot />
//                 </Route>
//                 <Route path="/thongkesoluong" component={Piechart} />
//                 <Route path="/thongkedoanhthu" component={Linechart} />
//                 <Route path="/month" component={Barchartmonth} />
//                 <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />
//                 <Route path="/staff">
//                     {auth !== null && (this.isAdmin(auth.roles) || this.isStaff(auth.roles)) ? (
//                         <Dashboard auth={this.props.auth} />
//                     ) : (
//                         <Redirect to="/sges/login" />
//                     )}
//                 </Route>
//             </Router>
//         );
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         auth: state.auth,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setAuth: (auth) => {
//             dispatch(action.setAuth(auth));
//         },
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App);

// import React from "react";
// import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
// import Sges from "./components/guest/Sges";

// import Login from "./components/security/login/Login";
// import Dashboard from "./components/staff/Dashboard";
