import React, { Component } from "react";
import { ExportReactCSV } from "./ExportReactCSV";
import OrderDetail from "./OrderDetail";
import OrderItem from "./OrderItem";
import OrderRow from "./OrderRow";
let base64 = require("base-64");
export default class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderList: [],
            fileName: 'Order List',
            screen: 0,
            currentWindow: 0
        };
    }

    componentDidMount = () => {
        this.getAllOrder();
    };


    changeScreen = (screen) => {
        this.setState({
            screen
        })
    }

    setCurrenWindow = (value) => {
        this.setState({
            currentWindow: value
        })
    }

    getAllOrder = () => {
        var myHeaders = new Headers();
        var token = localStorage.getItem("token");
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Cookie", "JSESSIONID=93F3A27A52519A25A145DEFBFA4CD4C2");

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("http://localhost:8080/staff/order/getAll", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                this.setState({
                    orderList: JSON.parse(result),
                });
            })
            .catch((error) => console.log("error", error));
    };

    confirm = (order) => {
        this.setState({
            orderList: [...this.state.orderList].map((val) => {
                return val.id === order.id ? order : val;
            }),
        });
    };

    render() {
        let element = this.state.orderList.map((val, ind) => {
            return <OrderItem key={ind} order={val} confirm={this.confirm} />;
        });
        const { screen } = this.state

        return (
            // <ExportReactCSV csvData={this.state.orderList} fileName={this.state.fileName} />
            <div className="order-manager">
                <div className="order-content">
                    {
                        this.state.currentWindow === 0 ? (
                            <div>
                                <div className="order-conten-header mb-3">
                                    <div className="row">
                                        <div className="col-6 text-muted">Quản lý hóa đơn / Danh sách hóa đơn</div>
                                        <div className="col-6 text-end">
                                            <button className="btn-export">
                                                <i class="bi bi-arrow-bar-down"></i> Xuất file
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-screen">
                                    <div className="row p-0 m-0">
                                        <div className={`col screen-select ${screen === 0 ? 'active-screen' : ''}`}
                                            onClick={() => this.changeScreen(0)}>
                                            Chờ xác nhận
                                        </div>
                                        <div className={`col screen-select ${screen === 1 ? 'active-screen' : ''}`}
                                            onClick={() => this.changeScreen(1)}>
                                            Đã xác nhận
                                        </div>
                                        <div className={`col screen-select ${screen === 2 ? 'active-screen' : ''}`}
                                            onClick={() => this.changeScreen(2)}>
                                            Đang giao hàng
                                        </div>
                                        <div className={`col screen-select ${screen === 3 ? 'active-screen' : ''}`}
                                            onClick={() => this.changeScreen(3)}>
                                            Đã nhận hàng
                                        </div>
                                        <div className={`col screen-select ${screen === 4 ? 'active-screen' : ''}`}
                                            onClick={() => this.changeScreen(4)}>
                                            Đã thanh toán
                                        </div>
                                        <div className={`col screen-select ${screen === 5 ? 'active-screen' : ''}`}
                                            onClick={() => this.changeScreen(5)}>
                                            Đơn hàng bị hủy
                                        </div>
                                    </div>
                                </div>
                                <div className="filter-area">
                                    <div className="row">
                                        <div className="col-5">
                                            <input placeholder="Tìm kiếm đơn hàng" />
                                        </div>
                                        <div className="col-5 text-center">
                                            <select>
                                                <option>Trạng thái thanh toán</option>
                                            </select>
                                            <select>
                                                <option>Ngày tạo</option>
                                            </select>
                                        </div>
                                        <div className="col-2 text-end">
                                            <button>Lưu bộ lọc</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="table-head row m-0">
                                        <div className="col-2"></div>
                                        <div className="col-2">Ngày tạo đơn hàng</div>
                                        <div className="col-2">Tên khách hàng</div>
                                        <div className="col-2">Trạng thái đơn hàng</div>
                                        <div className="col-2 text-center">Thanh toán</div>
                                        <div className="col-2 text-end">Khách phải trả</div>
                                    </div>
                                    <OrderRow />
                                    <div className="table-item row m-0">
                                        <div className="col-2"><i class="bi bi-three-dots-vertical" onClick={() => this.setCurrenWindow(1)}></i></div>
                                        <div className="col-2">02/10/2001 12:03</div>
                                        <div className="col-2">Trần Văn A</div>
                                        <div className="col-2">
                                            <span className="status-order conf" style={{ background: '#05ac0b27' }}>
                                                Đã xác nhận
                                            </span>
                                        </div>
                                        <div className="col-2 text-center"><i className="bi bi-check-circle-fill active-payment"></i></div>
                                        <div className="col-2 text-end">550.000</div>
                                    </div>
                                    <div className="table-item row m-0">
                                        <div className="col-2"><i class="bi bi-three-dots-vertical"></i></div>
                                        <div className="col-2">01/10/2001 12:03</div>
                                        <div className="col-2">Hoàng Anh Tú</div>
                                        <div className="col-2">
                                            <span className="status-order ship" style={{ background: '#ff9d1431' }}>
                                                Đang giao
                                            </span>
                                        </div>
                                        <div className="col-2 text-center"><i className="bi bi-check-circle-fill active-payment"></i></div>
                                        <div className="col-2 text-end">550.000</div>
                                    </div>
                                    <div className="table-item row m-0">
                                        <div className="col-2"><i class="bi bi-three-dots-vertical"></i></div>
                                        <div className="col-2">01/10/2001 12:03</div>
                                        <div className="col-2">Hoàng Anh Tú</div>
                                        <div className="col-2">
                                            <span className="status-order reci" style={{ background: '#EEF2FD' }}>
                                                Đã nhận hàng
                                            </span>
                                        </div>
                                        <div className="col-2 text-center"><i className="bi bi-check-circle-fill active-payment"></i></div>
                                        <div className="col-2 text-end">550.000</div>
                                    </div>
                                    <div className="table-item row m-0">
                                        <div className="col-2"><i class="bi bi-three-dots-vertical"></i></div>
                                        <div className="col-2">01/10/2001 12:03</div>
                                        <div className="col-2">Hoàng Anh Tú</div>
                                        <div className="col-2">
                                            <span className="status-order canc" style={{ background: '#e047472d' }}>
                                                Hủy
                                            </span>
                                        </div>
                                        <div className="col-2 text-center"><i className="bi bi-check-circle-fill active-payment"></i></div>
                                        <div className="col-2 text-end">550.000</div>
                                    </div>
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
                                    <div className="table-item row m-0">
                                        <div className="col-2"><i class="bi bi-three-dots-vertical"></i></div>
                                        <div className="col-2">02/10/2001 12:03</div>
                                        <div className="col-2">Trần Văn A</div>
                                        <div className="col-2">
                                            <span className="status-order conf" style={{ background: '#05ac0b27' }}>
                                                Đã xác nhận
                                            </span>
                                        </div>
                                        <div className="col-2 text-center"><i className="bi bi-check-circle-fill active-payment"></i></div>
                                        <div className="col-2 text-end">550.000</div>
                                    </div>
                                    <div className="table-item row m-0">
                                        <div className="col-2"><i class="bi bi-three-dots-vertical"></i></div>
                                        <div className="col-2">01/10/2001 12:03</div>
                                        <div className="col-2">Hoàng Anh Tú</div>
                                        <div className="col-2">
                                            <span className="status-order ship" style={{ background: '#ff9d1431' }}>
                                                Đang giao
                                            </span>
                                        </div>
                                        <div className="col-2 text-center"><i className="bi bi-check-circle-fill active-payment"></i></div>
                                        <div className="col-2 text-end">550.000</div>
                                    </div>
                                    <div className="table-item row m-0">
                                        <div className="col-2"><i class="bi bi-three-dots-vertical"></i></div>
                                        <div className="col-2">01/10/2001 12:03</div>
                                        <div className="col-2">Hoàng Anh Tú</div>
                                        <div className="col-2">
                                            <span className="status-order reci" style={{ background: '#EEF2FD' }}>
                                                Đã nhận hàng
                                            </span>
                                        </div>
                                        <div className="col-2 text-center"><i className="bi bi-check-circle-fill active-payment"></i></div>
                                        <div className="col-2 text-end">550.000</div>
                                    </div>
                                    <div className="table-item row m-0">
                                        <div className="col-2"><i class="bi bi-three-dots-vertical"></i></div>
                                        <div className="col-2">01/10/2001 12:03</div>
                                        <div className="col-2">Hoàng Anh Tú</div>
                                        <div className="col-2">
                                            <span className="status-order canc" style={{ background: '#e047472d' }}>
                                                Hủy
                                            </span>
                                        </div>
                                        <div className="col-2 text-center"><i className="bi bi-check-circle-fill active-payment"></i></div>
                                        <div className="col-2 text-end">550.000</div>
                                    </div>
                                    <div className="table-footer text-end">
                                        <button className="btn-paginate">
                                            Prev
                                        </button>
                                        <button className="btn-paginate-current">5</button>
                                        <button className="btn-paginate">
                                            Next
                                        </button>
                                    </div>
                                    {/* <tbody>{element}</tbody> */}
                                </div>
                            </div>
                        ) : (
                            <OrderDetail />
                        )
                    }
                </div>
            </div>
        );
    }
}
