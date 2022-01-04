import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/index";
import CategoryService from "../../../services/staffservice/CategoryService";
import ProductService from "../../../services/staffservice/ProductService";

class ProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: "",
        };
    }

    findCate = () => {
        CategoryService.findById(this.props.product.categoryId, this.props.auth)
            .then((response) => response.text())
            .then((result) => {
                this.setState({
                    categoryName: JSON.parse(result).name,
                });
            })
            .catch((error) => console.log("error", error));
    };

    componentDidMount = () => {
        this.findCate();
    };

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
            <tr>
                <th scope="row">{product.id}</th>
                <td style={{width:'300px'}}>{product.name}</td>
                <td className="text-center"><img
                    width={50}
                    height={50}
                    style={{objectFit: 'cover'}}
                    className=""
                    alt="i am an"
                    src={"http://localhost:8080/file/read/" + product.image}
                ></img></td>
                <td className="text-end">{product.price}</td>
                <td className="text-center">{product.createDate}</td>
                <td className="text-center">{this.state.categoryName}</td>
                <td className="text-center">
                <i className="bi bi-circle-fill" style={{color: `${product.status === 1 ? '#00ff44' : 'red'}`}}></i>
                {`${product.status === 1 ? 'Kích hoạt' : 'Ngừng kích hoạt'}`}</td>
                <td className="text-end ps-0 pe-0">
                    <button className="btn" onClick={this.onEdit}>
                        <i className="bi bi-pen"></i>
                    </button>
                </td>
                <td className="text-center ps-0 pe-0">
                    <button className="btn" onClick={this.onChangeStatus}>
                        {product.status === 1 ? (
                            <i className="bi bi-trash"></i>
                        ) : (
                            <i className="bi bi-arrow-counterclockwise"></i>
                        )}
                    </button>
                </td>
            </tr>
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
