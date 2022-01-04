import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "../../css/product/productDetail.scss";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import productService from "../../services/guestservice/productService";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions";
import Noti, { NotiError, NotiSuccess } from "../noti/Noti";

const ProductDetail = () => {
    const products = useSelector((state) => state.product);
    const dispatch = useDispatch();
    let { id } = useParams();

    const [item, setItem] = useState({
        color: "",
        size: "",
        quantity: 1,
    });

    const [productDetail, setProductDetail] = useState([]);

    const [productDetailInit, setProductDetailInit] = useState([]);

    const [product, setProduct] = useState({
        id: "",
        name: "",
        image: "",
        price: "",
        createDate: "",
        status: "",
        categoryId: "",
        description: "",
        sale: "",
        sold: "",
    });

    const [sizes, setSizes] = useState([]);

    const [colors, setColors] = useState([]);

    const [quantity, setQuantity] = useState();

    const [isFilter, setIsFilter] = useState({
        color: "",
        colorFil: false,
        size: "",
        sizeFil: false,
    });

    const findProduct = () => {
        productService
            .findById(id)
            .then((response) => response.json())
            .then((result) => {
                // console.log(result);
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
                setProductDetail(result.productDetails);
                setProductDetailInit(result.productDetails);
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
        } else if (event.target.value > quantity) {
            setItem({
                ...item,
                quantity: quantity,
            });
        } else {
            setItem({
                ...item,
                [event.target.name]: event.target.value,
            });
        }
    };

    const tang = () => {
        if (item.quantity >= quantity) {
            setItem({ ...item, quantity: quantity });
        } else {
            setItem({
                ...item,
                quantity: item.quantity + 1,
            });
        }
    };

    const giam = () => {
        if (item.quantity <= 1) {
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

    const colorOnSelect = (event) => {
        setQuantity(tinhQty(productDetail));
        return event.target.textContent !== isFilter.color
            ? (setIsFilter({
                  ...isFilter,
                  colorFil: true,
                  color: event.target.textContent,
              }),
              setProductDetail(
                  ...new Array(
                      productDetailInit
                          .filter((value) => {
                              return isFilter.size === ""
                                  ? value.color === event.target.textContent
                                  : value.color === event.target.textContent &&
                                        value.size === isFilter.size;
                          })
                          .map((value) => {
                              return value;
                          })
                  )
              ),
              setQuantity(
                  tinhQty(
                      productDetailInit
                          .filter((value) => {
                              return isFilter.size === ""
                                  ? value.color === event.target.textContent
                                  : value.color === event.target.textContent &&
                                        value.size === isFilter.size;
                          })
                          .map((value) => {
                              return value;
                          })
                  )
              ))
            : (setIsFilter({
                  ...isFilter,
                  colorFil: false,
                  color: "",
              }),
              setProductDetail(
                  ...new Array(
                      productDetailInit
                          .filter((value) => {
                              return isFilter.size === "" ? value : value.size === isFilter.size;
                          })
                          .map((value) => {
                              return value;
                          })
                  )
              ),
              setQuantity(
                  tinhQty(
                      productDetailInit
                          .filter((value) => {
                              return isFilter.size === "" ? value : value.size === isFilter.size;
                          })
                          .map((value) => {
                              return value;
                          })
                  )
              ));
    };

    const sizeOnSelect = (event) => {
        return event.target.textContent !== isFilter.size
            ? (setIsFilter({
                  ...isFilter,
                  sizeFil: true,
                  size: event.target.textContent,
              }),
              setProductDetail(
                  ...new Array(
                      productDetailInit
                          .filter((value) => {
                              return isFilter.color === ""
                                  ? value.size == event.target.textContent
                                  : value.size == event.target.textContent &&
                                        value.color == isFilter.color;
                          })
                          .map((value) => {
                              return value;
                          })
                  )
              ),
              setQuantity(
                  tinhQty(
                      productDetailInit
                          .filter((value) => {
                              return isFilter.color === ""
                                  ? value.size == event.target.textContent
                                  : value.size == event.target.textContent &&
                                        value.color == isFilter.color;
                          })
                          .map((value) => {
                              return value;
                          })
                  )
              ))
            : (setIsFilter({
                  ...isFilter,
                  sizeFil: false,
                  size: "",
              }),
              setProductDetail(
                  ...new Array(
                      productDetailInit
                          .filter((value) => {
                              return isFilter.color === "" ? value : value.color == isFilter.color;
                          })
                          .map((value) => {
                              return value;
                          })
                  )
              ),
              setQuantity(
                  tinhQty(
                      productDetailInit
                          .filter((value) => {
                              return isFilter.color === "" ? value : value.color == isFilter.color;
                          })
                          .map((value) => {
                              return value;
                          })
                  )
              ));
    };

    const addItem = () => {
        return product &&
            isFilter.color &&
            isFilter.size &&
            item.quantity > 0 &&
            item.quantity <= productDetail[0].qty
            ? (dispatch(
                  addToCart({
                      prod: product,
                      size: isFilter.size,
                      color: isFilter.color,
                      qty: item.quantity,
                  })
              ),
              NotiSuccess("Đã thêm sản phẩm vào giỏ hàng!"),
              setIsFilter({}),
              setItem({ quantity: 1 }),
              setProductDetail(productDetailInit),
              setQuantity(tinhQty(productDetailInit)))
            : NotiError("Vui lòng chọn đầy đủ thông tin sản phẩm!");
    };

    useEffect(() => {
        findProduct();
    }, []);

    return (
        <div className="sges-product-detail">
            <Noti />
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
                                                {productDetailInit && productDetailInit.length ? (
                                                    <div className="info-color py-2 d-flex align-items-center">
                                                        <div className="title">Màu sắc</div>
                                                        <div className="content">
                                                            {colors.map((value, index) => {
                                                                return (
                                                                    <div
                                                                        className={
                                                                            productDetail
                                                                                .map((val) => {
                                                                                    return val.color;
                                                                                })
                                                                                .includes(value)
                                                                                ? "btn"
                                                                                : "btn disabled"
                                                                        }
                                                                        key={index}
                                                                        onClick={colorOnSelect}
                                                                        style={{
                                                                            border:
                                                                                isFilter.color ===
                                                                                    value &&
                                                                                isFilter.colorFil ===
                                                                                    true
                                                                                    ? "1px solid #1e96e6"
                                                                                    : "",
                                                                            color:
                                                                                isFilter.color ===
                                                                                    value &&
                                                                                isFilter.colorFil ===
                                                                                    true
                                                                                    ? "#1e96e6"
                                                                                    : "",
                                                                        }}
                                                                    >
                                                                        {value}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                ) : null}
                                                {sizes && sizes.length ? (
                                                    <div className="info-size py-2 d-flex align-items-center">
                                                        <div className="title">Size</div>
                                                        <div className="content">
                                                            {sizes.map((value, index) => {
                                                                return (
                                                                    <div
                                                                        className={
                                                                            productDetail
                                                                                .map((val) => {
                                                                                    return val.size;
                                                                                })
                                                                                .includes(value)
                                                                                ? "btn"
                                                                                : "btn disabled"
                                                                        }
                                                                        key={index}
                                                                        onClick={sizeOnSelect}
                                                                        style={{
                                                                            border:
                                                                                isFilter.size ===
                                                                                    value &&
                                                                                isFilter.sizeFil ===
                                                                                    true
                                                                                    ? "1px solid #1e96e6"
                                                                                    : "",
                                                                            color:
                                                                                isFilter.size ===
                                                                                    value &&
                                                                                isFilter.sizeFil ===
                                                                                    true
                                                                                    ? "#1e96e6"
                                                                                    : "",
                                                                        }}
                                                                    >
                                                                        {value}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                ) : null}
                                                {productDetailInit && productDetailInit.length ? (
                                                    <div className="info-quantity py-2 row">
                                                        <div className="title col-2">Số lượng</div>
                                                        <div className="col">
                                                            <div className="row m-0">
                                                                <div className="content col-4 p-0">
                                                                    <div
                                                                        className="btn"
                                                                        onClick={giam}
                                                                    >
                                                                        <AiOutlineMinus />
                                                                    </div>
                                                                    <input
                                                                        className="col-4"
                                                                        type="text"
                                                                        name="quantity"
                                                                        value={item.quantity}
                                                                        onChange={onChange}
                                                                    />
                                                                    <div
                                                                        className="btn"
                                                                        onClick={tang}
                                                                    >
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
                                                ) : null}
                                            </div>
                                            <div className="purcharse p-3">
                                                <div className="row">
                                                    <div
                                                        className="btn btn-add d-flex justify-content-center align-items-center"
                                                        onClick={addItem}
                                                    >
                                                        Thêm vào giỏ hàng
                                                    </div>
                                                    <div className="btn btn-buy d-flex justify-content-center align-items-center">
                                                        Mua ngay
                                                    </div>
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
