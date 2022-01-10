import { useEffect, useRef, useState } from "react";
import { BsCartDash, BsSearch } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { clearCart, setAuth } from "../../actions";
import "../../css/header/navtop.scss";
import logo from "../../img/sges.jpg";
import logoText from "../../img/sgesText.png";
import ProfileService from "../../services/guestservice/ProfileService";
import SupCateService from "../../services/guestservice/SupCateService";
import { NotiInfo } from "../noti/Noti";

const NavTop = () => {
    const auth = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const searched = useRef();

    let { cId } = useParams();
    const [supCate, setSupCate] = useState([]);
    const [productName, setProductName] = useState("");
    const [isShow, setIsShow] = useState(false);

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
        dispatch(clearCart());
        NotiInfo("Bạn đã đăng xuất khỏi hệ thống!");
    };

    const [quantity, setQuantity] = useState(0);

    const countItem = (arr) => {
        var q = 0;
        arr.map((value) => {
            q += value.qty;
        });
        return q;
    };

    const searchOnChange = (event) => {
        setProductName(event.target.value);
    };

    const onsearch = () => {
        setIsShow(false);
        setProductName("");
    };

    const resetOnClick = (event) => {
        if (searched.current.contains(event.target)) {
            setIsShow(true);
            return;
        }
        setProductName("");
        setIsShow(false);
    };

    useEffect(() => {
        setQuantity(countItem(cart));
        findAll();
        document.addEventListener("mousedown", resetOnClick);
        return () => {
            document.removeEventListener("mousedown", resetOnClick);
        };
    }, [cart]);

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
                                                <img
                                                    src={
                                                        "http://localhost:8080/file/read/" +
                                                        auth.photo
                                                    }
                                                />
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
                                                to="/login"
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
                            <div className="search-ft" ref={searched}>
                                <div className="drop-down">
                                    <Link to="#" className="subtitle-link" onClick={resetOnClick}>
                                        <div className="btn btn-search">
                                            <span className="search-icon">
                                                <BsSearch />
                                            </span>
                                        </div>
                                    </Link>
                                    <div
                                        className="drop-down-content p-4"
                                        style={{
                                            backgroundColor: "white",
                                            height: "100px",
                                            display: isShow ? "" : "none",
                                        }}
                                    >
                                        <div className="search-input h-100">
                                            <input
                                                type="text"
                                                placeholder="Nhập tên sản phẩm"
                                                onChange={searchOnChange}
                                                value={productName}
                                            />
                                            <form>
                                                <Link
                                                    to={"/shop/product-search/" + productName}
                                                    onClick={onsearch}
                                                >
                                                    <div className="btn btn-search-2 p-0 d-flex justify-content-center align-items-center">
                                                        <span className="search-icon">
                                                            Tìm kiếm
                                                        </span>
                                                    </div>
                                                </Link>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <span>|</span> */}
                            <Link to={auth ? "/cart" : "/login"} className="cart">
                                <div className="btn">
                                    <span className="cart-icon">
                                        <BsCartDash />
                                    </span>
                                    <span className="cart-qty">{quantity}</span>
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
