import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { green } from "@material-ui/core/colors";
import { update } from "./../../../actions/categoryActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryService from "../../../services/staffservice/CategoryService";

const CategoryItem = (props) => {
    const data = useSelector((state) => state.category.categories);

    const [currentCate, setCurrentCate] = useState({
        id: null,
        name: null,
        status: 0,
    });

    const changeData = async (event) => {
        const dataChange = event.target;
        await setCurrentCate({
            ...currentCate,
            [dataChange.name]: dataChange.value,
        });
    };

    const cateSelect = (value) => {
        setCurrentCate({
            id: value.id,
            name: value.name,
            status: value.status,
        });
    };

    const upd = () => {
        CategoryService.update(currentCate)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            })
            .catch((error) => console.log("error", error));
    };

    const updateCategory = async () => {
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

    useEffect(() => {}, [currentCate, data]);

    return (
        <>
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
                                <td>
                                    <Link
                                        to="#"
                                        onClick={() => cateSelect(value)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    >
                                        <div className="btn">{value.id}</div>
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        to="#"
                                        onClick={() => cateSelect(value)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    >
                                        <div className="btn">{value.name}</div>
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        to="#"
                                        onClick={() => cateSelect(value)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
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
            <div
                className="modal fade pt-5"
                id="exampleModal"
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
                                <div className="btn btn-secondary" data-bs-dismiss="modal">
                                    Hủy
                                </div>
                            </Link>
                            <Link to="#" onClick={updateCategory}>
                                <div
                                    className="btn"
                                    style={{ backgroundColor: "#068cc1", color: "#fff" }}
                                >
                                    Lưu thay đổi
                                </div>
                            </Link>
                        </div>
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
                    </div>
                </div>
            </div>
        </>
    );
};
export default CategoryItem;
