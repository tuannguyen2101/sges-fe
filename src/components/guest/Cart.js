import { Component } from "react";
import CartItem from "./CartItem";
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Paypal from "./Paypal";
import MyOrdersService from "../../services/guestservice/MyOrdersService";

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            paymentMethod: 0, // 0: cod 1: paypal
            isShowPaypal: false,
            order: {
                name: '',
                email: '',
                phone: '',
                address: ''
            },
            validname: {
                status: true,
                message: ""
            },
            validemail: {
                status: true,
                message: ""
            },
            validphone: {
                status: true,
                message: ""
            },
            validaddress: {
                status: true,
                message: ""
            }
        }
    }

    validate = () => {
        const { name, email, phone, address } = this.state.order
        const isValid = name !== "" && email !== "" && phone !== "" && address !== "";
        if (name === "") {
            this.setState({
                validname: {
                    status: false,
                    message: "Không bỏ trống họ và tên"
                }
            })
        } else {
            this.setState({
                validname: {
                    status: true,
                    message: ""
                }
            })
        }

        if (email === "") {
            this.setState({
                validemail: {
                    status: false,
                    message: "Không bỏ trống email"
                }
            })
        } else {
            this.setState({
                validemail: {
                    status: true,
                    message: ""
                }

            })
        }

        if (phone === "") {
            this.setState({
                validphone: {
                    status: false,
                    message: "Không bỏ trống số điện thoại"
                }

            })
        } else {
            this.setState({
                validphone: {
                    status: true,
                    message: ""
                }

            })
        }

        if (address === "") {
            this.setState({
                validaddress: {
                    status: false,
                    message: "Không bỏ trống địa chỉ nhận hàng"

                }
            })
        } else {
            this.setState({
                validaddress: {
                    status: true,
                    message: ""
                }

            })
        }
        return isValid;
    }

    onChangeInfo = (event) => {
        const { name, value } = event.target;
        this.setState({
            order: {
                ...this.state.order,
                [name]: value,
            }
        })
    }

    order = () => {
        let order = {
            "id": -1,
            "accountId": this.props.auth.id,
            "createDate": new Date(),
            "address": this.state.order.address,
            "status": 0,
            "name": this.state.order.name,
            "phone": this.state.order.phone,
            "email": this.state.order.email
        }

        MyOrdersService.addOrder(order)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                let order = JSON.parse(result);
                let { cart } = this.props;
                let orderDetailList = cart.map(val => {
                    return {
                        "id": -1,
                        "orderId": order.id,
                        "productId": val.prod.id,
                        "size": val.size,
                        "color": val.color,
                        "quantity": val.qty
                    }
                })
                for (let o of orderDetailList) {
                    MyOrdersService.addOrderDetail(o)
                        .then(response => response.text())
                        .then(result => console.log(result))
                        .catch(error => console.log('error', error));
                }
            })
            .catch(error => console.log('error', error))
            .finally(() => {
                alert("Đặt hành thành công!")
            });
    }

    onPay = () => {
        if (this.validate()) {
            if (this.state.paymentMethod === 1) {
                this.setState({
                    isShowPaypal: true
                })
            }
            if (this.state.paymentMethod === 0) {
                this.order();
            }
        }
        else alert("Điền đầy đủ thông tin trước khi thanh toán")
    }

    render() {
        var { cart } = this.props;
        const { validname, validemail, validphone, validaddress } = this.state
        var subTotal = 0;
        var element = cart.map((val, ind) => {
            const price = val.prod.sale > 0 ? val.prod.sale : val.prod.price
            subTotal += price * val.qty
            return <CartItem key={ind}
                cartItem={val}
                deleteFromCart={this.props.deleteFromCart}
                updateCart={this.props.updateCart}
            />
        })
        return (
            <div className='row m-0 mt-5'>
                <div className='col-md-2'></div>
                <div className='col-md-8'>
                    <div className='row'>
                        <div className='col-md-7' style={{ borderRight: "1px solid lightgray" }}>
                            <div>
                                <h4>Giỏ hàng</h4>
                                <table>
                                    <tbody>
                                        {element}
                                    </tbody>
                                </table>
                                <br />
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Chọn mã giảm giá</option>
                                    <option value="1">Miễn phí vận chuyển</option>
                                    <option value="1">Giảm giá 10% cho đơn hàng lớn hơn 300k</option>
                                </select>
                                <br />
                                <table className='w-100 mb-4'>
                                    <tbody>
                                        <tr className='border border-start-0 border-end-0 border-top-1 border-bottom-1'>
                                            <td className='row pt-3'>
                                                <div className='col-6 text-start pb-3'>Tạm tính</div>
                                                <div className='col-6 text-end pb-3'>{subTotal}$</div>
                                                <div className='col-6 text-start pb-3'>Mã giảm giá</div>
                                                <div className='col-6 text-end pb-3'>0đ</div>
                                                <div className='col-6 text-start pb-3'>Phí giao hàng</div>
                                                <div className='col-6 text-end pb-3'>FREE</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <h4>Tổng tiền: {subTotal}$</h4>
                            </div>
                        </div>
                        <div className='col-md-5'>
                            <div>
                                <h4>Thông tin thanh toán</h4>
                                <form>
                                    <div className="mb-3">
                                        <label for="name" className="form-label">Tên người nhận hàng</label>
                                        <input type="text" className="form-control" id="name"
                                            name="name"
                                            onChange={this.onChangeInfo}
                                            value={this.state.order.name}
                                        />
                                        {
                                            validname.status ? "" : <div id="emailHelp" className="form-text text-danger">{validname.message}</div>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleInputEmail1" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                            name="email"
                                            onChange={this.onChangeInfo}
                                            value={this.state.order.email}
                                        />
                                        {
                                            validemail.status ? "" : <div id="emailHelp" className="form-text text-danger">{validemail.message}</div>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label for="phone" className="form-label">Số điện thoại</label>
                                        <input type="number" className="form-control" id="phone"
                                            name="phone"
                                            onChange={this.onChangeInfo}
                                            value={this.state.order.phone}
                                        />
                                        {
                                            validphone.status ? "" : <div id="emailHelp" className="form-text text-danger">{validphone.message}</div>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleInputEmail1" className="form-label">Địa chỉ nhận hàng</label>
                                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                            name="address"
                                            onChange={this.onChangeInfo}
                                            value={this.state.order.address}
                                        />
                                        {
                                            validaddress.status ? "" : <div id="emailHelp" className="form-text text-danger">{validaddress.message}</div>
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <div className="row">
                                            <div className="col-4">
                                                <select className="form-control" value={0}>
                                                    <option>Thành phố</option>
                                                    <option>Hồ Chí Minh</option>
                                                </select>
                                            </div>
                                            <div className="col-4">
                                                <select className="form-control" value={0}>
                                                    <option>Quận/Huyện</option>
                                                    <option>Hồ Chí Minh</option>
                                                </select>
                                            </div>
                                            <div className="col-4">
                                                <select className="form-control" value={0}>
                                                    <option>Phường/Xã</option>
                                                    <option>Hồ Chí Minh</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                {/* <Link className="mt-3 p-0 pt-2 btn w-100 rounded-0" style={{ backgroundColor: '#ADA3A0' }} to="/sges/checkout">
                                <h5 style={{ color: 'white' }}><i className="bi bi-bag-fill pe-2"></i>Đến trang thanh toán</h5>
                            </Link> */}
                            </div>
                            <div className="mt-5">
                                <h4>Hình thức thanh toán</h4>
                                <div className="form-check">
                                    <input
                                        checked={this.state.paymentMethod === 0}
                                        onClick={() => this.setState({ paymentMethod: 0, isShowPaypal: false })}
                                        className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label className="form-check-label" for="flexRadioDefault1">
                                        Thanh toán khi nhận hàng (COD)
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        checked={this.state.paymentMethod === 1}
                                        onClick={() => this.setState({ paymentMethod: 1 })}
                                        className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label className="form-check-label" for="flexRadioDefault2">
                                        Thanh toán bằng ví điện tử
                                    </label>
                                </div>
                                {
                                    this.props.auth !== null ?
                                        this.props.cart.length > 0 ? <button className="mt-3 w-100 btn-checkout" onClick={this.onPay}>Thanh toán</button> : ''
                                        :
                                        <button className="mt-3 w-100 btn-checkout">
                                            <Link style={{ textDecoration: 'none', color: 'white' }} to={"/sges/login"}>
                                                Đăng nhập để thanh toán
                                            </Link>
                                        </button>
                                }
                                <div className="mt-3">
                                    {this.state.isShowPaypal ? <Paypal totalPay={subTotal} onOrder={this.order}/> : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-2'></div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);