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

const NavTop = () => {
    const auth = useSelector((state) => state.auth);

    let { cId } = useParams();

    // const [categories, setCategories] = useState([]);

    const [supCate, setSupCate] = useState([]);

    const findAll = () => {
        SupCateService.findAll()
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
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

    useEffect(() => {
        findAll();
    }, []);

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
                            <Link to="#">
                                <div className="btn px-1">
                                    <span>
                                        <FaFacebook />
                                    </span>
                                </div>
                            </Link>
                            <Link to="#">
                                <div className="btn px-1">
                                    <span>
                                        <FaInstagram />
                                    </span>
                                </div>
                            </Link>
                        </div>
                        <div className="col-6 p-0 header-right">
                            {auth ? (
                                <Link to="/admin">
                                    <div className="btn">
                                        <span>Quản lý cửa hàng</span>
                                    </div>
                                </Link>
                            ) : (
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
                                            height="70px"
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
                                        <Link to={""} className="subtitle-link">
                                            <div className="btn sup-title">
                                                <span>{value.name}</span>
                                            </div>
                                        </Link>
                                        <div className="drop-down-content" key={index}>
                                            {value.categories &&
                                                value.categories.length &&
                                                value.categories.map((value, index) => {
                                                    return (
                                                        <Link to={value.id} key={index}>
                                                            <div className="btn sub-title">
                                                                {value.name}
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="drop-down">
                                <Link to="/visit" className="subtitle-link">
                                    <div className="btn sup-title">
                                        <span>Cửa hàng</span>
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
                            <Link to="#">
                                <div className="btn btn-search">
                                    <span className="search-icon">
                                        <BsSearch />
                                    </span>
                                </div>
                            </Link>
                            <span>|</span>
                            <Link to="/cart">
                                <div className="btn">
                                    <span className="cart-icon">
                                        <BsCartDash />
                                    </span>
                                    <span className="cart-qty">1</span>
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

// class NavTopOld extends Component {
//     logout = () => {
//         ProfileService.logout();
//         this.props.setAuth(null);
//     };

//     render() {
//         return (
//             <div>
//                 <div className="p-2" style={{ backgroundColor: "#E3E3E3" }}>
//                     <div className="row m-0">
//                         <div className="col-6"></div>
//                         <div className="col-6 text-center d-flex justify-content-center align-items-center">
//                             {this.props.auth &&
//                             (this.props.isStaff(this.props.auth.roles) ||
//                                 this.props.isStaff(this.props.auth.roles)) ? (
//                                 <Link to="/staff">
//                                     <div className="btn">Quản lý cửa hàng</div>
//                                 </Link>
//                             ) : null}
//                             {this.props.auth ? (
//                                 <div className="dropdown px-3">
//                                     <Link
//                                         className="text-dark dropdown-toggle d-flex align-items-center text-decoration-none"
//                                         to="#"
//                                         id="dropdownMenuLink"
//                                         data-bs-toggle="dropdown"
//                                         aria-expanded="false"
//                                     >
//                                         <div className="btn px-0">
//                                             <FaUserCircle />
//                                             <span style={{ paddingLeft: "10px" }}>
//                                                 {this.props.auth.username || "username"}
//                                             </span>
//                                         </div>
//                                     </Link>
//                                     <ul
//                                         className="dropdown-menu"
//                                         aria-labelledby="dropdownMenuLink"
//                                     >
//                                         <li>
//                                             <Link className="dropdown-item" to="/sges/myprofile">
//                                                 Tài khoản của tôi
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <Link className="dropdown-item" to="/sges/myorder">
//                                                 Đơn mua
//                                             </Link>
//                                         </li>
//                                         <li>
//                                             <dir className="dropdown-divider"></dir>
//                                         </li>
//                                         <li>
//                                             <Link
//                                                 className="dropdown-item text-danger"
//                                                 to="#"
//                                                 onClick={this.logout}
//                                             >
//                                                 Đăng xuất
//                                             </Link>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             ) : (
//                                 <Link to="/sges/login">
//                                     <div className="btn">
//                                         <FaUserCircle />
//                                         <span className="ms-2">Đăng nhập</span>
//                                     </div>
//                                 </Link>
//                             )}
//                             <span>|</span>
//                             <Link
//                                 style={{ textDecoration: "none" }}
//                                 className="text-dark"
//                                 to="/sges/cart"
//                             >
//                                 <span className="ms-2">
//                                     <i className="bi bi-cart"></i>
//                                 </span>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="navbar navbar-expand-lg navbar-dark bg-dark p-4">
//                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul className="navbar-nav" style={{ margin: "0 auto" }}>
//                             <li className="nav-item">
//                                 <Link className="nav-link h5 active mb-0 ms-4 me-4" to="/sges">
//                                     S G E S
//                                 </Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link ms-4 me-4" to="/sges" style={{}}>
//                                     Trang chủ
//                                 </Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link ms-4 me-4" to="/sges/collection">
//                                     Bộ sưu tập
//                                 </Link>
//                             </li>
//                             {/* <li className="nav-item">
//                                 <Link className="nav-link ms-4 me-4" to='/sges/store'>LOOKBOOK</Link>
//                             </li> */}
//                             <li className="nav-item">
//                                 <Link className="nav-link ms-4 me-4" to="/sges/aboutus">
//                                     Giới thiệu
//                                 </Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link ms-4 me-4" to="/sges/visit">
//                                     Địa chỉ
//                                 </Link>
//                             </li>
//                         </ul>
//                     </div>
//                     <button
//                         className="navbar-toggler"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#navbarSupportedContent"
//                         aria-controls="navbarSupportedContent"
//                         aria-expanded="false"
//                         aria-label="Toggle navigation"
//                     >
//                         <span className="navbar-toggler-icon" />
//                     </button>
//                 </div>
//             </div>
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

// export  connect(mapStateToProps, mapDispatchToProps)(NavTopOld);
