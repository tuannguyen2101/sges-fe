import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/index";
import CategoryService from "../../../services/staffservice/CategoryService";
import ProductService from "../../../services/staffservice/ProductService";
import ProductDetail from "./ProductDetail";
import ProductTable from "./ProductTable";

class ProductIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            action: -1,
            status: -1,
            btn: "View Recycle bin",
            page: 0,
            screen: 0,
            filterCateId: -1,
            nameQuery: "",
            categories: []
        };
    }

    componentDidMount = () => {
        ProductService.findAll(0, 1, 1, "")
            .then((response) => response.text())
            .then((result) => {
                this.props.setProducts(JSON.parse(result));
            })
            .catch((error) => console.log("error", error));
        this.getCategories();
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

    onAdd = () => {
        this.changeAction(0);
        this.setState({
            screen: 1,
        });
        this.props.setProductDetail({
            id: -1,
            name: "",
            image: "",
            price: 1,
            createDate: new Date(),
            status: 1,
            categoryId: -1,
            sale: 0,
            sold: 0,
            description: ""
        });
    };

    onEdit = () => {
        this.changeAction(1);
        this.setState({
            screen: 1,
        });
    };

    onCancel = () => {
        this.changeAction(-1);
        this.setState({
            screen: 0,
        });
    };

    changeAction = (action) => {
        this.setState({
            action: action,
        });
    };

    next = () => {
        const { status, filterCateId, nameQuery, page } = this.state;
        ProductService.findAll(page + 1, filterCateId, status, nameQuery)
            .then((response) => response.text())
            .then((result) => {
                this.props.setProducts(JSON.parse(result));
                this.setState({
                    page: this.state.page + 1,
                });
            })
            .catch((error) => console.log("error", error));
    };

    prev = () => {
        if (this.state.page > 0) {
            const { status, filterCateId, nameQuery, page } = this.state;
            ProductService.findAll(page - 1, filterCateId, status, nameQuery)
                .then((response) => response.text())
                .then((result) => {
                    this.props.setProducts(JSON.parse(result));
                    this.setState({
                        page: this.state.page - 1,
                    });
                })
                .catch((error) => console.log("error", error));
        }
    };

    onViewRecycle = () => {
        ProductService.findAll(0, 0, this.props.auth)
            .then((response) => response.text())
            .then((result) => {
                this.props.setProducts(JSON.parse(result));
            })
            .catch((error) => console.log("error", error));
        this.setState({
            btn: "View Active Product",
            status: 0,
            page: 0,
        });
    };

    onViewActive = () => {
        ProductService.findAll(0, 1, this.props.auth)
            .then((response) => response.text())
            .then((result) => {
                this.props.setProducts(JSON.parse(result));
            })
            .catch((error) => console.log("error", error));
        this.setState({
            btn: "View Recycle bin",
            status: 1,
            page: 0,
        });
    };

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    onSearch = () => {
        const { status, filterCateId, nameQuery, page } = this.state;
        ProductService.findAll(page, filterCateId, status, nameQuery)
            .then((response) => response.text())
            .then((result) => {
                this.props.setProducts(JSON.parse(result));
            })
            .catch((error) => console.log("error", error));
    }

    render() {

        const cboCategory = this.state.categories.map((val, ind) => {
            return <option key={ind} value={val.id}>{val.name}</option>;
        })

        return (
            <div className="products" style={{ backgroundColor: "#F0F1F1" }}>
                <div className="pt-3" style={{ paddingLeft: "35px" }}>
                    <h5>Quản lý sản phẩm</h5>
                </div>
                <div className="row pt-1 pe-5 ps-5">
                    {/* <div className={action === -1 ? "" : "col-8"}> */}
                    {this.state.screen === 1 ? (
                        <div className="col-md-12">
                            <ProductDetail onCancel={this.onCancel} action={this.state.action} />
                        </div>
                    ) : (
                        <div className="content">
                            <button className="btn btn-add" onClick={this.onAdd}>
                                <i className="bi bi-plus"></i>Thêm sản phẩm mới
                            </button>
                            {/* <button
                            className="btn btn-viewstatus"
                            onClick={this.state.status === 1 ? this.onViewRecycle : this.onViewActive}
                        >
                            {this.state.btn}
                        </button> */}
                            <div className="search-area">
                                <div className="row">
                                    <div className="col-sm-5 input-search">
                                        <input
                                            onChange={this.onChange}
                                            name="nameQuery"
                                            value={this.state.nameQuery}
                                            className="form-control"
                                            placeholder="Tìm kiếm theo tên sản phẩm"
                                        />
                                        <i className="bi bi-search"></i>
                                    </div>
                                    <div className="col-sm-2">
                                        <select
                                            name="filterCateId"
                                            onChange={this.onChange} className="form-control cate-filter">
                                            <option value={-1}>Danh mục</option>
                                            {cboCategory}
                                        </select>
                                    </div>
                                    <div className="col-sm-2">
                                        <select
                                            name="status"
                                            value={this.state.status}
                                            onChange={this.onChange} className="form-control cate-filter">
                                            <option value={-1}>Trạng thái</option>
                                            <option value={1}>Kích hoạt</option>
                                            <option value={0}>Ngừng kích hoạt</option>
                                            <option value={2}>Mới</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-3">
                                        <button className="btn btn-search-admin" onClick={this.onSearch}>
                                            Tìm kiếm
                                        </button>
                                        <button className="btn btn-search-admin ms-2" onClick={this.onSearch}>
                                            Xóa lọc
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <ProductTable
                                onEdit={this.onEdit}
                                next={this.next}
                                prev={this.prev}
                                page={this.state.page}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setProducts: (products) => {
            dispatch(actions.setProducts(products));
        },
        setProductDetail: (product) => {
            dispatch(actions.setProductDetail(product));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductIndex);
