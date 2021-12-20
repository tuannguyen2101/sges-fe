import { Component } from "react";
import CategoryItem from "./CategoryItem";
import { Link } from "react-router-dom";

const CategoryTable = () => {
    return (
        <div className="admin-category">
            <div className="container">
                <div className="py-5">
                    <div className="row g-4 align-items-center">
                        <div className="col">
                            <nav className="mb-2" aria-label="breadcrumb">
                                <ol classname="breadcrumb">
                                    <li classname="breadcrumb-item">
                                        <Link to="/admin">Admin</Link>
                                    </li>
                                    <li classname="breadcrumb-item" aria-current="page">
                                        <Link to="/admin/categorieslist">Categories</Link>
                                    </li>
                                    <li classname="breadcrumb-item active" aria-current="page">
                                        Categories
                                    </li>
                                </ol>
                            </nav>
                            <h3 className="m-0">Category</h3>
                        </div>
                        <div className="col-auto d-flex">
                            <Link to="#" className="btn btn-xoa" to="/admin/category">
                                Xóa
                            </Link>
                            <Link to="#" className="btn" to="/admin/category">
                                Lưu
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        <div className="card">
                            <div className="p-3">
                                <h5>Thông tin danh mục</h5>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="code">Mã danh mục</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="code"
                                            name="code"
                                            value={""}
                                            placeholder="VD: C0123"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Tên danh mục</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={""}
                                            placeholder="VD: Street Style Pants"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="des">Mô tả</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="des"
                                            name="des"
                                            value={""}
                                            placeholder="VD: Street Style Pants"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="p-3">
                                <h3></h3>
                                <table className="table">
                                    <div classname="form-group">
                                        <label for="supcate">Parent category</label>
                                        <select classname="form-control" id="supcate">
                                            <option>Áo</option>
                                            <option>Quần</option>
                                            <option>Phụ kiện</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="created">Ngày tạo</label>
                                        <input
                                            className="form-control"
                                            type="date"
                                            id="created"
                                            name="created"
                                            value={""}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastUpdate">Ngày sửa cuối</label>
                                        <input
                                            className="form-control"
                                            type="date"
                                            id="lastUpdate"
                                            name="lastUpdate"
                                            value={""}
                                        />
                                    </div>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row p-2">
                    <div className="col"></div>
                    <div className="card">
                        <div className="tbl-sanpham py-5">
                            <h5>Sản phẩm thuộc danh mục</h5>
                            <table className="table table-striped">
                                <thead>
                                    <th style={{ width: "20%", paddingLeft: "20px" }}>Image</th>
                                    <th style={{ width: "20%", paddingLeft: "20px" }}>Code</th>
                                    <th style={{ paddingLeft: "20px" }}>Name</th>
                                    <th style={{ width: "10%", paddingLeft: "20px" }}>Option</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Image</td>
                                        <td>P0101</td>
                                        <td>Ao khoac Sges</td>
                                        <td>
                                            <Link to="#" className="btn" to="#">
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Image</td>
                                        <td>P0101</td>
                                        <td>Ao khoac Sges</td>
                                        <td>
                                            <Link to="#" className="btn" to="#">
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Image</td>
                                        <td>P0101</td>
                                        <td>Ao khoac Sges</td>
                                        <td>
                                            <Link to="#" className="btn" to="#">
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Image</td>
                                        <td>P0101</td>
                                        <td>Ao khoac Sges</td>
                                        <td>
                                            <Link to="#" className="btn" to="#">
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryTable;
