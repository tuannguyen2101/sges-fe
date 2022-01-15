import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { trangThaiOrder } from "./Order";
import { BsFillCheckCircleFill } from "react-icons/bs";
import ItemOrderDetail from "./ItemOrderDetail";
import MyOrdersService from "../../../services/guestservice/MyOrdersService";
import { NotiInfo, NotiSuccess } from "../../noti/Noti";
import OrderService from "../../../services/staffservice/OrderService";

const ItemOrder = ({ itemOrder, capNhat }) => {
    const [orderDetail, setOrderDetail] = useState({
        id: 0,
        on: false,
    });

    const [listDetail, setListDetail] = useState([]);

    const getAlDetail = () => {
        itemOrder !== null &&
            itemOrder !== undefined &&
            itemOrder.id !== 0 &&
            MyOrdersService.findAllDetailByOderId(itemOrder.id)
                .then((response) => response.text())
                .then((result) => {
                    var rs = JSON.parse(result);
                    console.log(rs);
                    setListDetail(rs);
                })
                .catch((err) => console.log(err));
    };

    const capNhatDonHang = (status) => {
        if (itemOrder !== null) {
            let donCapNhat = {
                id: itemOrder.id,
                accountId: itemOrder.account.id,
                createDate: itemOrder.createDate,
                address: itemOrder.address,
                name: itemOrder.name,
                email: itemOrder.email,
                phone: itemOrder.phone,
                transportFee: itemOrder.transportFee,
                tienHang: itemOrder.tienHang,
                tongThanhToan: itemOrder.tongThanhToan,
                status: status,
                payment: itemOrder.payment,
            };
            OrderService.capNhatDonHang(donCapNhat)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    capNhat();
                    getAlDetail();
                    if (donCapNhat.status === 4) {
                        NotiInfo("Đơn hàng của bạn đã được hủy!", "top-center");
                    } else if (donCapNhat.status === 1) {
                        NotiSuccess("Đã xác nhận đơn hàng!", "top-center");
                    } else if (donCapNhat.status === 2) {
                        NotiSuccess("Đơn hàng đang được giao!", "top-center");
                    }
                })
                .catch((error) => console.log("error", error));
        }
    };

    const capNhatConfirm = (status) => {
        if (status === 4 && window.confirm("Bạn có chắc muốn hủy đơn hàng?") == true) {
            capNhatDonHang(4);
        } else {
            capNhatDonHang(status);
        }
    };

    useEffect(() => {
        getAlDetail();
    }, [itemOrder]);

    return (
        <tbody
            className={
                orderDetail.id === itemOrder.id && orderDetail.on ? "border" : "border-bottom"
            }
            style={{
                backgroundColor:
                    orderDetail.id === itemOrder.id && orderDetail.on ? "#00000013" : "#fff",
            }}
        >
            <tr
                className="tr-order"
                role="button"
                onClick={() =>
                    setOrderDetail({
                        id: itemOrder.id === orderDetail.id ? 0 : itemOrder.id,
                        on: itemOrder.id === orderDetail.id ? !false : true,
                    })
                }
            >
                <td className="text-center">{itemOrder.id}</td>
                <td>{itemOrder.name}</td>
                <td>{itemOrder.phone}</td>
                <td>{itemOrder.createDate}</td>
                <th>
                    {itemOrder.tongThanhToan.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}
                </th>
                <td className="text-center">
                    <span className={`pay${itemOrder.payment}`}>
                        {itemOrder.payment === 1 ? (
                            <BsFillCheckCircleFill size="16px" />
                        ) : (
                            "Chưa thanh toán"
                        )}
                    </span>
                </td>
                <td className="text-center">
                    <span
                        className={`status-order${itemOrder.status}`}
                        style={{ borderRadius: "25px", padding: "3px 15px" }}
                    >
                        {trangThaiOrder.map((val) => {
                            return val.id === itemOrder.status && val.title;
                        })}
                    </span>
                </td>
            </tr>
            {itemOrder.id === orderDetail.id && orderDetail.on && (
                <tr>
                    <td colSpan="7" className="p-0 staff-order-detail ">
                        <div className={`detail-order-${itemOrder.status}`}>
                            <div className="d-flex flex-column p-3">
                                <div className="address d-flex">
                                    <h5>Địa chỉ giao hàng: &ensp;</h5>
                                    <h5>{itemOrder.address}</h5>
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="item-detail">
                                        {listDetail !== undefined &&
                                            listDetail !== null &&
                                            listDetail.length > 0 &&
                                            listDetail.map((value, index) => {
                                                return (
                                                    console.log(value),
                                                    (<ItemOrderDetail item={value} key={index} />)
                                                );
                                            })}
                                    </div>
                                </div>
                                <div
                                    className="d-flex justify-content-between p-2"
                                    style={{
                                        borderTop: "1px solid #fff",
                                        backgroundColor: itemOrder.payment && "#befccc",
                                    }}
                                >
                                    <div className="control col-9 p-0 d-flex align-items-center flex-column justify-content-start">
                                        <span className="w-100 p-2">
                                            <b>Thao tác</b>
                                        </span>
                                        <div className="control-btn w-100">
                                            {itemOrder.status === 0 && (
                                                <Link to="#">
                                                    <div
                                                        className="btn me-3"
                                                        style={{
                                                            backgroundColor: "#7acaff",
                                                            color: "#fff",
                                                        }}
                                                        onClick={() => capNhatConfirm(1)}
                                                    >
                                                        <span>Xác nhận và đặt giao hàng</span>
                                                    </div>
                                                </Link>
                                            )}
                                            {itemOrder.status === 1 && (
                                                <Link to="#">
                                                    <div
                                                        className="btn me-3"
                                                        style={{
                                                            backgroundColor: "#ffa061",
                                                            color: "#fff",
                                                        }}
                                                        onClick={() => capNhatConfirm(2)}
                                                    >
                                                        <span>Đang giao hàng</span>
                                                    </div>
                                                </Link>
                                            )}
                                            {itemOrder.status === 0 && itemOrder.payment === 0 && (
                                                <Link to="#">
                                                    <div
                                                        className="btn me-3"
                                                        style={{
                                                            backgroundColor: "#ff3f3f",
                                                            color: "#fff",
                                                        }}
                                                        onClick={() => capNhatConfirm(4)}
                                                    >
                                                        <span>Hủy đơn hàng</span>
                                                    </div>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                    <div className="total col-3 p-0">
                                        <div className="d-flex p-1 justify-content-between align-items-center">
                                            <span>Phí vận chuyển</span>
                                            <span>
                                                <b>
                                                    {itemOrder.transportFee &&
                                                        !isNaN(itemOrder.transportFee) &&
                                                        itemOrder.transportFee.toLocaleString(
                                                            "vi-VN",
                                                            {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }
                                                        )}
                                                </b>
                                            </span>
                                        </div>
                                        <div className="d-flex p-1 justify-content-between align-items-center">
                                            <span>Tổng tiền hàng</span>
                                            <span>
                                                <b>
                                                    {itemOrder.tienHang &&
                                                        !isNaN(itemOrder.tienHang) &&
                                                        itemOrder.tienHang.toLocaleString("vi-VN", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        })}
                                                </b>
                                            </span>
                                        </div>
                                        <div className="d-flex p-1 justify-content-between align-items-center">
                                            <span>Tổng thanh toán</span>
                                            <span>
                                                <b>
                                                    {itemOrder.tongThanhToan &&
                                                        !isNaN(itemOrder.tongThanhToan) &&
                                                        itemOrder.tongThanhToan.toLocaleString(
                                                            "vi-VN",
                                                            {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }
                                                        )}
                                                </b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </tbody>
    );
};

export default ItemOrder;
