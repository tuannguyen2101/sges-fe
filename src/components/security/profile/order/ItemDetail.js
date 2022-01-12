import React, { useEffect, useState } from "react";
import MyOrdersService from "../../../../services/guestservice/MyOrdersService";

const ItemDetail = ({ item, tinhTotal }) => {
    return (
        <div className="item-content">
            <div className="py-3 d-flex justify-content-between align-center border-bottom">
                <img
                    src={"http://localhost:8080/file/read/" + item.product.image}
                    alt="anh san pham"
                    width="100px"
                    height="100px"
                />
                <div className="item-p-name px-4 p-2 d-flex flex-column justify-content-between w-100">
                    <span>{item.product.name}</span>
                    <span style={{ color: "#888888" }}>
                        {item.size} / {item.color}
                    </span>
                    <span>{"x" + item.quantity}</span>
                </div>
                <div className="item-p-price d-flex align-items-center">
                    {item.product.sale !== 0 && (
                        <span className="px-3">
                            <del style={{ color: "#888888" }}>
                                {item.product.price.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </del>
                        </span>
                    )}
                    <span>
                        <b>
                            {(item.product.sale
                                ? item.product.sale
                                : item.product.price
                            ).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </b>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;
