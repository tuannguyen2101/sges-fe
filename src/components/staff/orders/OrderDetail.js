import { Component } from "react";

export default class OrderDetail extends Component {
    render() {
        return (
            <div className="p-5">
                <div className="detail-header">
                    <div className="row">
                        <div className="col-12 pb-2">
                            {'< Đơn hàng'}
                        </div>
                        <div className="col-12">
                            <span className="sku pe-2">SON2081</span>
                            <span>20/11/2021 16:30</span> <br></br>
                            <button className="btn-print-order"><i class="bi bi-printer-fill"></i> In đơn hàng</button>
                            <button className="btn-print-order ms-2"><i class="bi bi-check-circle-fill"></i> Duyệt đơn</button>
                            <button className="btn-print-order ms-2"><i class="bi bi-credit-card-2-back-fill"></i> Xác nhận thanh toán</button>
                            <button className="btn-print-order ms-2"><i class="bi bi-archive-fill"></i> Hủy đơn hàng</button>
                        </div>
                        <div className="col-7"></div>
                    </div>
                </div>
                <div className="order-body">
                    <div className="row">
                        <div className="col-9">
                            <div className="customer-info">
                                <div className="title">
                                    <h6>Thông tin khách hàng</h6>
                                    <h6 className="name">Hoàng Anh Tú</h6>
                                </div>
                                <div className="body">
                                    <div className="row">
                                        <div className="col-6">
                                            <h6>Thông tin liên hệ</h6>
                                            0838512268
                                        </div>
                                        <div className="col-6">
                                            <h6>Email</h6>
                                            tuha1021@gmail.com
                                        </div>
                                        <div className="col-6 pt-3">
                                            <h6>Địa chỉ giao hàng</h6>
                                            44/64 Trần Thái Tông, Cầu Giấy, Hà Nội
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-info">
                                <div className="title-top">Thông tin sản phẩm</div>
                                <div className="body">
                                    <div className="row title">
                                        <div className="col">Mã sản phẩm</div>
                                        <div className="col">Sản phẩm</div>
                                        <div className="col">Số lượng</div>
                                        <div className="col text-end">Đơn giá</div>
                                        <div className="col text-end">Thành tiền</div>
                                    </div>
                                    <div className="row">
                                        <div className="col">SP012</div>
                                        <div className="col">Áo khoác</div>
                                        <div className="col">1</div>
                                        <div className="col text-end">300.000</div>
                                        <div className="col text-end">300.000</div>
                                    </div>
                                    <div className="row">
                                        <div className="col">SP092</div>
                                        <div className="col">Quần kaki</div>
                                        <div className="col">2</div>
                                        <div className="col text-end">250.000</div>
                                        <div className="col text-end">500.000</div>
                                    </div>
                                    <div className="row">
                                        <div className="col">SP091</div>
                                        <div className="col">Áo polo</div>
                                        <div className="col">1</div>
                                        <div className="col text-end">300.000</div>
                                        <div className="col text-end">300.000</div>
                                    </div>
                                </div>
                                <div className="product-info-footer">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-4 text-start">Tổng tiền</div>
                                                <div className="col-3 text-end">1.000.000</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4 text-start">Phí giao hàng</div>
                                                <div className="col-3 text-end">30.000</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4 text-start">Khách phải trả</div>
                                                <div className="col-3 text-end">100.030.000</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ship-now">
                                <div className="col-12 text-start">
                                    <i class="bi bi-truck me-2"></i> 
                                    Đóng gói và giao hàng
                                    <button className="btn-ship-now">Giao hàng</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 order-info">
                            <div className="title">
                                <span className="title-ssss">
                                    Thông tin đơn hàng
                                </span>
                                <div>
                                    <i class="bi bi-truck"></i> Hồ Chí Minh
                                </div>
                            </div>
                            <div className="body">
                                <div className="row">
                                    <div className="property col-6">Trạng thái đơn hàng</div> <div className="col-6">: Đang giao hàng</div>
                                    <div className="property col-6">Ngày tạo đơn</div> <div className="col-6">: 20/11/2021 16:30</div>
                                    <div className="property col-6">Trạng thái thanh toán</div> <div className="col-6">: Chưa thanh toán</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}