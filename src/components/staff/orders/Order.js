import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../../css/staff/order.scss";
import OrderService from "../../../services/staffservice/OrderService";
import ItemOrder from "./ItemOrder";
import emptyBill from "../../../img/empty-bill.svg";

export const trangThaiOrder = [
    {
        id: 9,
        title: "Tất cả",
    },
    {
        id: 0,
        title: "Chờ xác nhận",
    },
    {
        id: 1,
        title: "Chờ lấy hàng",
    },
    {
        id: 2,
        title: "Đang giao hàng",
    },
    {
        id: 3,
        title: "Đã nhận hàng",
    },
    {
        id: 4,
        title: "Đã hủy",
    },
];

const Order = () => {
    const auth = useSelector((state) => state.auth);

    const [page, setPage] = useState(null);

    const [dataFind, setDataFind] = useState({
        status: 9,
        payment: "",
        name: "",
        from: "",
        to: "",
        number: 0,
        size: 20,
        direction: 1,
    });

    const getAllOrder = () => {
        var { status, payment, name, from, to, number, size, direction } = dataFind;
        auth !== null &&
            OrderService.getAll(
                status === 9 || status === null ? "" : status,
                payment === undefined || payment === null ? "" : payment,
                name === undefined || name === null ? "" : name,
                from === undefined || from === null ? "" : from,
                to === undefined || to === null ? "" : to,
                number === undefined || number === null ? "" : number,
                size === undefined || size === null ? "" : size,
                direction === undefined || direction === null ? "" : direction
            )
                .then((response) => response.text())
                .then((result) => {
                    var rs = JSON.parse(result);
                    console.log(rs);
                    setPage(rs);
                })
                .catch((err) => console.log(err));
    };

    const capNhat = () => {
        getAllOrder();
    };

    const prev = () => {
        return page.first != true
            ? setDataFind({
                  ...dataFind,
                  number: dataFind.number - 1,
              })
            : null;
    };

    const select = (n) => {
        return Number(n) >= 0 && Number(n) <= page.totalPages
            ? setDataFind({
                  ...dataFind,
                  number: n,
              })
            : null;
    };

    const next = () => {
        return !page.last
            ? setDataFind({
                  ...dataFind,
                  number: dataFind.number + 1,
              })
            : null;
    };

    useEffect(() => {
        getAllOrder();
    }, [auth, dataFind]);

    return (
        <div className="sges-order" style={{ minHeight: "100vh" }}>
            <div className="container-fluid m-0 p-0">
                <div className="order-title">
                    <div className="d-flex p-3 justify-center-center">
                        <div className="text-center">
                            <h4>
                                <b>QUẢN LÝ ĐƠN ĐẶT HÀNG</b>
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="d-flex sges-order-content">
                    <div className="order-filter col-2 px-3 order-nav">
                        <div className="filter-item status-order py-2 pb-4 mb-3">
                            <div className="p-2 px-3">
                                <h6>
                                    <b>Trạng thái đơn hàng</b>
                                </h6>
                            </div>
                            <div>
                                {trangThaiOrder.map((value, index) => {
                                    return (
                                        <div
                                            className="status-item"
                                            key={index}
                                            style={{
                                                backgroundColor:
                                                    dataFind.status === value.id
                                                        ? "#7acaff"
                                                        : "#fff",
                                                color: "#fff",
                                                borderBottom: "1px solid #dee2e6",
                                            }}
                                            onClick={() =>
                                                setDataFind({
                                                    ...dataFind,
                                                    status: value.id,
                                                    number: 0,
                                                })
                                            }
                                        >
                                            <Link to="#" className="d-flex">
                                                <div
                                                    className="btn text-start px-4 p-3 h-100 w-100"
                                                    style={{
                                                        color:
                                                            dataFind.status === value.id && "#fff",
                                                    }}
                                                >
                                                    <span>{value.title}</span>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="filter-item date-order">
                            <div className="p-3">
                                <h6>
                                    <b>Ngày đặt hàng</b>
                                </h6>
                            </div>
                            <div className="d-flex flex-column p-4 pt-0">
                                <div className="from-date d-flex flex-column mb-3">
                                    <label>Từ ngày</label>
                                    <input className="form-control" type="date" name="" id="" />
                                </div>
                                <div className="to-date d-flex flex-column mb-3">
                                    <label>Đến ngày</label>
                                    <input className="form-control" type="date" name="" id="" />
                                </div>
                                <select className="form-select" name="" id="">
                                    <option value="" hidden>
                                        Sắp xếp
                                    </option>
                                    <option value="">Mới nhất</option>
                                    <option value="">Cũ nhất</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="order-main col-10">
                        <div className="nav-filter d-flex justify-content-between p-3 mb-3 filter-item">
                            <div className="filter-l d-flex">
                                <div className="d-flex filter-search">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập tên khách hàng"
                                            style={{
                                                width: "300px",
                                            }}
                                        />
                                        <div className="input-group-append">
                                            <Link to="#">
                                                <div
                                                    className="btn border"
                                                    style={{ borderRadius: "0", zIndex: "0" }}
                                                >
                                                    Tìm kiếm
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex filter-control align-items-center mx-4">
                                    <span>Trạng thái thanh toán</span>
                                    <Link
                                        to="#"
                                        onClick={() => {
                                            setDataFind({
                                                ...dataFind,
                                                payment: dataFind.payment === 1 ? "" : 1,
                                            });
                                        }}
                                    >
                                        <div
                                            className="btn mx-2"
                                            style={{
                                                backgroundColor:
                                                    dataFind.payment === 1 ? "#7acaff" : "#fff",
                                                color: dataFind.payment === 1 && "#fff",
                                                border:
                                                    dataFind.payment === 1
                                                        ? "0"
                                                        : "1px solid #dee2e6",
                                            }}
                                        >
                                            <span>Đã thanh toán</span>
                                        </div>
                                    </Link>
                                    <Link
                                        to="#"
                                        onClick={() => {
                                            setDataFind({
                                                ...dataFind,
                                                payment: dataFind.payment === 0 ? "" : 0,
                                            });
                                        }}
                                    >
                                        <div
                                            className="btn border mx-2"
                                            style={{
                                                backgroundColor:
                                                    dataFind.payment === 0 ? "#7acaff" : "#fff",
                                                color: dataFind.payment === 0 && "#fff",
                                                border:
                                                    dataFind.payment === 0
                                                        ? "0"
                                                        : "1px solid #dee2e6",
                                            }}
                                        >
                                            <span>Chưa thanh toán</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="filter-r">
                                <div className="xac-nhan">
                                    {/* {(dataFind.status === 0 || dataFind.status === 1) && (
                                        <Link to="#" className="px-3">
                                            <div className="btn border">
                                                <span>Hủy tất cả đơn hàng</span>
                                            </div>
                                        </Link>
                                    )}
                                    <Link to="#">
                                        <div className="btn border">
                                            <span>
                                                {dataFind.status === 9 || dataFind.status === 0
                                                    ? "Xác nhận tất cả & đặt ship"
                                                    : dataFind.status === 1
                                                    ? "Giao tất cả"
                                                    : ""}
                                            </span>
                                        </div>
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                        <div className="filter-item order-item-content p-3">
                            <table className="table table-hover table-borderless">
                                <thead className="border-bottom">
                                    <tr style={{ borderBottom: "2px solid #000" }}>
                                        <th className="col text-center">#</th>
                                        <th className="col">Khách hàng</th>
                                        <th className="col">Số điện thoại</th>
                                        {/* <th className="col">Địa chỉ giao hàng</th> */}
                                        <th className="col">Ngày đặt hàng</th>
                                        <th className="col">Tổng tiền</th>
                                        <th className="col text-center">Thanh toán</th>
                                        <th className="col text-center">
                                            <span>Trạng thái</span>
                                        </th>
                                    </tr>
                                </thead>
                                {page !== null && page.content && page.content.length ? (
                                    page.content.map((value, index) => {
                                        return (
                                            <ItemOrder
                                                itemOrder={value}
                                                capNhat={capNhat}
                                                key={index}
                                            />
                                        );
                                    })
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan="7" className="p-0">
                                                <div
                                                    className="d-flex flex-column justify-content-center align-items-center"
                                                    style={{
                                                        height: "50vh",
                                                        backgroundColor: "#fff",
                                                    }}
                                                >
                                                    <img src={emptyBill} alt="" />

                                                    <span style={{ fontSize: "24px" }}>
                                                        Chưa có hóa đơn nào
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
