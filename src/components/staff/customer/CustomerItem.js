import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CustomerItem = () => {
    const data = useSelector((state) => state.customer.customers);
    const selectCustomer = (value) => {};

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th className="px-4 py-3">Id</th>
                        <th className="px-4 py-3">Tên danh mục</th>
                        <th className="px-4 py-3">Trạng thái danh mục</th>
                    </tr>
                </thead>
                <tbody>
                    {data ? (
                        data.map((value, index) => (
                            <tr key={index} className="data-item">
                                <td style={{ width: "20%" }}>
                                    <Link
                                        to="#"
                                        onClick={() => selectCustomer(value)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#popupModalCategory"
                                    >
                                        <div className="btn">{value.id}</div>
                                    </Link>
                                </td>
                                <td style={{ width: "50%" }}>
                                    <Link
                                        to="#"
                                        onClick={() => selectCustomer(value)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#popupModalCategory"
                                    >
                                        <div className="btn">{value.name}</div>
                                    </Link>
                                </td>
                                <td style={{ width: "30%" }}>
                                    <Link
                                        to="#"
                                        onClick={() => selectCustomer(value)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#popupModalCategory"
                                    >
                                        <div
                                            className="btn"
                                            style={{ color: value.status === 0 ? "red" : "green" }}
                                        >
                                            {value.status === 1 ? "Hoạt động" : "Không hoạt động"}
                                        </div>
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <></>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerItem;
