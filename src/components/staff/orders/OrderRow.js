import { Component } from "react";

export default class OrderRow extends Component {



    render() {

        const {orderItem} = this.props;
        
        return (
            <div className="table-item row m-0">
                <div className="col-2"><i class="bi bi-three-dots-vertical"></i></div>
                <div className="col-2">01/10/2001 12:03</div>
                <div className="col-2">Hoàng Anh Tú</div>
                <div className="col-2">
                    <span className="status-order inpro" style={{ background: '#33a0ff2d' }}>
                        Chờ xác nhận
                    </span>
                </div>
                <div className="col-2 text-center"><i className="bi bi-check-circle-fill active-payment"></i></div>
                <div className="col-2 text-end">550.000</div>
            </div>
        )
    }
}