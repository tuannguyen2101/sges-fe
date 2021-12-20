import { Component } from "react";
import { connect } from "react-redux"
import * as actions from "../../actions/index"

class CartItem extends Component {

    constructor (props) {
        super(props)
        this.state = {
            qty : 0
        }
    }   

    componentDidMount = () => {
        this.setState ({
            qty: this.props.cartItem.qty
        })
    }

    removeFromCart = () => {
        this.props.removeFromCart(this.props.cartItem)
    }

    onChange = (event) => {
        if(this.getQuantity() < Number(event.target.value)){
            return;
        }
        var { cartItem } = this.props
        this.setState ({
            qty: event.target.value
        })
        cartItem.qty = Number(event.target.value)
        this.props.updateCart(cartItem);
    }

    getQuantity = () => {
        var { productDetails } = this.props.cartItem.prod
        const qty = productDetails.filter(val => {
            return val.size === this.props.cartItem.size && val.color === this.props.cartItem.color;
        }).map(val => val.qty)[0]
        return qty
    } 

    render() {
        var { cartItem } = this.props
        return (
            <tr className='border border-start-0 border-end-0 border-top-1 border-bottom-1'>
                <td>
                    <div className='row p-3'>
                        <div className='col-4'>
                            <img
                                width='70%'
                                alt='i am a product'
                                src={"http://localhost:8080/file/read/" + cartItem.prod.image} />
                        </div>
                        <div className='col-8'>
                            <h6>{cartItem.prod.name}</h6>
                            <div>{cartItem.prod.sale > 0 ? <del>{cartItem.prod.price}</del> : cartItem.prod.price}$</div>
                            <div>{cartItem.prod.sale > 0 ? cartItem.prod.sale : ""}$</div>
                            <span>Size: {cartItem.size}</span>
                            &nbsp; | &nbsp;
                            <span>Màu: {cartItem.color}</span>
                        </div>
                    </div>
                </td>
                <td className='p-3'>
                    <input type='number' className='border border-1 border-dark w-50 mb-3'
                        min={1}
                        value={this.state.qty}
                        onChange={this.onChange}
                    />
                    <span>&nbsp;{`Kho: ${this.getQuantity()}`}</span>
                    <div>Total: {cartItem.prod.price * cartItem.qty}$</div>
                </td>
                <td>
                    <button
                        onClick={this.removeFromCart}
                        className='btn'>
                        <i className="bi bi-x-circle"></i>
                    </button>
                </td>
            </tr>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateCart: cartItem => {
            dispatch(actions.updateCart(cartItem))
        },
        removeFromCart : cartItem => {
            dispatch(actions.removeFromCart(cartItem))
        }
    }
}


export default connect(null, mapDispatchToProps)(CartItem);