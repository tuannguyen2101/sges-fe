import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyOrdersService from "../../../../services/guestservice/MyOrdersService";
import { NotiInfo, NotiSuccess } from "../../../noti/Noti";
import ItemDetail from "./ItemDetail";
import { FcCheckmark } from "react-icons/fc";
import { AiOutlineWarning } from "react-icons/ai";

const PurchaseItem = ({ order, upd }) => {
    const [stsOrder, setStsOrder] = useState([
        "Chờ xác nhận",
        "Chờ lấy hàng",
        "Đang giao",
        "Đã nhận hàng",
        "Đơn hủy",
    ]);

    const [orderDetail, setOrderDetail] = useState([]);

    const findAllByOrderId = () => {
        order !== null &&
            order !== undefined &&
            order.id !== 0 &&
            MyOrdersService.findAllDetailByOderId(order.id)
                .then((response) => response.text())
                .then((result) => {
                    var rs = JSON.parse(result);
                    setOrderDetail(rs);
                })
                .catch((err) => console.log(err));
    };

    const capNhat = (status, payment) => {
        if (order !== null) {
            let donCapNhat = {
                id: order.id,
                accountId: order.account.id,
                createDate: order.createDate,
                address: order.address,
                name: order.name,
                email: order.email,
                phone: order.phone,
                transportFee: order.transportFee,
                tienHang: order.tienHang,
                tongThanhToan: order.tongThanhToan,
                status: status,
                payment: payment !== 1 ? 0 : 1,
            };
            MyOrdersService.huyDatHang(donCapNhat)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    upd();
                    findAllByOrderId();
                    if (status === 4) {
                        NotiInfo("Đơn hàng của bạn đã được hủy!");
                    } else if (status === 3) {
                        NotiSuccess("Đã nhận hàng và thanh toán!", "top-center");
                    }
                })
                .catch((error) => console.log("error", error));
        }
    };

    const capNhatDonHang = (status) => {
        if (status === 4 && window.confirm("Bạn có chắc muốn hủy đơn hàng?") == true) {
            capNhat(4);
        } else if (status === 3) {
            capNhat(3, 1);
        }
    };

    useEffect(() => {
        findAllByOrderId();
    }, [order]);

    return (
        <div className="purchase-item my-2">
            <div
                className="order-content p-4 pb-0"
                style={{
                    backgroundColor:
                        order.status === 4
                            ? "#ffabab24"
                            : order.payment === 1
                            ? "#abffb424"
                            : "#abc3ff24",
                }}
            >
                <div className="item-title border-bottom">
                    <div className="mb-2 d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-between h-100">
                            <div className="d-flex flex-column justify-content-start">
                                <span>
                                    <b>
                                        &ensp;{order.name}&ensp; - &ensp;{order.phone}
                                    </b>
                                </span>
                                <span style={{ color: "#888888" }}>&ensp;{order.address}</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center h-100">
                            {order.status <= 1 && order.payment !== 1 ? (
                                <Link
                                    to="#"
                                    style={{ height: "38px" }}
                                    onClick={() => capNhatDonHang(4)}
                                >
                                    <div className="btn px-0">
                                        <span style={{ color: "red" }}>Hủy đặt hàng</span>
                                    </div>
                                </Link>
                            ) : (
                                order.status === 2 && (
                                    <Link
                                        to="#"
                                        style={{ height: "38px" }}
                                        onClick={() => capNhatDonHang(3)}
                                    >
                                        <div className="btn px-0">
                                            <span style={{ color: "blue" }}>
                                                Đã nhận và thanh toán
                                            </span>
                                        </div>
                                    </Link>
                                )
                            )}
                            <span className="mx-2">|</span>
                            <span style={{ minHeight: "38px", lineHeight: "38px" }}>
                                {stsOrder.map((content, index) => {
                                    return order.status === index && content;
                                })}
                            </span>
                        </div>
                    </div>
                </div>
                {orderDetail !== undefined &&
                    orderDetail !== null &&
                    orderDetail.length > 0 &&
                    orderDetail.map((value, index) => {
                        return <ItemDetail item={value} key={index} />;
                    })}
            </div>
            <div
                className="p-4 item-tt d-flex justify-content-end"
                style={{
                    backgroundColor:
                        order.status === 4
                            ? "#ffabab5c"
                            : order.payment === 1
                            ? "#abffbb5c"
                            : "#abc3ff5c",
                    marginTop: "-2px",
                }}
            >
                <div className="col-8 p-0 d-flex justify-content-start flex-column justify-content-between">
                    <div className="" style={{ alignContent: "flex-end" }}>
                        <span>Ngày đặt hàng:&ensp;{order.createDate}</span>
                    </div>
                    {order.payment !== 1 ? (
                        <span className="d-flex align-items-start" style={{ color: "blue" }}>
                            Chưa thanh toán&ensp;
                        </span>
                    ) : (
                        <span style={{ color: "green" }} className="d-flex align-items-start">
                            <FcCheckmark fontSize="20px" />
                            &ensp; Đã thành toán
                        </span>
                    )}
                </div>
                <div className="col-4 p-0">
                    <div className="d-flex p-1 justify-content-between align-items-center">
                        <span>
                            <small>Phí vận chuyển</small>
                        </span>
                        <span>
                            <b>
                                {order.transportFee &&
                                    !isNaN(order.transportFee) &&
                                    order.transportFee.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                            </b>
                        </span>
                    </div>
                    <div className="d-flex p-1 justify-content-between align-items-center">
                        <span>
                            <small>Tổng tiền hàng</small>
                        </span>
                        <span>
                            <b>
                                {order.tienHang &&
                                    !isNaN(order.tienHang) &&
                                    order.tienHang.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                            </b>
                        </span>
                    </div>
                    <div className="d-flex p-1 justify-content-between align-items-center">
                        <span>
                            <small>Tổng thanh toán</small>
                        </span>
                        <span>
                            <b style={{ color: "#1e96e6", fontSize: "24px" }}>
                                {order.tongThanhToan &&
                                    !isNaN(order.tongThanhToan) &&
                                    order.tongThanhToan.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                            </b>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseItem;
