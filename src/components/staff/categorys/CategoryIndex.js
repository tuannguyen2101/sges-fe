import React, { Component, useEffect, useState } from "react";
import CategoryDetail from "./CategoryDetail";
import { Link } from "react-router-dom";
import Paginate from "../../pagination/Paginate";
import "./css/category.css";
import CategoryItem from "./CategoryItem";
import CategoryService from "../../../services/staffservice/CategoryService";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_CATEGORY } from "./../../../constants/constants";
import { findAll } from "./../../../actions/categoryActions";
import { result } from "lodash";
import { FiPlus } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryIndex = () => {
    const data = useSelector((state) => state.category.categories);
    const dispatch = useDispatch();

    const [currentCate, setCurrentCate] = useState({
        id: null,
        name: null,
        status: 1,
    });

    const getAll = () => {
        CategoryService.findAll()
            .then((response) => response.json())
            .then((result) => {
                dispatch(findAll(result));
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        getAll();
    }, [currentCate]);

    const upd = () => {
        CategoryService.create(currentCate)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            })
            .catch((error) => console.log("error", error));
    };

    const createNewCategory = async () => {
        if (validate() === true) {
            await upd();
            toast.success("Thêm danh mục thành công!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const validate = () => {
        const { name, status } = currentCate;
        let n = String.toString(name);
        if (name === null || name === "") {
            toast.error("Tên danh mục không được để trống", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return false;
        }
        if (name.length <= 3 || name.length >= 45) {
            toast.error("Tên danh mục phải lớn hơn 2 và nhỏ hơn 45 ký tự", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return false;
        }
        if (status < 0 && status > 1) {
            toast.error("Trạng thái danh mục không hợp lệ", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return false;
        }
        return true;
    };

    const changeData = async (event) => {
        const dataChange = event.target;
        await setCurrentCate({
            ...currentCate,
            [dataChange.name]: dataChange.value,
        });
    };

    return (
        <div className="admin-category pb-5">
            <div className="container col-7">
                <div className="py-5">
                    <div className="row g-4 align-items-center">
                        <div className="col">
                            <nav className="mb-2" aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/staff">Admin</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Categories
                                    </li>
                                </ol>
                            </nav>
                            <h3 className="m-0">Categories</h3>
                        </div>
                        <div className="col-auto d-flex">
                            <Link to="#" data-bs-toggle="modal" data-bs-target="#exampleModalNew">
                                <div className="btn">
                                    <FiPlus />
                                    <span className="px-1">Thêm Danh mục mới</span>
                                </div>
                            </Link>
                        </div>
                        <div
                            className="modal fade pt-5"
                            id="exampleModalNew"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">
                                            Quản lý danh mục
                                        </h5>
                                        <Link to="#">
                                            <div
                                                className="btn btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            ></div>
                                        </Link>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <div className="form-label" htmlFor="name">
                                                Tên danh mục
                                            </div>
                                        </div>
                                        <input
                                            className="form-control"
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={currentCate.name || ""}
                                            onChange={changeData}
                                        />
                                        <div className="my-3">
                                            <div className="form-label" htmlFor="name">
                                                Trạng thái
                                            </div>
                                        </div>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            onChange={changeData}
                                            name="status"
                                            value={currentCate.status}
                                        >
                                            <option value={1}>Hoạt động</option>
                                            <option value={0}>Không hoạt động</option>
                                        </select>
                                    </div>
                                    <div className="modal-footer">
                                        <Link to="#">
                                            <div
                                                className="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                Hủy
                                            </div>
                                        </Link>
                                        <Link to="#" onClick={createNewCategory}>
                                            <div
                                                className="btn"
                                                style={{
                                                    backgroundColor: "#068cc1",
                                                    color: "#fff",
                                                }}
                                            >
                                                Lưu thay đổi
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card container">
                    <div className="p-4 row" />
                    <div className="dropdown-divider"></div>
                    <CategoryItem />
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    {data ? <Paginate /> : <Paginate />}
                </div>
            </div>
        </div>
    );
};

export default CategoryIndex;
