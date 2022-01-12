import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CategoryService from "../../../services/staffservice/CategoryService";
import Noti, { NotiError, NotiSuccess } from "../../noti/Noti";
import Paginate from "../../pagination/Paginate";
import { findAll } from "./../../../actions/categoryActions";
import CategoryItem from "./CategoryItem";
import "../../../css/category/category.scss";

const CategoryIndex = () => {
    const data = useSelector((state) => state.category.categories);
    const page = useSelector((state) => state.category);
    const dispatch = useDispatch();

    const [loop, setLoop] = useState({ loop: true });

    const [currentCate, setCurrentCate] = useState({
        id: null,
        name: null,
        status: 1,
    });
    const [thisPage, setThisPage] = useState({
        number: 0,
        size: 10,
    });

    const getAll = () => {
        CategoryService.findAll(thisPage.number, thisPage.size)
            .then((response) => response.json())
            .then((result) => {
                dispatch(findAll(result));
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        getAll();
    }, [loop, thisPage]);

    const create = (callback) => {
        CategoryService.create(currentCate)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (callback) callback();
            })
            .catch((error) => console.log("error", error));
    };

    const createNewCategory = () => {
        if (validate() === true) {
            create(() => {
                NotiSuccess("Thêm danh mục mới thành công!");
                setLoop({
                    loop: !loop,
                });
                setCurrentCate({
                    id: null,
                    name: null,
                    status: 1,
                });
            });
        }
    };

    const validate = () => {
        const { name, status } = currentCate;
        if (name === null || name === "") {
            NotiError("Tên danh mục không được để trống!");
            return false;
        }
        if (name.length <= 2 || name.length >= 45) {
            NotiError("Tên danh mục phải lớn hơn 2 và nhỏ hơn 45 ký tự!");
            return false;
        }
        if (status < 0 && status > 1) {
            NotiError("Trạng thái danh mục không hợp lệ!");
            return false;
        }
        return true;
    };

    const changeData = (event) => {
        const dataChange = event.target;
        setCurrentCate({
            ...currentCate,
            [dataChange.name]: dataChange.value,
        });
    };

    const prevOnClick = () => {
        if (page.first !== true) {
            setThisPage({
                ...thisPage,
                number: Number(thisPage.number) - 1,
            });
        }
    };

    const nextOnClick = () => {
        if (page.last !== true) {
            setThisPage({
                ...thisPage,
                number: Number(thisPage.number) + 1,
            });
        }
    };

    const onChangePageSize = (size) => {
        setThisPage({
            ...thisPage,
            size: Number(size),
        });
    };

    const selectPage = (number) => {
        setThisPage({
            ...thisPage,
            number: Number(number),
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
                            <Link to="#" data-bs-toggle="modal" data-bs-target="#modalCreate">
                                <div className="btn">
                                    <FiPlus />
                                    <span className="px-1">Thêm Danh mục mới</span>
                                </div>
                            </Link>
                        </div>
                        <div
                            className="modal fade pt-5"
                            id="modalCreate"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">
                                            Thêm danh mục mới
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
                                                Thêm danh mục
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

export default CategoryIndex;
