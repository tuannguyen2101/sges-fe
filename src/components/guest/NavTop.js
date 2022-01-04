import { useEffect } from "react";
import { useState } from "react";
import { BsCartDash, BsSearch } from "react-icons/bs";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "../../css/header/navtop.scss";
import logo from "../../img/sges.jpg";
import logoText from "../../img/sgesText.png";
import SupCateService from "../../services/guestservice/SupCateService";
import { FaUserCircle } from "react-icons/fa";
import ProfileService from "../../services/guestservice/ProfileService";
import { useDispatch } from "react-redux";
import { setAuth } from "../../actions";
import { NotiInfo } from "../noti/Noti";

const NavTop = () => {
    const auth = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    let { cId } = useParams();

    // const [categories, setCategories] = useState([]);

    const [supCate, setSupCate] = useState([]);

    const [isLogOut, setIsLogOut] = useState(false);

    const findAll = () => {
        SupCateService.findAll()
            .then((response) => response.json())
            .then((result) => {
                setSupCate(
                    ...new Array(
                        result.map((value, index) => {
                            return value;
                        })
                    )
                );
            })
            .catch((error) => console.log("error", error));
    };

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

    const logout = () => {
        ProfileService.logout();
        dispatch(setAuth(null));
        NotiInfo("Bạn đã đăng xuất khỏi hệ thống!");
    };

    useEffect(() => {
        findAll();
    }, [isLogOut]);

    return (
        <>
            <div className="sges-header">
                <div className="container">
                    <div className="row m-0">
                        <div className="col-6 p-0 header-left">
                            <Link to="#">
                                <div className="btn">
                                    <span>Hotline: 0707191381</span>
                                </div>
                            </Link>
                            <span>|</span>
                            <Link to="#">
                                <div className="btn">
                                    <span>Kết nối</span>
                                </div>
                            </Link>
                            <a href="https://www.facebook.com/sges.unisex" target="_blank">
                                <div className="btn px-1">
                                    <span>
                                        <FaFacebook />
                                    </span>
                                </div>
                            </a>
                            <a href="https://www.instagram.com/sges.unisex" target="_blank">
                                <div className="btn px-1">
                                    <span>
                                        <FaInstagram />
                                    </span>
                                </div>
                            </a>
                        </div>
                        <div className="col-6 p-0 header-right">
                            {auth && (isStaff(auth.roles) || isAdmin(auth.roles)) && (
                                <>
                                    <Link to="/admin">
                                        <div className="btn">
                                            <span>Quản lý cửa hàng</span>
                                        </div>
                                    </Link>
                                    <span>|</span>
                                </>
                            )}
                            {auth && (
                                <div className="dropdown">
                                    <Link
                                        to="#"
                                        className="d-flex"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <div className="btn">
                                            {auth.photo ? (
                                                <img src={auth.photo} />
                                            ) : (
                                                <FaUserCircle />
                                            )}
                                            <span style={{ paddingLeft: "8px" }}>
                                                {(auth && auth.fullName) || "username"}
                                            </span>
                                        </div>
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to={
                                                    auth
                                                        ? "/myprofile/" + auth.username
                                                        : "/myprofile/"
                                                }
                                            >
                                                Tài khoản của tôi
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/myorder">
                                                Đơn mua
                                            </Link>
                                        </li>
                                        <li>
                                            <dir className="dropdown-divider"></dir>
                                        </li>
                                        <li>
                                            <Link
                                                className="dropdown-item text-danger"
                                                to="/"
                                                onClick={logout}
                                            >
                                                Đăng xuất
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}

                            {!auth && (
                                <>
                                    <Link to="/login">
                                        <div className="btn">
                                            <span>Đăng ký</span>
                                        </div>
                                    </Link>
                                    <span>|</span>
                                    <Link to="/login">
                                        <div className="btn">
                                            <span>Đăng nhập</span>
                                        </div>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="sges-nav-top">
                <div className="container">
                    <nav className="navbar p-0 m-0">
                        <div className="col-3 col-left p-0">
                            <Link className="navbar-brand p-0 m-0" to="/">
                                <div className="btn d-flex py-0">
                                    <img className="logo-img" src={logo} alt="sges" height="60px" />
                                    <div className="logo-text px-3">
                                        <img
                                            className="logo-text"
                                            src={logoText}
                                            alt="sges"
                                            height="45px"
                                        />
                                        <span>&reg;</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-auto col-mid p-0">
                            <div className="drop-down">
                                <Link to={"/shop"} className="subtitle-link">
                                    <div className="btn sup-title">
                                        <span>Sản phẩm</span>
                                    </div>
                                </Link>
                            </div>
                            {supCate.map((value, index) => {
                                return (
                                    <div className="drop-down" key={index}>
                                        <Link to="#" className="subtitle-link">
                                            <div className="btn sup-title">
                                                <span>{value.name}</span>
                                            </div>
                                        </Link>
                                        {value.categories && value.categories.length && (
                                            <div className="drop-down-content">
                                                {" "}
                                                {value.categories.map((value, index) => {
                                                    return (
                                                        <Link
                                                            to={"/shop/category/" + value.id}
                                                            key={index}
                                                        >
                                                            <div className="btn sub-title">
                                                                {value.name}
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            <div className="drop-down">
                                <Link to="/visit" className="subtitle-link">
                                    <div className="btn sup-title">
                                        <span>Địa chỉ</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="drop-down">
                                <Link to="/about" className="subtitle-link">
                                    <div className="btn sup-title">
                                        <span>Giới thiệu</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-3 text-end col-right p-0">
                            <div className="drop-down">
                                <Link to="#" className="search-link">
                                    <div className="btn btn-search">
                                        <span className="search-icon">
                                            <BsSearch />
                                        </span>
                                    </div>
                                </Link>
                                `
                                {/* <div className="drop-down-content">
                                    <Link to={"/shop/category/"}>
                                        <div className="btn sub-title">sdfsdfsdf</div>
                                    </Link>
                                </div> */}
                                `
                            </div>
                            <span>|</span>
                            <Link to="/cart">
                                <div className="btn">
                                    <span className="cart-icon">
                                        <BsCartDash />
                                    </span>
                                    <span className="cart-qty">
                                        {cart && cart.length ? cart.length : 0}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default NavTop;
