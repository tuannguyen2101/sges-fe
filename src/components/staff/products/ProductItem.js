import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/index";
import ProductService from "../../../services/staffservice/ProductService";
import { NotiSuccess } from "../../noti/Noti";

class ProductItem extends Component {

    onChangeStatus = () => {
        if (window.confirm(this.props.product.status === 1 ? "Bạn chắc chắn muốn xóa?" : "Kích hoạt sản phẩm ?")) {
            ProductService.changeStatus(this.props.product, this.props.auth)
                .then((response) => response.text())
                .then((result) => {
                    NotiSuccess(this.props.product.status === 0 ? "Xóa thành công!" : "Đã kích hoạt!")
                    this.props.changeStatusProduct(this.props.product);
                })
                .catch((error) => console.log("error", error));
        }
    };

    onEdit = () => {
        this.props.onEdit();
        this.props.setProductDetail(this.props.product);
    };

    render() {
        var { product } = this.props;
        return (
            <div className="row p-3 pt-hi">
                <div className="col-5 hihi">{product.name}</div>
                <div className="col-1 text-center">
                    <img
                        width={50}
                        height={50}
                        style={{ objectFit: 'cover' }}
                        className="pt-img"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                                "http://localhost:8080/file/read/no-image-800x600.png";
                        }}
                        src={"http://localhost:8080/file/read/" + product.image}
                        alt="hi"
                    ></img>
                </div>
                <div className="col-1 text-end price-admin">
                    {
                        product.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })
                    }
                </div>
                <div className="col text-center">{product.createDate}</div>
                <div className="col text-center">{product.categoryName}</div>
                <div className="col-1 text-end">
                    <div className="row">
                        <button className="btn col" onClick={this.onEdit}>
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn col" onClick={this.onChangeStatus}>
                            {product.status === 1 || product.status === 2 ? (
                                <i className="bi bi-trash"></i>
                            ) : (
                                <i className="bi bi-arrow-counterclockwise"></i>
                            )}
                        </button>
                    </div>
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
        changeStatusProduct: (product) => {
            dispatch(actions.changeStatusProduct(product));
        },
        setProductDetail: (product) => {
            dispatch(actions.setProductDetail(product));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
