import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/home/home.scss";
import hangmoive from "../../img/hang-moi-ve.jpg";
import newIcon from "../../img/new-corner-label.png";
import sanphambanchayTitle from "../../img/san-pham-ban-chay.jpg";
import slide1 from "../../img/slide1.png";
import slide2 from "../../img/slide2.jpg";
import slide3 from "../../img/slide3.jpg";
import productService from "../../services/guestservice/productService";
import ProductItem from "./product/ProductItem";

const Home = () => {
    const [productNews, setProductNews] = useState([]);

    const [sanPhamBanChay, setSanPhamBanChay] = useState([]);

    const findProductNewByTop = () => {
        productService
            .findProductNew()
            .then((response) => response.json())
            .then((result) => {
                setProductNews(
                    ...new Array(
                        result.map((value, index) => {
                            return value;
                        })
                    )
                );
            })
            .catch((error) => console.log("error", error));
    };

    const timSanPhamBanChay = () => {
        productService
            .timSanPhamBanChay()
            .then((response) => response.json())
            .then((result) => {
                setSanPhamBanChay(
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
        findProductNewByTop();
        timSanPhamBanChay();
    }, []);

    return (
        <div className="sges-home">
            <div className="container-fluid p-0">
                <div
                    id="carouselExampleCaptions"
                    className="carousel slide sges-slider"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-indicators slide-btn">
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                    </div>
                    <div className="carousel-inner slide-img">
                        <div className="carousel-item active slide-img-item">
                            <Link to="/shop">
                                <img src={slide1} className="d-block w-100" alt="..." />
                            </Link>
                        </div>
                        <div className="carousel-item slide-img-item">
                            <Link to="/shop">
                                <img src={slide2} className="d-block w-100" alt="..." />
                            </Link>
                        </div>
                        <div className="carousel-item slide-img-item">
                            <Link to="/shop">
                                <img src={slide3} className="d-block w-100" alt="..." />
                            </Link>
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className="sges-product-new container py-2 mb-5">
                    <div className="py-5 d-flex justify-content-center">
                        <div className="title d-flex justify-content-center align-item-center py-2 w-100">
                            <img src={hangmoive} alt="" />
                        </div>
                    </div>
                    <div className="content d-flex">
                        <div className="row m-0">
                            <ProductItem product={productNews} width="25%" />
                        </div>
                    </div>
                </div>
                <div className="sges-product-new container py-2">
                    <div className="py-5 d-flex justify-content-center">
                        <div className="title d-flex justify-content-center align-item-center py-2 w-100">
                            <img src={sanphambanchayTitle} alt="" />
                        </div>
                    </div>
                    <div className="content d-flex">
                        <div className="row m-0">
                            <ProductItem product={sanPhamBanChay} width="25%" minHeight={"300px"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
