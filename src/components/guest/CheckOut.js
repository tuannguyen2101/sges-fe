import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../css/cart/checkout.scss";
import GiaoHangNhanhService from "../../services/order/GiaoHangNhanhService";
import NotFound from "../notfound/NotFound";
import { NotiError, NotiSuccess, NotiWarring } from "../noti/Noti";
import Login from "../security/login/Login";
import Paypal from "./Paypal";
import ghnlg from "../../img/unnamed.png";
import { BsPaypal } from "react-icons/bs";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import MyOrdersService from "../../services/guestservice/MyOrdersService";
import { clearCart } from "../../actions";
import { IoArrowBackSharp } from "react-icons/io5";

const CheckOut = () => {
    const auth = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [provinces, setProvinces] = useState([]);
    const [provinceKey, setProvinceKey] = useState("");
    const [provinceFilters, setProvinceFilters] = useState([]);

    const [districts, setDistricts] = useState([]);
    const [districtKey, setDistrictKey] = useState("");
    const [districtFilters, setDistrictFilters] = useState([]);

    const [wards, setWards] = useState([]);
    const [wardKey, setWardKey] = useState("");
    const [wardFilters, setWardFilters] = useState([]);

    const [services, setServices] = useState({});

    const [feeOfOrder, setFeeOfOrder] = useState(null);

    const [address, setAddress] = useState({
        province_id: null,
        province: null,
        district_id: null,
        district: null,
        ward_id: null,
        ward: null,
        service_id: null,
    });

    const [paym, setPaym] = useState(false);

    const [total, setTotal] = useState({
        tth: 0,
        ttt: 0,
    });

    const [info, setInfo] = useState({
        id: "",
        fullName: "",
        email: "",
        phone: "",
        address: "",

        chkId: true,
        chkFullName: true,
        chkEmail: true,
        chkPhone: true,
        chkAddress: true,
    });

    const [showPayPal, setShowPayPal] = useState(false);

    // l???y t???t c??? T???nh, th??nh ===========================================================================================
    const getProvinces = () => {
        GiaoHangNhanhService.getProvince()
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 200 && result.data !== null) {
                    setProvinces(
                        result.data
                            .map(({ ProvinceID, NameExtension }) => ({
                                value: ProvinceID,
                                name: NameExtension[1],
                            }))
                            .sort((a, b) => a.value - b.value)
                    );
                }
            })
            .catch((error) => console.log("error", error));
    };

    // T??m T???nh, th??nh
    const provinceHandle = (event) => {
        const searchKey = event.target.value;
        setProvinceKey(searchKey);
        const newProvinces = provinces.filter((val) => {
            return val.name.toLowerCase().includes(searchKey.toLowerCase());
        });
        if (searchKey === "") {
            setProvinceFilters([]);

            setDistricts([]);
            setDistrictKey("");
            setDistrictFilters([]);

            setWards([]);
            setDistrictKey("");
            setWardFilters([]);
        } else {
            setProvinceFilters(newProvinces);
        }
    };

    // Ch???n t???nh, th??nh - T??m qu???n, huy???n
    const selectProvince = (province_id, name) => {
        setProvinceKey(name);

        setDistricts([]);
        setDistrictKey("");
        setDistrictFilters([]);

        setWards([]);
        setWardKey("");
        setWardFilters([]);

        getDistricts(province_id);
        setAddress({
            ...address,
            province_id: province_id,
            provinces: name,
            district_id: null,
            district: null,
            ward_id: null,
            ward: null,
            service_id: null,
        });

        setFeeOfOrder(null);
    };

    // l???y t???t c??? qu???n, huy???n ===========================================================================================
    const getDistricts = (province_id) => {
        GiaoHangNhanhService.getDistrict(province_id)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 200 && result.data !== null) {
                    setDistricts(
                        result.data
                            .filter((value) => {
                                if (
                                    !value.DistrictName.toLowerCase().includes("?????c bi???t") &&
                                    !value.DistrictName.toLowerCase().includes("v???t t??")
                                ) {
                                    return value;
                                }
                            })
                            .map(({ DistrictID, DistrictName }) => ({
                                value: DistrictID,
                                name: DistrictName,
                            }))
                    );
                }
            })
            .catch((error) => console.log("error", error));
    };

    // T??m Qu???n, huy???n
    const districtHandle = (event) => {
        const searchKey = event.target.value;
        setDistrictKey(searchKey);
        const newDistricts = districts.filter((val) => {
            return val.name.toLowerCase().includes(searchKey.toLowerCase());
        });
        if (searchKey === "") {
            setDistrictFilters([]);

            setWards([]);
            setWardKey("");
            setWardFilters([]);
        } else {
            setDistrictFilters(newDistricts);
        }
    };

    // Ch???n Qu???n, huy???n -  T??m x??, ph?????ng - T??m g??i d???ch v???
    const selectDistrict = (district_id, name) => {
        setDistrictKey(name);

        setWards([]);
        setWardFilters([]);
        setWardKey("");

        // T??m x??, ph?????ng
        getWards(district_id);
        // T??m g??i d???ch v???
        getService(district_id);
        setAddress({
            ...address,
            district_id: district_id,
            district: name,
        });

        setFeeOfOrder(null);
    };

    // l???y t???t c??? x?? ph?????ng ===========================================================================================
    const getWards = (district_id) => {
        GiaoHangNhanhService.getWard(district_id)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 200 && result.data !== null) {
                    setWards(
                        result.data
                            .filter((value) => {
                                if (
                                    !value.WardName.toLowerCase().includes("?????c bi???t") &&
                                    !value.WardName.toLowerCase().includes("v???t t??")
                                ) {
                                    return value;
                                }
                            })
                            .map(({ WardCode, WardName }) => ({
                                value: WardCode,
                                name: WardName,
                            }))
                    );
                }
            })
            .catch((error) => console.log("error", error));
    };

    // T??m X??, ph?????ng
    const wardHandle = (event) => {
        const searchKey = event.target.value;
        setWardKey(searchKey);
        const newWards = wards.filter((val) => {
            return val.name.toLowerCase().includes(searchKey.toLowerCase());
        });
        if (searchKey === "") {
            setWardFilters([]);
        } else {
            setWardFilters(newWards);
        }
    };

    // Ch???n X??, ph?????ng - T??m g??i d???ch v???
    const selectWard = (value, name) => {
        setWardKey(name);
        setAddress({
            ...address,
            ward_id: value,
            ward: name,
        });
    };

    // L???y t???t c??? g??i d???ch v??? ===========================================================================================
    const getService = (to_district) => {
        GiaoHangNhanhService.getService(to_district)
            .then((response) => response.json())
            .then((result) => {
                if (result.code === 200 && result.data !== null) {
                    setServices(result);
                }
            })
            .catch((error) => console.log("error", error));
    };

    // Ch???n g??i d???ch v??? - T??nh gi?? c?????c
    const selectService = (service_id) => {
        if (address.ward_id === null) {
            NotiWarring("B???n ch??a ch???n X?? - ph?????ng!");
        } else {
            getFeeOfOrder(service_id);
        }
    };

    // T??nh gi?? c?????c v???n chuy???n ===========================================================================================
    const getFeeOfOrder = (service_id) => {
        let { district_id, ward_id } = address;
        if (district_id !== null && ward_id !== null && service_id !== null) {
            GiaoHangNhanhService.getFeeOfOrder(
                district_id,
                ward_id,
                service_id,
                total.tth,
                200 * countItem(cart),
                5 * countItem(cart)
            )
                .then((response) => response.json())
                .then((result) => {
                    setFeeOfOrder(result);
                })
                .catch((error) => console.log("error", error));
        }
    };

    const changeInfo = (e) => {
        var { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value,
        });
    };

    // ?????t h??ng ===========================================================================================
    const order = (payment) => {
        let order = {
            id: -1,
            accountId: auth ? auth.id : info.id,
            createDate: new Date(),
            address: info.address + ", " + wardKey + ", " + districtKey + ", " + provinceKey,
            name: info.fullName,
            phone: info.phone,
            email: info.email,
            transportFee: feeOfOrder ? feeOfOrder.data.total : 0,
            tienHang: total.tth,
            tongThanhToan: total.ttt,
            status: 0,
            payment: payment,
        };
        console.log(order);
        MyOrdersService.addOrder(order)
            .then((response) => response.text())
            .then((result) => {
                let order = JSON.parse(result);
                console.log(order);
                let orderDetailList = cart.map((val) => {
                    return {
                        id: -1,
                        orderId: order.id,
                        productId: val.prod.id,
                        price: val.prod.sale > 0 ? val.prod.sale : val.prod.price,
                        size: val.size,
                        color: val.color,
                        quantity: val.qty,
                    };
                });
                for (let o of orderDetailList) {
                    MyOrdersService.addOrderDetail(o)
                        .then((response) => response.text())
                        .then((result) => {
                            console.log(result);
                            dispatch(clearCart());
                            localStorage.removeItem(auth.username);
                        })
                        .catch((error) => {
                            console.log("error", error);
                        });
                }
                NotiSuccess("?????t h??ng th??nh c??ng!");
                navigate("/user/purchase");
            })
            .catch((error) => {
                console.log("error", error);
                NotiError("L???i th??ng tin giao h??ng!");
                NotiWarring("????n h??ng ch??a ???????c t???o!");
            });
    };

    const callBackFunction = (isPay) => {
        order(isPay);
    };

    const checkInfo = () => {
        if (
            info.fullName !== "" &&
            info.email !== "" &&
            info.phone !== "" &&
            info.address !== "" &&
            feeOfOrder !== null &&
            total.tth > 0 &&
            total.ttt > 0
        ) {
            return true;
        }
        return false;
    };

    const onCash = () => {
        if (checkInfo()) {
            order(0);
        } else {
            NotiWarring("B???n h??y ??i???n ?????y ????? th??ng tin tr?????c khi thanh to??n!");
            setShowPayPal(false);
            setPaym(false);
        }
    };

    const onPay = () => {
        if (checkInfo()) {
            setPaym(true);
            setShowPayPal(true);
        } else {
            NotiWarring("B???n h??y ??i???n ?????y ????? th??ng tin tr?????c khi thanh to??n!");
            setShowPayPal(false);
        }
    };

    const tinhtth = (arr) => {
        var q = 0;
        arr.map((value) => {
            value.prod.sale
                ? (q += value.qty * value.prod.sale)
                : (q += value.qty * value.prod.price);
        });
        return q;
    };

    const tinhTien = () => {
        setTotal({
            ...total,
            tth: tinhtth(cart),
            ttt: feeOfOrder !== null ? total.tth + feeOfOrder.data.total : 0,
        });
    };

    const initInfo = (au) => {
        if (au !== null) {
            setInfo({
                ...info,
                id: au.id,
                fullName: au.fullName,
                email: au.email,
            });
        }
    };

    const countItem = (arr) => {
        var q = 0;
        arr.map((value) => {
            q += value.qty;
        });
        return q;
    };

    useEffect(() => {
        tinhTien();
        initInfo(auth);
        getProvinces();
    }, [cart, feeOfOrder, auth]);

    return !auth ? (
        <Login />
    ) : cart.length > 0 ? (
        <div className="checkout-sges py-4">
            <div className="container p-0">
                <div className="checkout-main row m-0 d-flex justify-content-center align-items-center text-center">
                    <div className="checkout-title p-3 w-100 text-center">
                        <h1>Thanh To??n</h1>
                    </div>
                    <div className="checkout-content p-0">
                        <div className="row m-0">
                            <div className="col-8 p-0">
                                <div className="checkout-order-info d-flex justify-content-start flex-column p-5">
                                    <div className="mb-3 text-start">
                                        <h5>Th??ng tin giao h??ng</h5>
                                    </div>
                                    <div className="p-2 text-start">
                                        <TextField
                                            name="fullName"
                                            className="w-100"
                                            id="standard"
                                            onChange={changeInfo}
                                            value={info.fullName}
                                            variant="standard"
                                            label="H??? v?? t??n"
                                        />
                                    </div>
                                    <div className="text-start d-flex">
                                        <div className="col-7 p-2">
                                            <TextField
                                                name="email"
                                                className="w-100"
                                                id="standard"
                                                onChange={changeInfo}
                                                value={info.email}
                                                variant="standard"
                                                label="Email"
                                            />
                                        </div>
                                        <div className="col-5 p-2">
                                            <TextField
                                                name="phone"
                                                className="w-100"
                                                id="standard"
                                                onChange={changeInfo}
                                                value={info.phone}
                                                variant="standard"
                                                label="S??? ??i???n tho???i"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-2 text-start">
                                        <div className="pt-3 pb-2">
                                            <span>?????a ch??? giao h??ng</span>
                                        </div>
                                        <div className="py-2">
                                            <TextField
                                                name="address"
                                                className="w-100"
                                                id="standard"
                                                onChange={changeInfo}
                                                value={info.address}
                                                variant="standard"
                                                label="?????a ch??? chi ti???t"
                                            />
                                        </div>
                                    </div>
                                    <div className="order-address p-2 text-start d-flex justify-content-between">
                                        {/* T???nh th??nh ================================================================================= */}
                                        <div className="dropdown d-flex justify-content-center align-items-center">
                                            <input
                                                data-bs-toggle="dropdown"
                                                type="text"
                                                placeholder="T???nh - Th??nh Ph???"
                                                onChange={provinceHandle}
                                                value={provinceKey}
                                            />
                                            <Link
                                                className="dropdown-toggle"
                                                to="#"
                                                aria-expanded="false"
                                                id="dropdownMenuButton1"
                                            ></Link>
                                            <ul
                                                className="dropdown-menu"
                                                aria-labelledby="dropdownMenuButton1"
                                            >
                                                {provinceFilters.length > 0
                                                    ? provinceFilters.map((value, index) => {
                                                          return (
                                                              <li key={index}>
                                                                  <Link
                                                                      className="dropdown-item"
                                                                      to="#"
                                                                      onClick={() =>
                                                                          selectProvince(
                                                                              value.value,
                                                                              value.name
                                                                          )
                                                                      }
                                                                  >
                                                                      {value.name}
                                                                  </Link>
                                                              </li>
                                                          );
                                                      })
                                                    : provinces.map((value, index) => {
                                                          return (
                                                              <li key={index}>
                                                                  <Link
                                                                      className="dropdown-item"
                                                                      to="#"
                                                                      onClick={() =>
                                                                          selectProvince(
                                                                              value.value,
                                                                              value.name
                                                                          )
                                                                      }
                                                                  >
                                                                      {value.name}
                                                                  </Link>
                                                              </li>
                                                          );
                                                      })}
                                            </ul>
                                        </div>
                                        {/* Qu???n huy???n ================================================================================= */}
                                        <div className="dropdown d-flex justify-content-center align-items-center">
                                            <input
                                                data-bs-toggle="dropdown"
                                                type="text"
                                                placeholder="Qu???n - Huy???n"
                                                onChange={districtHandle}
                                                value={districtKey}
                                            />
                                            <Link
                                                className="dropdown-toggle"
                                                to="#"
                                                aria-expanded="false"
                                                id="dropdownMenuButton2"
                                            ></Link>
                                            <ul
                                                className="dropdown-menu"
                                                aria-labelledby="dropdownMenuButton2"
                                            >
                                                {districtFilters.length > 0
                                                    ? districtFilters.map((value, index) => {
                                                          return (
                                                              <li key={index}>
                                                                  <Link
                                                                      className="dropdown-item"
                                                                      to="#"
                                                                      onClick={() =>
                                                                          selectDistrict(
                                                                              value.value,
                                                                              value.name
                                                                          )
                                                                      }
                                                                  >
                                                                      {value.name}
                                                                  </Link>
                                                              </li>
                                                          );
                                                      })
                                                    : districts.map((value, index) => {
                                                          return (
                                                              <li key={index}>
                                                                  <Link
                                                                      className="dropdown-item"
                                                                      to="#"
                                                                      onClick={() =>
                                                                          selectDistrict(
                                                                              value.value,
                                                                              value.name
                                                                          )
                                                                      }
                                                                  >
                                                                      {value.name}
                                                                  </Link>
                                                              </li>
                                                          );
                                                      })}
                                            </ul>
                                        </div>
                                        {/* X?? ph?????ng ================================================================================= */}
                                        <div className="dropdown d-flex justify-content-center align-items-center">
                                            <input
                                                data-bs-toggle="dropdown"
                                                type="text"
                                                placeholder="X?? - Ph?????ng"
                                                onChange={wardHandle}
                                                value={wardKey}
                                            />
                                            <Link
                                                className="dropdown-toggle"
                                                to="#"
                                                aria-expanded="false"
                                                id="dropdownMenuButton3"
                                            ></Link>
                                            <ul
                                                className="dropdown-menu"
                                                aria-labelledby="dropdownMenuButton3"
                                            >
                                                {wardFilters.length > 0
                                                    ? wardFilters.map((value, index) => {
                                                          return (
                                                              <li key={index}>
                                                                  <Link
                                                                      className="dropdown-item"
                                                                      to="#"
                                                                      onClick={() =>
                                                                          selectWard(
                                                                              value.value,
                                                                              value.name
                                                                          )
                                                                      }
                                                                  >
                                                                      {value.name}
                                                                  </Link>
                                                              </li>
                                                          );
                                                      })
                                                    : wards.map((value, index) => {
                                                          return (
                                                              <li key={index}>
                                                                  <Link
                                                                      className="dropdown-item"
                                                                      to="#"
                                                                      onClick={() =>
                                                                          selectWard(
                                                                              value.value,
                                                                              value.name
                                                                          )
                                                                      }
                                                                  >
                                                                      {value.name}
                                                                  </Link>
                                                              </li>
                                                          );
                                                      })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* Ph????ng th???c v???n chuy???n ================================================================================= */}
                                {services.data && districtKey !== "" && wardKey !== "" && (
                                    <div className="p-5 service d-flex flex-column">
                                        <div className="mb-2 d-flex justify-content-between align-items-end">
                                            <span>
                                                <h5>Ph????ng th???c v???n chuy???n</h5>
                                            </span>
                                            <span>
                                                <span>
                                                    <b style={{ color: "orange" }}>
                                                        Giao h??ng nhanh
                                                    </b>
                                                </span>
                                                <img src={ghnlg} height="50px" alt="ghn" />
                                            </span>
                                        </div>
                                        {services.data.map((value, index) => {
                                            return (
                                                <div
                                                    className="d-flex my-2 p-0 form-check justify-content-start align-items-center"
                                                    key={index}
                                                >
                                                    <input
                                                        className="mx-3 form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id={value.service_id}
                                                    />
                                                    <label
                                                        className="w-100 px-2 form-check-label text-start"
                                                        htmlFor={value.service_id}
                                                        onClick={() =>
                                                            selectService(value.service_id)
                                                        }
                                                    >
                                                        {value.short_name}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                        <span className="text-end">
                                            {services.code_message_value && (
                                                <small style={{ color: "red" }}>
                                                    {"* " + services.code_message_value}
                                                </small>
                                            )}
                                        </span>
                                        {feeOfOrder && (
                                            <div className="pt-4 d-flex justify-content-between align-items-center">
                                                <span>
                                                    <h6>Ph?? v???n chuy???n</h6>
                                                </span>
                                                <span>
                                                    <h5>
                                                        {feeOfOrder.data.total.toLocaleString(
                                                            "vi-VN",
                                                            {
                                                                style: "currency",
                                                                currency: "VND",
                                                            }
                                                        )}
                                                    </h5>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {/* Ph????ng th???c thanh to??n ================================================================================= */}
                                <div className="payment p-5 d-flex justify-content-start flex-column">
                                    <div className="mb-2 text-start d-flex align-items-center justify-content-between">
                                        <span>
                                            <h5>Ph????ng th???c thanh to??n</h5>
                                        </span>
                                        <div className="payment-method d-flex align-items-center">
                                            <Link
                                                to="#"
                                                className="d-flex"
                                                style={{
                                                    border:
                                                        paym === false
                                                            ? "2px solid #1e96e6"
                                                            : "2px solid #d5d5d5",
                                                }}
                                                onClick={() => setPaym(false)}
                                            >
                                                <div
                                                    className="btn"
                                                    style={{
                                                        color: paym === false ? "#1e96e6" : "",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    <FaRegMoneyBillAlt
                                                        fontSize="24px"
                                                        color="green"
                                                    />
                                                    <small style={{ marginLeft: "8px" }}>
                                                        Thanh to??n khi nh???n h??ng
                                                    </small>
                                                </div>
                                            </Link>
                                            <Link
                                                to="#"
                                                className="d-flex"
                                                style={{
                                                    border:
                                                        paym === true
                                                            ? "2px solid #1e96e6"
                                                            : "2px solid #d5d5d5",
                                                }}
                                                onClick={() => setPaym(true)}
                                            >
                                                <div
                                                    className="btn"
                                                    style={{
                                                        color: paym === true ? "#1e96e6" : "",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    <BsPaypal fontSize="24px" color="#1774b3" />
                                                    <small style={{ marginLeft: "8px" }}>
                                                        V?? PayPal
                                                    </small>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>

                                    <div
                                        className="payment-method-content p-2 pt-5 d-flex justify-content-end"
                                        style={{ borderBottom: "1px solid #d5d5d5" }}
                                    >
                                        <div className="col-6 p-0">
                                            <div className="pay-p p-2 d-flex justify-content-between">
                                                <span>T???ng ti???n h??ng</span>
                                                <span>
                                                    {paym === true ? (
                                                        <b>
                                                            {total.tth
                                                                ? (
                                                                      Math.round(
                                                                          (total.tth / 22700) * 1000
                                                                      ) / 1000
                                                                  ).toLocaleString("en-US", {
                                                                      style: "currency",
                                                                      currency: "USD",
                                                                  })
                                                                : (0).toLocaleString("en-US", {
                                                                      style: "currency",
                                                                      currency: "USD",
                                                                  })}
                                                        </b>
                                                    ) : (
                                                        <b>
                                                            {total.tth
                                                                ? total.tth.toLocaleString(
                                                                      "vi-VN",
                                                                      {
                                                                          style: "currency",
                                                                          currency: "VND",
                                                                      }
                                                                  )
                                                                : (0).toLocaleString("vi-VN", {
                                                                      style: "currency",
                                                                      currency: "VND",
                                                                  })}
                                                        </b>
                                                    )}
                                                </span>
                                            </div>
                                            <div className="pay-p p-2 d-flex justify-content-between">
                                                <span>Ph?? v???n chuy???n</span>
                                                <span>
                                                    {paym === true ? (
                                                        <b>
                                                            {feeOfOrder
                                                                ? (
                                                                      Math.round(
                                                                          (feeOfOrder.data.total /
                                                                              22700) *
                                                                              1000
                                                                      ) / 1000
                                                                  ).toLocaleString("en-US", {
                                                                      style: "currency",
                                                                      currency: "USD",
                                                                  })
                                                                : (0).toLocaleString("en-US", {
                                                                      style: "currency",
                                                                      currency: "USD",
                                                                  })}
                                                        </b>
                                                    ) : (
                                                        <b>
                                                            {feeOfOrder
                                                                ? feeOfOrder.data.total.toLocaleString(
                                                                      "vi-VN",
                                                                      {
                                                                          style: "currency",
                                                                          currency: "VND",
                                                                      }
                                                                  )
                                                                : (0).toLocaleString("vi-VN", {
                                                                      style: "currency",
                                                                      currency: "VND",
                                                                  })}
                                                        </b>
                                                    )}
                                                </span>
                                            </div>
                                            <div className="pay-p p-2 d-flex justify-content-between align-items-center">
                                                <span>T???ng thanh to??n</span>
                                                <span
                                                    style={{
                                                        fontSize: "30px",
                                                        fontWeight: "500",
                                                        color: "red",
                                                    }}
                                                >
                                                    {paym === true ? (
                                                        <b>
                                                            {feeOfOrder
                                                                ? (
                                                                      Math.round(
                                                                          ((total.tth +
                                                                              feeOfOrder.data
                                                                                  .total) /
                                                                              22700) *
                                                                              1000
                                                                      ) / 1000
                                                                  ).toLocaleString("en-US", {
                                                                      style: "currency",
                                                                      currency: "USD",
                                                                  })
                                                                : (
                                                                      Math.round(
                                                                          (total.tth / 22700) * 1000
                                                                      ) / 1000
                                                                  ).toLocaleString("en-US", {
                                                                      style: "currency",
                                                                      currency: "USD",
                                                                  })}
                                                        </b>
                                                    ) : (
                                                        <b>
                                                            {feeOfOrder
                                                                ? (
                                                                      total.tth +
                                                                      feeOfOrder.data.total
                                                                  ).toLocaleString("vi-VN", {
                                                                      style: "currency",
                                                                      currency: "VND",
                                                                  })
                                                                : total.tth.toLocaleString(
                                                                      "vi-VN",
                                                                      {
                                                                          style: "currency",
                                                                          currency: "VND",
                                                                      }
                                                                  )}
                                                        </b>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buy pt-4 d-flex justify-content-end">
                                        {paym === true ? (
                                            showPayPal === true ? (
                                                <div className="col-5 p-4">
                                                    <Paypal
                                                        totalPay={total.ttt / 22700}
                                                        orderAndPay={callBackFunction}
                                                    />
                                                </div>
                                            ) : (
                                                <Link
                                                    to="#"
                                                    className="d-flex px-5 p-1"
                                                    style={{
                                                        backgroundColor: "#1e96e6",
                                                        borderRadius: "2px",
                                                    }}
                                                    onClick={onPay}
                                                >
                                                    <div className="btn" style={{ color: "#fff" }}>
                                                        <span>{"?????t h??ng v?? thanh to??n"}</span>
                                                    </div>
                                                </Link>
                                            )
                                        ) : (
                                            <Link
                                                to="#"
                                                className="d-flex px-5 p-1"
                                                style={{
                                                    backgroundColor: "#1e96e6",
                                                    borderRadius: "2px",
                                                }}
                                                onClick={onCash}
                                            >
                                                <div className="btn" style={{ color: "#fff" }}>
                                                    <span>?????t h??ng</span>
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 p-0 py-4">
                                <div className="p-checkout px-4">
                                    <div className="cart-checkout d-flex flex-column align-items-center">
                                        <div className="p-title w-100 d-flex justify-content-start">
                                            <h5>Gi??? h??ng</h5>
                                        </div>
                                        {cart &&
                                            cart.length &&
                                            cart.map(({ prod, color, size, qty }, index) => {
                                                return (
                                                    <div
                                                        className="p-content-Item my-2 d-flex w-100 justify-content-between"
                                                        key={index}
                                                        style={{
                                                            borderBottom: "1px solid #e4e4e4",
                                                        }}
                                                    >
                                                        <div
                                                            className="p-2"
                                                            style={{ position: "relative" }}
                                                        >
                                                            <img
                                                                height="70px"
                                                                alt="i am a product"
                                                                src={
                                                                    "http://localhost:8080/file/read/" +
                                                                    prod.image
                                                                }
                                                            />
                                                            <span
                                                                style={{
                                                                    position: "absolute",
                                                                    top: "0",
                                                                    right: "0",
                                                                    backgroundColor: "#1774b3",
                                                                    height: "22px",
                                                                    lineHeight: "22px",
                                                                    width: "22px",
                                                                    borderRadius: "50px",
                                                                    color: "#fff",
                                                                }}
                                                            >
                                                                <small>{qty}</small>
                                                            </span>
                                                        </div>
                                                        <div className="p-2 d-flex flex-column">
                                                            <span className="text-start">
                                                                <small>{prod.name}</small>
                                                            </span>
                                                            <div className="text-start d-flex justify-content-between">
                                                                <span className="d-flex justify-content-between w-50">
                                                                    <small>
                                                                        <b>
                                                                            {size} / {color}
                                                                        </b>
                                                                    </small>
                                                                    <small>
                                                                        {(prod.sale > 0
                                                                            ? prod.sale
                                                                            : prod.price
                                                                        ).toLocaleString("vi-VN", {
                                                                            style: "currency",
                                                                            currency: "VND",
                                                                        })}
                                                                    </small>
                                                                </span>
                                                                <span>
                                                                    <b>
                                                                        {(prod.sale > 0
                                                                            ? prod.sale * qty
                                                                            : prod.price * qty
                                                                        ).toLocaleString("vi-VN", {
                                                                            style: "currency",
                                                                            currency: "VND",
                                                                        })}
                                                                    </b>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        <div
                                            className="p-2 pb-3 mt-3 w-100"
                                            style={{ borderBottom: "1px solid #d5d5d5" }}
                                        >
                                            <div className="w-100 d-flex justify-content-between">
                                                <span>
                                                    <h5>T???ng c???ng</h5>
                                                </span>
                                                <span>
                                                    <h5>
                                                        <b>
                                                            {total.tth
                                                                ? total.tth.toLocaleString(
                                                                      "vi-VN",
                                                                      {
                                                                          style: "currency",
                                                                          currency: "VND",
                                                                      }
                                                                  )
                                                                : (0).toLocaleString("vi-VN", {
                                                                      style: "currency",
                                                                      currency: "VND",
                                                                  })}
                                                        </b>
                                                    </h5>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="py-2 text-end w-100">
                                            <Link to="/cart">
                                                <div
                                                    className="btn p-0"
                                                    style={{ color: "#1774b3" }}
                                                >
                                                    <IoArrowBackSharp />
                                                    <small style={{ marginLeft: "8px" }}>
                                                        Quay l???i gi??? h??ng
                                                    </small>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <NotFound
            noti="Gi??? h??ng tr???ng kh??ng!"
            text="B???n kh??ng c?? m??n h??ng n??o ????? thanh to??n, h??y th??m s???n ph???m v??o gi??? h??ng v?? quay l???i nh??!"
        />
    );
};

export default CheckOut;
