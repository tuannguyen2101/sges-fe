import React from "react";
import { Link } from "react-router-dom";
import "../../../css/product/product.scss";
import newIcon from "../../../img/new-corner-label.png";

const ProductItem = ({ product, width, minHeight }) => {
    return (
        <>
            {product &&
                product.map((value, index) => {
                    return (
                        <div
                            className="py-3 product-new-item"
                            key={index}
                            style={{ width: width, minWidth: "20%" }}
                        >
                            <Link to={"/product/" + value.id}>
                                <div className="card">
                                    <div className="p-img">
                                        <img
                                            src={"http://localhost:8080/file/read/" + value.image}
                                            className="card-img-top"
                                            alt={value.name}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src =
                                                    "http://localhost:8080/file/read/no-image-800x600.png";
                                            }}
                                            style={{ minHeight: minHeight }}
                                        />
                                        {value.status == 2 ? (
                                            <img
                                                src={newIcon}
                                                className="new-icon"
                                                alt=""
                                                height="58px"
                                            />
                                        ) : null}
                                    </div>
                                    <div className="card-body d-grid">
                                        <p className="card-text p-title" style={{ width: "100%" }}>
                                            {value.name}
                                        </p>
                                        <p className="card-text p-price">
                                            <span className="price-price">
                                                {value.price.toLocaleString("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })}
                                            </span>
                                            <span className="price-sale">
                                                {value.sale.toLocaleString("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
        </>
    );
};

export default ProductItem;
