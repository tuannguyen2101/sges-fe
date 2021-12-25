import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Noti from "../../noti/Noti";
import Paginate from "../../pagination/Paginate";
import "./css/customer.css";
import CustomerItem from "./CustomerItem";

const CustomerIndex = () => {
    const customers = useSelector((state) => state.customer.customers);

    const [currentCustomer, setCurrentCustomer] = useState({ id: "", name: "" });

    const [thisPage, setThisPage] = useState({ number: "", size: "" });

    const changeData = () => {};

    const selectPage = () => {};

    const prevOnClick = () => {};

    const nextOnClick = () => {};

    const onChangePageSize = () => {};

    const createNewCustomer = () => {};

    return (
        <div className="admin-customer pb-5">
            <div className="container col-10">
                <div className="py-5">
                    <div className="row g-4 align-items-center">
                        <div className="col">
                            <nav className="mb-2" aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/staff">Admin</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Customers
                                    </li>
                                </ol>
                            </nav>
                            <h3 className="m-0">Khách hàng</h3>
                        </div>
                        <div className="col-auto d-flex">
                            <Link to="#" data-bs-toggle="modal" data-bs-target="#modalCreate">
                                <div className="btn">
                                    <FiPlus />
                                    <span className="px-1">Thêm khách hàng mới</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card container">
                    <div className="p-4 row" />
                    <div className="dropdown-divider"></div>
                    <CustomerItem />
                    <Noti />
                    <Paginate
                        thisPageProps={thisPage}
                        prevOnClickProps={prevOnClick}
                        nextOnClickProps={nextOnClick}
                        onChangePageSizeProps={onChangePageSize}
                        selectPageProps={selectPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomerIndex;
