import React, { useEffect, useState } from "react";
import shopImg from "../../../img/shop2.jpg";
import "../../../css/shop/shop.scss";
import { Link, useParams } from "react-router-dom";
import pnew1 from "../../../img/new1.jpg";
import pnew2 from "../../../img/new2.jpg";
import pnew3 from "../../../img/new3.jpg";
import pnew4 from "../../../img/new4.jpg";
import PaginateGuest from "../../pagination/PaginateGuest";
import { useSelector } from "react-redux";
import productService from "../../../services/guestservice/productService";
import { useDispatch } from "react-redux";
import { findAll } from "../../../actions/productActions";
import ProductItem from "../product/ProductItem";

const Shop = () => {
    const product = useSelector((state) => state.product);

    const dispatch = useDispatch();

    let { cId } = useParams();

    const [page, setPage] = useState({
        content: [],
        last: false,
        first: true,
        totalElement: 0,
    });

    const [dataFind, setDataFind] = useState({
        cId: "",
        n: "",
        s: "",
        p: "",
        d: "",
    });

    const getAll = () => {
        let { cId, n, s, p, d } = dataFind;
        productService
            .findProduct(cId, n, s, p, d)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                dispatch(findAll(result));
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        getAll();
    }, []);

    return (
        <div className="sges-shop">
            <div className=" shop-title d-flex justify-content-center align-item-center w-100">
                <img src={shopImg} alt="" />
                <div className="title-shop py-3 px-5">
                    <h1>Shop</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/" style={{ color: "#eee" }}>
                                    Sges
                                </Link>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                                style={{ color: "#1e96e6" }}
                            >
                                Shop
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className="shop-content pb-5">
                <div className="container">
                    <div className="filter py-3 mt-5 mb-3">
                        <div className="filter-content row m-0">
                            <div className="col-left col-6 d-flex justify-content-start align-items-center">
                                <span className="d-flex align-items-center px-2">
                                    Lọc sản phẩm theo
                                </span>
                                <div className="col-auto">
                                    <select name="prop" className="form-select">
                                        <option hidden>Danh mục</option>
                                        <option value="0">Áo Khoác</option>
                                        <option value="1">Áo Sơ mi</option>
                                        <option value="2">Áo In</option>
                                        <option value="3">Áo Phản quang</option>
                                        <option value="4">Mascot Sges</option>
                                        <option value="5">Quần StreetStyle</option>
                                        <option value="6">Quần Jogger</option>
                                        <option value="7">Quần Short</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-right col-6 d-flex justify-content-end align-items-center">
                                <span className="d-flex align-items-center px-2">Sắp xếp theo</span>
                                <div className="col-auto">
                                    <div className="sort-by-btn">
                                        <div className="btn">
                                            <span>Mới nhất</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <div className="sort-by-btn">
                                        <div className="btn">
                                            <span>Bán chạy</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <select name="prop" className="form-select">
                                        <option hidden>Giá</option>
                                        <option value="0">Giá: thấp đến cao</option>
                                        <option value="1">Giá: cao đến thấp</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item-content d-flex">
                        <div className="row m-0 d-flex justify-content-center">
                            <ProductItem product={product.content} width="20%" />
                        </div>
                    </div>
                    <PaginateGuest />
                </div>
            </div>
        </div>
    );
};

export default Shop;
