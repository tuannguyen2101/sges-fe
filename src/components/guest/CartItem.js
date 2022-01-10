import { Component } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions/index";
import "../../css/cart/cartItem.scss";
import { NotiInfo } from "../noti/Noti";
class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: Number(0),
        };
    }

    componentDidMount = () => {
        this.setState({
            qty: Number(this.props.cartItem.qty),
        });
    };

    componentDidUpdate = (prevState) => {
        if (
            prevState.qty !== this.state.qty &&
            this.state.qty !== "" &&
            this.state.qty !== 0 &&
            this.state.qty !== null &&
            this.state.qty !== undefined &&
            !isNaN(this.state.qty)
        ) {
            var q = Number(this.state.qty);
            var { cartItem } = this.props;
            cartItem.qty = q;
            this.props.updateCart(cartItem);
            console.log(q);
        }
    };

    removeFromCart = () => {
        this.props.removeFromCart(this.props.cartItem);
        NotiInfo("Đã xóa sản phẩm khỏi giỏ hàng!");
    };

    onChange = (event) => {
        if (isNaN(event.target.value)) {
            if (event.target.value === "") {
                // this.setState({ qty: Number(1) });
            } else {
                this.setState({ qty: Number(1) });
            }
        } else if (!isNaN(event.target.value) && event.target.value > this.props.cartItem.amount) {
            this.setState({
                qty: this.props.cartItem.amount,
            });
        } else if (event.target.value == "0") {
            // this.setState({ qty: Number(1) });
        } else {
            this.setState({
                qty: event.target.value,
            });
        }
    };

    tang = () => {
        if (this.state.qty >= this.props.cartItem.amount) {
            this.setState({ qty: this.props.cartItem.amount });
        } else {
            this.setState({
                qty: this.state.qty + 1,
            });
        }
    };

    removeConfirm = () => {
        let text = "Bạn muốn xóa sản phẩm khỏi giỏ hàng?";
        if (window.confirm(text) == true) {
            this.removeFromCart();
            return true;
        } else {
            return false;
        }
    };

    giam = () => {
        if (this.state.qty <= 1) {
            if (!this.removeConfirm()) {
                this.setState({
                    qty: 1,
                });
            }
        } else {
            this.setState({
                qty: this.state.qty - 1,
            });
        }
    };

    render() {
        var { cartItem } = this.props;
        return (
            <tr>
                <td>
                    <div className="row p-2">
                        <div className="col-3">
                            <div className="cart-p-img d-flex justify-content-center align-items-center">
                                <img
                                    height="150px"
                                    alt="i am a product"
                                    src={"http://localhost:8080/file/read/" + cartItem.prod.image}
                                />
                            </div>
                        </div>
                        <div className="col-9 d-flex flex-column justify-content-between">
                            <div className="d-flex align-items-center justify-content-between">
                                <b>{cartItem.prod.name}</b>
                                <Link to="#">
                                    <div onClick={this.removeFromCart} className="btn p-0">
                                        <IoCloseSharp fontSize="24px" />
                                    </div>
                                </Link>
                            </div>
                            <div>
                                Phiên bản: {cartItem.size} / {cartItem.color}
                            </div>
                            <div className="cart-p-quantity d-flex align-items-center justify-content-between pt-3">
                                {cartItem.prod.sale > 0 ? (
                                    <div className="d-flex flex-column">
                                        <del style={{ color: "#888" }}>
                                            {cartItem !== null &&
                                                cartItem.prod !== null &&
                                                cartItem.prod.price !== null &&
                                                cartItem.prod.price.toLocaleString("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })}
                                        </del>
                                        <b>
                                            {cartItem.prod.sale.toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </b>
                                    </div>
                                ) : (
                                    <b>
                                        {cartItem.prod.price.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                                    </b>
                                )}
                                <div className="p-quantity d-flex justify-content-center">
                                    <div className="btn" onClick={this.giam}>
                                        <AiOutlineMinus />
                                    </div>
                                    <input
                                        className="p-0"
                                        type="text"
                                        name="quantity"
                                        value={this.state.qty}
                                        onChange={this.onChange}
                                    />
                                    <div className="btn" onClick={this.tang}>
                                        <AiOutlinePlus />
                                    </div>
                                </div>
                                <b className="total text-end" style={{ width: "100px" }}>
                                    {cartItem.prod.sale
                                        ? (cartItem.prod.sale * this.state.qty).toLocaleString(
                                              "vi-VN",
                                              {
                                                  style: "currency",
                                                  currency: "VND",
                                              }
                                          )
                                        : (cartItem.prod.price * this.state.qty).toLocaleString(
                                              "vi-VN",
                                              {
                                                  style: "currency",
                                                  currency: "VND",
                                              }
                                          )}
                                </b>
                            </div>
                        </div>
                    </div>
                </td>
                <td className="p-3"></td>
            </tr>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCart: (cartItem) => {
            dispatch(actions.updateCart(cartItem));
        },
        removeFromCart: (cartItem) => {
            dispatch(actions.removeFromCart(cartItem));
        },
    };
};

export default connect(null, mapDispatchToProps)(CartItem);
