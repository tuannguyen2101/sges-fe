import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/index";
import ProductService from "../../../services/staffservice/ProductService";

class ProductItem extends Component {

    onChangeStatus = () => {
        if (window.confirm("Are you sure?")) {
            ProductService.changeStatus(this.props.product, this.props.auth)
                .then((response) => response.text())
                .then((result) => {
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
                <div className="col-1 text-end">{product.price}</div>
                <div className="col text-center">{product.createDate}</div>
                <div className="col text-center">{product.categoryName}</div>
                <div className="col-1 text-end">
                    <div className="row">
                
                    <button className="btn col" onClick={this.onEdit}>
                        <i className="bi bi-pen"></i>
                    </button>
                    <button className="btn col" onClick={this.onChangeStatus}>
                        {product.status === 1 ? (
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
