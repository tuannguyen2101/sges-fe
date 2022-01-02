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
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Price</th>
                            <th scope="col">Create date</th>
                            <th scope="col">Category</th>
                            <th scope="col">Status</th>
                            <th scope="col" colSpan="2">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>{element}</tbody>
                    <tfoot>
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
                    </tfoot>
                </table>

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
