import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "../../css/product/productDetail.scss";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import productService from "../../services/guestservice/productService";

const ProductDetail = () => {
    const products = useSelector((state) => state.product);
    let { id } = useParams();

    const [item, setItem] = useState({
        color: "",
        size: "",
        quantity: 1,
    });

    const [category, setCategory] = useState({
        id: "",
        name: "",
        status: "",
    });

    const [productDetail, setProductDetail] = useState([]);

    const [product, setProduct] = useState({
        createDate: "",
        description: "",
        id: "",
        image: "",
        name: "",
        price: "",
        sale: "",
        sold: "",
        status: "",
    });

    const [sizes, setSizes] = useState([]);

    const [colors, setColors] = useState([]);

    const [quantity, setQuantity] = useState();

    const findProduct = () => {
        productService
            .findById(id)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setProduct({
                    createDate: result.createDate,
                    description: result.description,
                    id: result.id,
                    image: result.image,
                    name: result.name,
                    price: result.price,
                    sale: result.sale,
                    sold: result.sold,
                    status: result.status,
                });
                setCategory({
                    id: result.id,
                    name: result.name,
                    status: result.status,
                });
                setProductDetail(result.productDetails);
                setColors([
                    ...new Set(
                        result.productDetails.map((value) => {
                            return value.color;
                        })
                    ),
                ]);
                setSizes([
                    ...new Set(
                        result.productDetails.map((value) => {
                            return value.size;
                        })
                    ),
                ]);
                setQuantity(tinhQty(result.productDetails));
            })
            .catch((error) => console.log("error", error));
    };

    const tinhQty = (q) => {
        var qty = 0;
        q.map((value, index) => {
            qty += value.qty;
        });
        return qty;
    };

    const onChange = (event) => {
        if (isNaN(event.target.value) || event.target.value < 1) {
            setItem({ ...item, quantity: 1 });
        } else {
            setItem({
                ...item,
                [event.target.name]: event.target.value,
            });
        }
    };

    const tang = () => {
        setItem({
            ...item,
            quantity: item.quantity + 1,
        });
    };

    const giam = () => {
        if ((item.quantity = 1 || item.quantity < 1)) {
            setItem({
                ...item,
                quantity: 1,
            });
        } else {
            setItem({
                ...item,
                quantity: item.quantity - 1,
            });
        }
    };

    const colorOnSelect = (color) => {};

    const sizeOnSelect = (size) => {};

    useEffect(() => {
        findProduct();
    }, [item]);

    return (
        <div className="sges-product-detail">
            {product && (
                <div className="container">
                    <div className="link-product-page py-3">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item">
                                    <Link to="/">Sges</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to="/shop">Shop</Link>
                                </li>
                                <li
                                    className="breadcrumb-item active"
                                    aria-current="page"
                                    style={{ color: "#1e96e6" }}
                                >
                                    {product.name}
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="d-flex justify-content-center align-items-center flex-column">
                        <div className="container p-2 product-detail-content">
                            <div className="card">
                                <div className="row m-0">
                                    <div className="col-6 product-image">
                                        <img
                                            src={
                                                product.image
                                                    ? "http://localhost:8080/file/read/" +
                                                      product.image
                                                    : ""
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div className="col-6 product-info">
                                        <div className="info-top p-2">
                                            <div className="info-name p-2">
                                                <span>{product.name}</span>
                                            </div>
                                            <div className="info-sold text-start p-1">
                                                <span>
                                                    <b>{product.sold}</b> Đã bán
                                                </span>
                                            </div>
                                            <div className="info-price p-3 d-flex align-items-center justify-content-start">
                                                <span className="price-price">
                                                    {product.price.toLocaleString("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    })}
                                                </span>
                                                <span className="price-sale mx-3">
                                                    {product.sale.toLocaleString("vi-VN", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    })}
                                                </span>
                                                <span className="discount px-1">
                                                    -
                                                    {Math.round(
                                                        (100 / product.price) * product.sale
                                                    )}
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                        <div className="info-bot">
                                            <div className="info-detail p-3 d-flex flex-column">
                                                <div className="info-color py-2 d-flex align-items-center">
                                                    <div className="title">Màu sắc</div>
                                                    <div className="content">
                                                        {colors
                                                            ? colors.map((value, index) => {
                                                                  return (
                                                                      <div
                                                                          className="btn"
                                                                          key={index}
                                                                      >
                                                                          {value}
                                                                      </div>
                                                                  );
                                                              })
                                                            : null}
                                                    </div>
                                                </div>
                                                <div className="info-size py-2 d-flex align-items-center">
                                                    <div className="title">Size</div>
                                                    <div className="content">
                                                        {sizes
                                                            ? sizes.map((value, index) => {
                                                                  return (
                                                                      <div
                                                                          className="btn"
                                                                          key={index}
                                                                      >
                                                                          {value}
                                                                      </div>
                                                                  );
                                                              })
                                                            : null}
                                                    </div>
                                                </div>
                                                <div className="info-quantity py-2 row">
                                                    <div className="title col-2">Số lượng</div>
                                                    <div className="col">
                                                        <div className="row m-0">
                                                            <div className="content col-4 p-0">
                                                                <div className="btn" onClick={giam}>
                                                                    <AiOutlineMinus />
                                                                </div>
                                                                <input
                                                                    className="col-4"
                                                                    type="text"
                                                                    name="quantity"
                                                                    value={item.quantity}
                                                                    onChange={onChange}
                                                                />
                                                                <div className="btn" onClick={tang}>
                                                                    <AiOutlinePlus />
                                                                </div>
                                                            </div>
                                                            <div className="col-auto px-3 d-flex justify-content-start align-items-center">
                                                                <span
                                                                    style={{
                                                                        backgroundColor: "#fff",
                                                                        color: "#757575",
                                                                    }}
                                                                >
                                                                    {quantity} sản phẩm sẵn có
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="purcharse p-3">
                                                <div className="row">
                                                    <div className="btn btn-add">
                                                        Thêm vào giỏ hàng
                                                    </div>
                                                    <div className="btn btn-buy">Mua ngay</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container p-2 product-detail-content mt-3">
                            <div className="card">
                                <div className="row m-0">
                                    <span className="p-3">
                                        <h3>Mô tả sản phẩm</h3>
                                    </span>
                                </div>
                                <div className="row m-0">
                                    <div className="discription-content p-3">
                                        <span className="prprprprp">{product.description}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
