import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/index";
import CategoryService from "../../../services/staffservice/CategoryService";
import ProductService from "../../../services/staffservice/ProductService";
import { NotiError, NotiSuccess } from "../../noti/Noti";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
});

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            file: null,
            listSize: [],
            listColor: [],
            listVersion: [],
            preImg: undefined
        };
    }

    componentDidMount = () => {
        const { productDetails } = this.props.productDetail;
        this.getCategories();
        this.getAllVersion();
        this.setState({
            listVersion: productDetails ? productDetails : [],
            preImg: this.props.productDetail.image !== "" ? `http://localhost:8080/file/read/` + this.props.productDetail.image : "https://www.chanchao.com.tw/vietnamwood/images/default.jpg"
        });
    };

    getAllVersion = () => {
        const { productDetails } = this.props.productDetail;
        if (productDetails) {
            const colors = [
                ...new Set(
                    productDetails.map((val) => {
                        return val.color;
                    })
                ),
            ];
            const size = [
                ...new Set(
                    productDetails.map((val) => {
                        return val.size;
                    })
                ),
            ];
            this.setState({
                listSize: size,
                listColor: colors,
            });
        }
    };

    getCategories = () => {
        CategoryService.findAll(0, 10)
            .then((response) => response.text())
            .then((result) => {
                this.setState({
                    categories: JSON.parse(result).content,
                });
            })
            .catch((error) => console.log("error", error));
    };

    validate = (product) => {
        if (product.name === "") {
            NotiError("Tên không được để trống!");
            return false;
        }
        if (Number(product.price) <= 0 || product.price === "" || isNaN(product.price)) {
            NotiError("Giá không hợp lệ");
            return false;
        }
        if (Number(product.categoryId) === -1) {
            NotiError("Chưa chọn loại sản phẩm!");
            return false;
        }
        if (Number(product.sale) < 0 || isNaN(product.sale)) {
            NotiError("Giá sale không hợp lệ");
            return false;
        }

        return true;
    };

    onchange = (event) => {
        this.props.setProductDetail({
            ...this.props.productDetail,
            [event.target.name]: event.target.value
        });
    };

    addProduct = () => {
        if (this.state.file === null) {
            NotiError("Chưa chọn ảnh sản phẩm!");
            return false;
        }
        let { productDetail } = this.props;
        productDetail.image = this.state.file.name;
        ProductService.addProduct(this.props.productDetail, this.props.auth)
            .then((response) => response.text())
            .then((result) => {
                this.props.addProduct(JSON.parse(result));
                this.upload();
                const listVersion = this.state.listVersion.map((v) => {
                    return {
                        ...v,
                        productId: JSON.parse(result).id,
                    };
                });
                ProductService.addVersion(listVersion).then(r => NotiSuccess("Thêm mới thành công!"));
                this.props.onCancel();
                return result;
            })
            .catch((error) => console.log("error", error));
    };

    updateProduct = () => {
        let { productDetail } = this.props;
        if (this.state.file !== null) {
            productDetail.image = this.state.file.name;
        }
        ProductService.updateProduct(productDetail, this.props.auth)
            .then((response) => response.text())
            .then((result) => {
                this.props.updateProduct(JSON.parse(result));
                if (this.state.file !== null) {
                    this.upload();
                }
                const listVersion = this.state.listVersion.map((v) => {
                    return {
                        ...v,
                        productId: JSON.parse(result).id,
                    };
                });
                ProductService.addVersion(listVersion).then(r => NotiSuccess("Cập nhật thành công!"));
            })
            .catch((error) => console.log("error", error));
    };

    onChangeImage = (event) => {
        if (event.target.files[0] !== undefined) {
            if (event.target.files[0].type.includes("image")) {
                this.setState({
                    file: event.target.files[0],
                    preImg: URL.createObjectURL(event.target.files[0])
                });
            } else {
                NotiError("Chỉ chọn ảnh!");
                this.setState({
                    file: null,
                });
            }
        } else {
            NotiError("Chỉ chọn ảnh !");
            this.setState({
                file: null,
            });
        }
    };

    upload = () => {
        const data = new FormData();
        data.append("files", this.state.file);

        axios
            .post("http://localhost:8080/file/save", data, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            })
            .then((res) => console.log(res))
            .catch((err) => {
                NotiError("Serve is not response: " + err);
            });
    };

    onSubmit = (event) => {
        event.preventDefault();
        if (this.validate(this.props.productDetail)) {
            const { action } = this.props;
            action === 0 ? this.addProduct() : this.updateProduct();
        }
    };

    removeFile = (event) => {
        event.preventDefault();
        document.getElementById("icon-button-file").value = "";
        this.setState({
            file: null,
            preImg: this.props.productDetail.image !== "" ? `http://localhost:8080/file/read/` + this.props.productDetail.image : "https://www.chanchao.com.tw/vietnamwood/images/default.jpg"
        });
    };

    onAddSize = () => {
        const size = window.prompt("Nhập giá trị");
        if (size !== null && size !== "") {
            const { productDetail } = this.props;
            let newListVersion = [];
            if (this.state.listColor.length > 0) {
                this.state.listColor.forEach((color) => {
                    newListVersion = [
                        ...newListVersion,
                        {
                            id: -1,
                            color,
                            size,
                            qty: 0,
                            productId: productDetail.id,
                        },
                    ];
                });
            }
            this.setState({
                listSize: [...this.state.listSize, size],
                listVersion: [...this.state.listVersion, ...newListVersion],
            });
        }
    };

    onAddColor = () => {
        let color = window.prompt("Nhập giá trị");
        if (color !== null && color !== "") {
            const { productDetail } = this.props;
            let newListVersion = [];
            if (this.state.listSize.length > 0) {
                this.state.listSize.forEach(size => {
                    newListVersion = [
                        ...newListVersion,
                        {
                            id: -1,
                            color,
                            size,
                            qty: 0,
                            productId: productDetail.id,
                        },
                    ];
                });
            }
            this.setState({
                listColor: [...this.state.listColor, color],
                listVersion: [...this.state.listVersion, ...newListVersion],
            });
        }
    };

    deleteSize = (size) => {
        this.setState({
            listSize: [...this.state.listSize].filter((s) => {
                return s !== size;
            }),
            listVersion: [...this.state.listVersion].filter((s) => {
                return s.size !== size;
            }),
        });
    };

    deleteColor = (color) => {
        this.setState({
            listColor: [...this.state.listColor].filter((c) => {
                return c !== color;
            }),
            listVersion: [...this.state.listVersion].filter((c) => {
                return c.color !== color;
            }),
        });
    };

    onChangeQty = (e, v) => {
        const { value } = e.target;
        if (value >= 0 && !isNaN(value)) {
            this.setState({
                listVersion: [
                    ...this.state.listVersion.map((version) => {
                        return version.size === v.size && version.color === v.color
                            ? {
                                ...version,
                                qty: value,
                            }
                            : version;
                    }),
                ],
            });
        }
    };

    render() {
        const { productDetail } = this.props;
        const { categories } = this.state;

        const categoriesElement = categories.map((val, ind) => {
            return (
                <option key={ind} value={val.id}>
                    {val.name}
                </option>
            );
        });

        return (
            <div>
                <div className="row pb-3 title-detail">
                    <div className="col-6">
                        {/* <h5>{this.props.action === 0 ? "Thêm mới sản phẩm" : "Cập nhật sản phẩm"}</h5> */}
                    </div>
                    <div className="col-6 text-end">
                        <button type="submit" className="btn-save me-2" onClick={this.onSubmit}>
                            Lưu
                        </button>
                        <button type="submit" className="btn-cancel" onClick={this.props.onCancel}>
                            Hủy
                        </button>
                    </div>
                </div>

                <div className="content-detail">
                    <div className="row">
                        <div className="col-8 info">
                            <div className="title">
                                <h6>Thông tin sản phẩm</h6>
                            </div>
                            <div className="mb-2 mt-3">
                                <label htmlFor="name" className="form-label">
                                    Tên sản phẩm <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    onChange={this.onchange}
                                    value={productDetail.name}
                                />
                            </div>
                            <div className="mb-2 row">
                                <div className="col">
                                    <label htmlFor="category" className="form-label">
                                        Loại sản phẩm <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        name="categoryId"
                                        onChange={this.onchange}
                                        value={productDetail.categoryId}
                                    >
                                        <option value="-1">Chọn danh mục</option>
                                        {categoriesElement}
                                    </select>
                                </div>
                                <div className="col">
                                    <label htmlFor="price" className="form-label">
                                        Giá bán <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        id="price"
                                        name="price"
                                        onChange={this.onchange}
                                        min={1}
                                        value={productDetail.price}
                                    />
                                </div>
                            </div>
                            <div className="mb-2 row">
                                <div className="col">
                                    <label htmlFor="createdate" className="form-label">
                                        Ngày tạo
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="createdate"
                                        readOnly
                                        value={productDetail.createDate}
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="status" className="form-label">
                                        Trạng thái <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        name="status"
                                        onChange={this.onchange}
                                        value={productDetail.status}
                                    >
                                        <option value="1">Kích hoạt</option>
                                        <option value="0">Ngừng kích hoạt</option>
                                        <option value="2">Sản phẩm mới</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="sale" className="form-label">
                                        Giá sale
                                    </label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        id="sale"
                                        min={0}
                                        name="sale"
                                        onChange={this.onchange}
                                        value={productDetail.sale}
                                    />
                                </div>
                                <div className="col">
                                    <label className="form-label">
                                        Đã bán
                                    </label>
                                    <div className="sold-admin">{productDetail.sold}</div>
                                </div>
                                <div className="col-12 mt-3">
                                    <label className="form-label">
                                        Mô tả chi tiết sản phẩm
                                    </label>
                                    <textarea className="form-control" cols={112}
                                        name="description"
                                        onChange={this.onchange}
                                        value={productDetail.description}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-4 image-prod">
                            <div className="image">
                                <h6>Ảnh sản phẩm</h6>
                                <label htmlFor="icon-button-file">
                                    <Input accept="image/*" id="icon-button-file" type="file" onChange={this.onChangeImage} />
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                                <button className="btn text-danger" onClick={this.removeFile}>
                                    <i class="bi bi-x-circle-fill"></i>
                                </button>
                                <img
                                    className="w-100"
                                    alt="i am an"
                                    src={this.state.preImg}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            "https://www.chanchao.com.tw/vietnamwood/images/default.jpg";
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content-detail mt-3">
                    <div className="row">
                        <div className="info col-8">
                            <div className="row">
                                <div className="col-6">
                                    <h6>Thuộc tính</h6>
                                </div>
                                <div className="col-6 text-end">
                                    {/* <button className="btn-version">Lưu thuộc tính</button> */}
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-2">Thuộc tính</div>
                                        <div className="col-8">Giá trị</div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-2">Size</div>
                                        <div className="col-8">
                                            {this.state.listSize.map((size, index) => {
                                                return (
                                                    <span key={index} className="property-item">
                                                        {`${size}`}
                                                        <i
                                                            onClick={() => this.deleteSize(size)}
                                                            className="bi bi-x-lg"
                                                        />
                                                    </span>
                                                );
                                            })}
                                        </div>
                                        <div
                                            className="col-2 btn-add-property"
                                            onClick={this.onAddSize}
                                        >
                                            <i className="bi bi-plus-circle" /> Thêm size
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-2">Màu sắc</div>
                                        <div className="col-8">
                                            {this.state.listColor.map((color, index) => {
                                                return (
                                                    <span key={index} className="property-item">
                                                        {`${color}`}
                                                        <i
                                                            onClick={() => this.deleteColor(color)}
                                                            className="bi bi-x-lg"
                                                        />
                                                    </span>
                                                );
                                            })}
                                        </div>
                                        <div
                                            className="col-2 btn-add-property"
                                            onClick={this.onAddColor}
                                        >
                                            <i className="bi bi-plus-circle" /> Thêm màu
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    !this.state.listVersion.length > 0 ? "" :

                        (<div className="content-detail mt-3">
                            <div className="row info">
                                <div className="col">
                                    <h6>Phiên bản sản phẩm</h6>
                                </div>
                                <div className="col-12">
                                    <div className="tbl-version">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Tên phiên bản</th>
                                                    <th>Size</th>
                                                    <th>Màu sắc sản phẩm</th>
                                                    <th>Số lượng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.listVersion.map((v, ind) => {
                                                    return (
                                                        <tr key={ind}>
                                                            <td className="w-25">{`${v.size} - ${v.color}`}</td>
                                                            <td className="w-25">{v.size}</td>
                                                            <td className="w-25">{v.color}</td>
                                                            <td className="w-25">
                                                                <input
                                                                    name="qty"
                                                                    onChange={(e) => this.onChangeQty(e, v)}
                                                                    value={v.qty}
                                                                    type="number"
                                                                    className="form-control"
                                                                />
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>)
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        productDetail: state.productDetail,
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setProductDetail: (product) => {
            dispatch(actions.setProductDetail(product));
        },
        addProduct: (product) => {
            dispatch(actions.addProduct(product));
        },
        updateProduct: (product) => {
            dispatch(actions.updateProduct(product));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
