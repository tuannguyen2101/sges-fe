import { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../actions/index";
import ProductItem from "./ProductItem";

class ProductTable extends Component {
    next = () => {
        this.props.next();
    };

    prev = () => {
        this.props.prev();
    };

    render() {
        var { products } = this.props;

        var element = products.map((val, ind) => {
            return <ProductItem key={ind} product={val} onEdit={this.props.onEdit} />;
        });

        return (
            <div>
                <div className="row p-3 pro-tt">
                    <div className="col-5">Sản phẩm</div>
                    <div className="col-1 text-center">Ảnh</div>
                    <div className="col-1 text-end">Giá</div>
                    <div className="col text-center">Ngày tạo</div>
                    <div className="col text-center">Loại sản phẩm</div>
                    <div className="col-1 text-end">Thao tác</div>
                </div>
                {element}
                <div className="row pt-3 pb-3 pt-hihihi">
                    <div className="col-6">
                        <div className="paginate">
                            <button className="btn-paginate btn-paginate-admin" onClick={this.prev}>
                                {"<<"}
                            </button>
                            <button className="btn-paginate-current">{this.props.page + 1}</button>
                            <button className="btn-paginate btn-paginate-admin" onClick={this.next}>
                                {'>>'}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeStatusProduct: (product) => {
            dispatch(actions.changeStatusProduct(product));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);
