import React from "react";
import { Link } from "react-router-dom";
import "../../../css/product/product.scss";

const ProductItem = ({ product }) => {
    return (
        <>
            {product.content.map((value, index) => {
                return (
                    <div className="py-3 product-new-item" key={index} style={{ width: "20%" }}>
                        <div className="card">
                            <Link to={"/product/" + value.id}>
                                <div className="p-img">
                                    <img
                                        src={"http://localhost:8080/file/read/" + value.image}
                                        className="card-img-top"
                                        alt={value.name}
                                    />
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
                            </Link>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ProductItem;
