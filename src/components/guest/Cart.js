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
                                <h2 style={{ fontFamily: "sans-serif" }}>Gi??? h??ng c???a b???n</h2>
                                <span>
                                    C??<b> {this.state.totalItem} s???n ph???m </b>trong gi???
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
                                <div className="cart-order-info col-md-4">
                                    <div className="card my-5 p-3">
                                        <div className="order-title pb-2 mb-2">
                                            <span style={{ fontWeight: "500", fontSize: "24px" }}>
                                                Th??ng tin ????n h??ng
                                            </span>
                                        </div>
                                        <div className="total-order row m-0 my-2 pb-2 d-flex align-items-center">
                                            <div className="col-6 p-0">
                                                <span>T???ng ti???n: </span>
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
                                                Ph?? v???n chuy???n s??? ???????c t??nh ??? trang thanh to??n.{" "}
                                                <br />
                                                B???n c??ng c?? th??? nh???p m?? gi???m gi?? ??? trang thanh to??n.
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
                                                    <span>Thanh to??n</span>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="btn-back d-flex justify-content-center align-items-center">
                                            <Link to="/shop" className="mt-3">
                                                <TiArrowBack fontSize={20} />
                                                <span className="mx-1">Ti???p t???c mua h??ng</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="row p-4">
                                    <div className="chinh-sach d-flex flex-column">
                                        <h5>Ch??nh s??ch mua h??ng</h5>
                                        <span>- H??ng ch??nh h??ng 100%</span>
                                        <span>
                                            - S???n ph???m ???????c ?????i 1 l???n duy nh???t, kh??ng h??? tr??? tr???
                                            h??ng.
                                        </span>
                                        <span>- S???n ph???m c??n ????? tem m??c, ch??a qua s??? d???ng.</span>
                                        <span>
                                            - S???n ph???m sale ch??? h??? tr??? ?????i size {"("}n???u c???a h??ng
                                            c??n
                                            {")"} trong 7 ng??y tr??n to??n h??? th???ng
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
                                                <b>Gi??? h??ng tr???ng!</b>
                                            </h1>
                                        </span>
                                    </div>
                                    <div className="p-5 pt-0 mb-5">
                                        <Link to="/shop">
                                            <div className="btn">
                                                <span>
                                                    <h5>
                                                        <b>{"Quay l???i c???a h??ng"}</b>
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
