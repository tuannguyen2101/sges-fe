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
import CateService from "../../../services/guestservice/CateService";

const Shop = () => {
    const product = useSelector((state) => state.product);

    const dispatch = useDispatch();

    let { id } = useParams();

    const [page, setPage] = useState({});

    const [dataFind, setDataFind] = useState({
        n: 0,
        s: 20,
        p: "create_date",
        d: 1,
    });

    const [categories, setCategories] = useState([]);

    const getAll = () => {
        let { n, s, p, d } = dataFind;
        if (id !== undefined && id !== null && id !== "") {
            productService
                .findProduct(id, n, s, p, d)
                .then((response) => response.json())
                .then((result) => {
                    setPage(result);
                    dispatch(findAll(result));
                })
                .catch((error) => console.log("error", error));
        } else {
            productService
                .findProduct("", n, s, p, d)
                .then((response) => response.json())
                .then((result) => {
                    setPage({ result });
                    dispatch(findAll(result));
                })
                .catch((error) => console.log("error", error));
        }
    };

    const findAllCategory = () => {
        CateService.findAll()
            .then((response) => response.json())
            .then((result) => {
                setCategories(
                    ...new Array(
                        result.map((value, index) => {
                            return value;
                        })
                    )
                );
            })
            .catch((error) => console.log("error", error));
    };

    const findByDate = () => {
        setDataFind({
            ...dataFind,
            p: "create_date",
        });
    };

    const findBySold = () => {
        setDataFind({
            ...dataFind,
            p: "sold",
        });
    };

    const sortBySale = (event) => {
        setDataFind({
            ...dataFind,
            p: "sale",
            d: event.target.value,
        });
    };

    const prev = () => {
        return page.result.first != true
            ? setDataFind({
                  ...dataFind,
                  n: dataFind.n - 1,
              })
            : null;
    };

    const select = (n) => {
        return Number(n) >= 0 && Number(n) <= page.result.totalPages
            ? setDataFind({
                  ...dataFind,
                  n: n,
              })
            : null;
    };

    const next = () => {
        return !page.result.last
            ? setDataFind({
                  ...dataFind,
                  n: dataFind.n + 1,
              })
            : null;
    };

    useEffect(() => {
        getAll();
        findAllCategory();
    }, [id, dataFind]);

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
                <div className="pt-5" style={{ backgroundColor: "#fff" }}></div>
                <div className="filter py-3 mb-3">
                    <div className="container">
                        <div className="filter-content row m-0">
                            <div className="col-left col-6 d-flex justify-content-start align-items-center">
                                <span className="d-flex align-items-center px-2">Lọc sản phẩm</span>
                                <div className="col-auto">
                                    <div className="dropdown">
                                        <Link
                                            className="dropdown-toggle d-flex justify-content-center align-items-center px-3"
                                            to="#"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            id="dropdownMenuButton1"
                                        >
                                            <div className="btn">
                                                {id !== null && id !== undefined && id !== ""
                                                    ? categories.map((value) => {
                                                          return value.id == id && value.name;
                                                      })
                                                    : "Tất cả sản phẩm"}
                                            </div>
                                        </Link>
                                        <ul
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton1"
                                        >
                                            <li>
                                                <Link className="dropdown-item" to="/shop">
                                                    Tất cả sản phẩm
                                                </Link>
                                            </li>
                                            {categories.map((value, index) => {
                                                return (
                                                    <li key={index}>
                                                        <Link
                                                            className="dropdown-item"
                                                            to={"/shop/category/" + value.id}
                                                        >
                                                            {value.name}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-right col-6 d-flex justify-content-end align-items-center">
                                <span className="d-flex align-items-center px-2">Sắp xếp theo</span>
                                <div className="col-auto">
                                    <div
                                        className="sort-by-btn"
                                        style={{
                                            backgroundColor:
                                                dataFind.p == "create_date" ? "#ced4da" : "#fff",
                                        }}
                                    >
                                        <div className="btn" onClick={findByDate}>
                                            <span>Mới nhất</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <div
                                        className="sort-by-btn"
                                        style={{
                                            backgroundColor:
                                                dataFind.p == "sold" ? "#ced4da" : "#fff",
                                        }}
                                    >
                                        <div className="btn" onClick={findBySold}>
                                            <span>Bán chạy</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <select
                                        name="prop"
                                        className="form-select"
                                        onChange={sortBySale}
                                        value={dataFind.p == "sale" && dataFind.d}
                                    >
                                        <option value="-1" hidden>
                                            Giá
                                        </option>
                                        <option value="0">Giá: thấp đến cao</option>
                                        <option value="1">Giá: cao đến thấp</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="item-content d-flex justify-content-center">
                        <div className="row m-0 w-100">
                            <ProductItem
                                product={product.content}
                                width="20%"
                                minHeight={"235.19px"}
                            />
                        </div>
                    </div>
                    <PaginateGuest page={product} prev={prev} select={select} next={next} />
                </div>
            </div>
        </div>
    );
};

export default Shop;
