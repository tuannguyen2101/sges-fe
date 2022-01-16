import React from "react";
import { Link } from "react-router-dom";
import "../../css/footer/footer.scss";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { FaShopify } from "react-icons/fa";
import lazada from "../../img/lazada.png";
import shopee from "../../img/shopee.png";
import sges from "../../img/sges.jpg";
import sgesText from "../../img/sgesText.png";

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <footer className="py-5">
                    <div className="row">
                        <div className="col-3">
                            <h5>Sản phẩm</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2">
                                    <Link to="shop/category/1" className="nav-link p-0 text-muted">
                                        Áo khoác
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="shop/category/2" className="nav-link p-0 text-muted">
                                        Mascot SGES
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="shop/category/3" className="nav-link p-0 text-muted">
                                        Áo sơ mi
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="shop/category/4" className="nav-link p-0 text-muted">
                                        Áo in
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="shop/category/6" className="nav-link p-0 text-muted">
                                        Quần Jogger
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="shop/category/7" className="nav-link p-0 text-muted">
                                        Quần StreetStyle
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="shop/category/8" className="nav-link p-0 text-muted">
                                        Quần short
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="shop/category/9" className="nav-link p-0 text-muted">
                                        Balo túi
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="shop/category/10" className="nav-link p-0 text-muted">
                                        Phụ kiện
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-3">
                            <h5>Về SGES</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2">
                                    <Link to="/" className="nav-link p-0 text-muted">
                                        Trang chủ
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/shop" className="nav-link p-0 text-muted">
                                        Sản phẩm
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/size-chart" className="nav-link p-0 text-muted">
                                        Chọn Size
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/visit" className="nav-link p-0 text-muted">
                                        Hệ thống cửa hàng
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/about" className="nav-link p-0 text-muted">
                                        Giới thiệu
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-3">
                            <h5>Kết nối với chúng tôi</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2">
                                    <a
                                        href="https://www.facebook.com/sges.unisex/"
                                        className="nav-link p-0 text-muted"
                                        target="_blank"
                                    >
                                        <AiFillFacebook color="blue" className="me-2" />
                                        Facebook
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a
                                        href="https://www.instagram.com/sges.unisex/"
                                        className="nav-link p-0 text-muted"
                                        target="_blank"
                                    >
                                        <AiFillInstagram color="violet" className="me-2" />
                                        Instagram
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a
                                        href="https://shopee.vn/sges.clothing"
                                        className="nav-link p-0 text-muted"
                                        target="_blank"
                                    >
                                        <img
                                            src={shopee}
                                            width="8%"
                                            alt="shopee"
                                            className="me-2"
                                        />
                                        Shopee
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a
                                        href="https://www.lazada.vn/sges-123490620/"
                                        className="nav-link p-0 text-muted"
                                        target="_blank"
                                    >
                                        <img src={lazada} width="8%" className="me-2" alt="" />
                                        Lazada
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-3">
                            <div className="d-flex flex-column">
                                <div className="sges-logo text-center">
                                    <img
                                        src={sges}
                                        width="70%"
                                        alt="sges.unisex"
                                        style={{ borderRadius: "50px" }}
                                    />
                                </div>
                                <div className="title w-100 text-center">
                                    <h1>
                                        <img width="60%" src={sgesText} alt="" />
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between pt-4 mt-4 border-top">
                        <p>
                            Copyright © 2022 sges.unisex - Thương hiệu tời trang Local brand được
                            giới trẻ yêu thích nhất Việt Nam
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Footer;
