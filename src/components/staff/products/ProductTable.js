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
                {/* <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Tên sản phẩm</th>
                            <th className="text-center" scope="col">Ảnh</th>
                            <th className="text-end" scope="col">Giá</th>
                            <th className="text-center" scope="col">Ngày tạo</th>
                            <th className="text-center" scope="col">Loại sản phẩm</th>
                            <th className="text-center" scope="col">Trạng thái</th>
                            <th className="text-center" scope="col" colSpan="2">
                            </th>
                        </tr>
                    </thead> */}
                {element}
                <div className="row pt-3 pb-3 pt-hihihi">
                    <div className="col-6">
                        <div className="paginate">
                            <button className="btn-paginate" onClick={this.prev}>
                                {"<<"}
                            </button>
                            <button className="btn-paginate-current">{this.props.page + 1}</button>
                            <button className="btn-paginate" onClick={this.next}>
                                {'>>'}
                            </button>
                        </div>
                    </div>
                </div>
                {/* <tbody>{element}</tbody> */}
                {/* <tfoot>
                        <tr>
                            <th colSpan={9}>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="paginate">
                                            <button className="btn-paginate" onClick={this.prev}>
                                                {"<<"}
                                            </button>
                                            <button className="btn-paginate-current">{this.props.page + 1}</button>
                                            <button className="btn-paginate" onClick={this.next}>
                                                {'>>'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </tfoot> */}
                {/* </table> */}

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
