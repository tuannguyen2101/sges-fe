import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import CategoryService from "../../../services/staffservice/CategoryService";
import { NotiError } from "../../noti/Noti";
import { findAll } from "./../../../actions/categoryActions";
import { NotiSuccess } from "./../../noti/Noti";

const CategoryItem = () => {
    const data = useSelector((state) => state.category.categories);
    const page = useSelector((state) => state.category);
    const dispatch = useDispatch();

    const [currentCate, setCurrentCate] = useState({
        id: null,
        name: null,
        status: 1,
    });

    const [currentCateSelect, setCurrentCateSelect] = useState({
        id: null,
        name: null,
        status: 1,
    });

    const [isSelect, setIsSelect] = useState(false);

    const [loop, setLoop] = useState({ loop: true });

    const changeData = async (event) => {
        const dataChange = event.target;
        await setCurrentCate({
            ...currentCate,
            [dataChange.name]: dataChange.value,
        });
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

    const update = (callback) => {
        CategoryService.update(currentCate)
            .then((response) => response.json())
            .then(async (result) => {
                console.log(result);
                if (callback) callback();
                await selectCategory(result);
            })
            .catch((error) => console.log("error", error));
    };

    const updateCategory = () => {
        if (validate() === true) {
            update(() => {
                NotiSuccess("Cập nhật danh mục thành công!");
            });
        }
    };

    const deleteCate = (id, callback) => {
        console.log(id);
        CategoryService.delete(id)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.id !== null) {
                    if (callback) callback();
                }
            })
            .catch((error) => console.log("error", error));
    };

    const deleteCategory = () => {
        if (currentCateSelect.id !== null) {
            deleteCate(currentCateSelect.id, () => {
                NotiSuccess("Xóa Danh mục thành công!");
                setLoop({
                    loop: !loop,
                });
                setCurrentCate({
                    id: null,
                    name: null,
                    status: 1,
                });
                setCurrentCateSelect({
                    id: null,
                    name: null,
                    status: null,
                });
            });
        } else {
            NotiError("Danh mục không tồn tại!");
        }
    };

    const selectCategory = async (value) => {
        await setCurrentCate({
            id: value.id,
            name: value.name,
            status: String(value.status),
        });
        await setCurrentCateSelect({
            id: value.id,
            name: value.name,
            status: String(value.status),
        });
        await setIsSelect(!isSelect);
    };

    const getAll = () => {
        if (page.number !== null && page.size !== null)
            CategoryService.findAll(page.number, page.size)
                .then((response) => response.json())
                .then((result) => {
                    dispatch(findAll(result));
                    console.log(result);
                })
                .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        getAll();
    }, [isSelect]);

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
                                <td style={{ width: "20%" }}>
                                    <Link
                                        to="#"
                                        onClick={() => selectCategory(value)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#popupModalCategory"
                                    >
                                        <div className="btn">{value.id}</div>
                                    </Link>
                                </td>
                                <td style={{ width: "50%" }}>
                                    <Link
                                        to="#"
                                        onClick={() => selectCategory(value)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#popupModalCategory"
                                    >
                                        <div className="btn">{value.name}</div>
                                    </Link>
                                </td>
                                <td style={{ width: "30%" }}>
                                    <Link
                                        to="#"
                                        onClick={() => selectCategory(value)}
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
            <div
                className="modal fade pt-5"
                id="popupModalCategory"
                aria-labelledby="modalUpdate"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalUpdate">
                                Chỉnh sửa danh mục
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
                                value={currentCate.status || 1}
                            >
                                <option value={1}>Hoạt động</option>
                                <option value={0}>Không hoạt động</option>
                            </select>
                        </div>
                        <div className="modal-footer mt-3">
                            {/* <div className="col-6 m-0 d-flex">
                                <Link className="mx-1" to="#" onClick={deleteCategory}>
                                    <div className="btn btn-danger">Xóa</div>
                                </Link>
                            </div> */}
                            <div className="col-6 m-0">
                                <Link
                                    to="#"
                                    className="mx-1 "
                                    onClick={updateCategory}
                                    style={{
                                        float: "right",
                                        display:
                                            currentCate.name !== currentCateSelect.name ||
                                            currentCate.status !== currentCateSelect.status
                                                ? "block"
                                                : "none",
                                    }}
                                >
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
                                <Link to="#" className="mx-1" style={{ float: "right" }}>
                                    <div className="btn btn-secondary" data-bs-dismiss="modal">
                                        Hủy
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default CategoryItem;
