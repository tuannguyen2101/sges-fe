import { Component } from "react";

export default class OrderRow extends Component {

    showDetail = () =>{
        this.props.setCurrenWindow(1);
    }

    render() {

        const {orderItem} = this.props;

        return (
            <div className="table-item row m-0">
                {/* cái i bên dưới ấn vào thì sang chi tiết đơn truyền cái hàm */}
                <div className="col-2"><i onClick={this.showDetail} class="bi bi-three-dots-vertical"></i></div>
                <div className="col-2">01/10/2001 12:03</div>
                <div className="col-2">Hoàng Anh Tú</div>
                <div className="col-2">
                    {/* Chỗ className thứ 2 và style của span bên dưới tùy vào trạng thái đơn hàng*/}
                    {/* Xem bên phần order list có một danh sách các div theo từng trạng thái đơn */}
                    {/* bên này chỉ cần viết thêm cái hàm if else render ra span là xong*/}
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