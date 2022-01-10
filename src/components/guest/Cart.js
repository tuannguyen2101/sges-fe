import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MyOrdersService from "../../services/guestservice/MyOrdersService";
import Login from "../security/login/Login";
import CartItem from "./CartItem";
import Paypal from "./Paypal";
import "../../css/cart/cart.scss";
import { TiArrowBack } from "react-icons/ti";
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalItem: 0,
            paymentMethod: 0, // 0: cod 1: paypal
            isShowPaypal: false,
            order: {
                name: "",
                email: "",
                phone: "",
                address: "",
            },
            validname: {
                status: true,
                message: "",
            },
            validemail: {
                status: true,
                message: "",
            },
            validphone: {
                status: true,
                message: "",
            },
            validaddress: {
                status: true,
                message: "",
            },
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.cart !== prevProps.cart) {
            this.setState({
                totalItem: this.countItem(this.props.cart),
            });
        }
    }

    countItem = (arr) => {
        var q = 0;
        arr.map((value) => {
            q += value.qty;
        });
        return q;
    };

    render() {
        var { cart } = this.props;
        const { validname, validemail, validphone, validaddress } = this.state;
        var subTotal = 0;
        var element = cart.map((val, ind) => {
            const price = val.prod.sale > 0 ? val.prod.sale : val.prod.price;
            subTotal += price * val.qty;
            return <CartItem key={ind} cartItem={val} updateCart={this.props.updateCart} />;
        });
        return !this.props.auth ? (
            <Login />
        ) : (
            <div className="cart-sges py-4">
                <div className="container">
                    <div className="row my-cart m-0 pt-5 pb-4 d-flex justify-content-center align-items-center text-center">
                        <div className=" col-4 my-cart-title pb-4">
                            <span className="text-center">
                                <h2 style={{ fontFamily: "sans-serif" }}>Giỏ hàng của bạn</h2>
                                <span>
                                    Có<b> {this.state.totalItem} sản phẩm </b>trong giỏ
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="cart-content row m-0">
                        {cart.length > 0 ? (
                            <>
                                <div className="cart-content col-md-8">
                                    <div className="p-3">
                                        <div>
                                            <table className="table m-0">
                                                <tbody>{element}</tbody>
                                            </table>
                                            <br />
                                        </div>
                                    </div>
                                </div>
                                <div className="order-info col-md-4">
                                    <div className="card my-5 p-3">
                                        <div className="order-title pb-2 mb-2">
                                            <span style={{ fontWeight: "500", fontSize: "24px" }}>
                                                Thông tin Đơn hàng
                                            </span>
                                        </div>
                                        <div className="total-order row m-0 my-2 pb-2 d-flex align-items-center">
                                            <div className="col-6 p-0">
                                                <span>Tổng tiền: </span>
                                            </div>
                                            <div className="col-6 p-0 text-end">
                                                <span
                                                    style={{
                                                        fontWeight: "500",
                                                        fontSize: "24px",
                                                        color: "#1e96e6",
                                                    }}
                                                >
                                                    {subTotal
                                                        ? subTotal.toLocaleString("vi-VN", {
                                                              style: "currency",
                                                              currency: "VND",
                                                          })
                                                        : null}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-order row">
                                            <p className="mt-2" style={{ fontSize: "14px" }}>
                                                Phí vận chuyển sẽ được tính ở trang thanh toán.{" "}
                                                <br />
                                                Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                                            </p>
                                        </div>
                                        <div className="order-btn">
                                            <Link to="/checkout" className="d-flex">
                                                <div
                                                    className="btn w-100 p-0"
                                                    style={{
                                                        height: "50px",
                                                        lineHeight: "50px",
                                                        color: "#fff",
                                                    }}
                                                >
                                                    <span>Thanh toán</span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="btn-back d-flex justify-content-center align-items-center">
                                            <Link to="/shop" className="mt-3">
                                                <TiArrowBack fontSize={20} />
                                                <span className="mx-1">Tiếp tục mua hàng</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="row p-4">
                                    <div className="chinh-sach d-flex flex-column">
                                        <h5>Chính sách mua hàng</h5>
                                        <span>- Hàng chính hãng 100%</span>
                                        <span>
                                            - Sản phẩm được đổi 1 lần duy nhất, không hỗ trợ trả
                                            hàng.
                                        </span>
                                        <span>- Sản phẩm còn đủ tem mác, chưa qua sử dụng.</span>
                                        <span>
                                            - Sản phẩm sale chỉ hỗ trợ đổi size {"("}nếu cửa hàng
                                            còn
                                            {")"} trong 7 ngày trên toàn hệ thống
                                        </span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="d-flex justify-content-center">
                                <div className="m-5 d-flex flex-column justify-content-center text-center">
                                    <div className="p-5 pb-1">
                                        <span>
                                            <h1>
                                                <b>Giỏ hàng trống!</b>
                                            </h1>
                                        </span>
                                    </div>
                                    <div className="p-5 pt-0 mb-5">
                                        <Link to="/shop">
                                            <div className="btn">
                                                <span>
                                                    <h5>
                                                        <b>{"Quay lại cửa hàng"}</b>
                                                    </h5>
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
