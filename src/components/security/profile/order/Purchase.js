import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../../../css/purchase/purchase.scss";
import MyOrdersService from "../../../../services/guestservice/MyOrdersService";
import PaginateGuest from "../../../pagination/PaginateGuest";
import PurchaseItem from "./PurchaseItem";
import emptyBill from "../../../../img/empty-bill.svg";

const Purchase = () => {
    const auth = useSelector((state) => state.auth);
    const [stsAndNum, setStsAndNum] = useState({
        status: 9,
        number: 0,
    });

    const [page, setPage] = useState(null);

    const getAllOrder = () => {
        var { status, number } = stsAndNum;
        auth !== null &&
            MyOrdersService.findAllByAccountAndStatus(auth.id, status, number, 10)
                .then((response) => response.text())
                .then((result) => {
                    var rs = JSON.parse(result);
                    console.log(rs);
                    if (rs.empty !== null) {
                        setPage(rs);
                    }
                })
                .catch((err) => console.log(err));
    };

    const capNhatDonH = () => {
        setStsAndNum({
            ...stsAndNum,
            status: stsAndNum.status,
        });
    };

    const prev = () => {
        return page.first != true
            ? setStsAndNum({
                  ...stsAndNum,
                  number: stsAndNum.number - 1,
              })
            : null;
    };

    const select = (n) => {
        return Number(n) >= 0 && Number(n) <= page.totalPages
            ? setStsAndNum({
                  ...stsAndNum,
                  number: n,
              })
            : null;
    };

    const next = () => {
        return !page.last
            ? setStsAndNum({
                  ...stsAndNum,
                  number: stsAndNum.number + 1,
              })
            : null;
    };

    useEffect(() => {
        getAllOrder();
    }, [auth, stsAndNum]);

    return (
        <div className="sges-purchase">
            <div className="container p-0">
                <div className="purchase-main">
                    <nav className="nav-purchase">
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <Link
                                className="nav-link active"
                                type="button"
                                style={{
                                    borderColor:
                                        stsAndNum.status === 9
                                            ? "#fff #fff #1e96e6"
                                            : "#fff #fff #e8e8e8",
                                    color: stsAndNum.status === 9 ? "#1e96e6" : "",
                                    borderRadius: "0",
                                }}
                                onClick={() =>
                                    setStsAndNum({
                                        status: 9,
                                        number: 0,
                                    })
                                }
                                to="#"
                            >
                                <span>T???t c???</span>
                            </Link>
                            <Link
                                className="nav-link active"
                                type="button"
                                style={{
                                    borderColor:
                                        stsAndNum.status === 0
                                            ? "#fff #fff #1e96e6"
                                            : "#fff #fff #e8e8e8",
                                    color: stsAndNum.status === 0 ? "#1e96e6" : "",
                                    borderRadius: "0",
                                }}
                                onClick={() =>
                                    setStsAndNum({
                                        status: 0,
                                        number: 0,
                                    })
                                }
                                to="#"
                            >
                                <span>Ch??? x??c nh???n</span>
                            </Link>
                            <Link
                                className="nav-link active"
                                type="button"
                                style={{
                                    borderColor:
                                        stsAndNum.status === 1
                                            ? "#fff #fff #1e96e6"
                                            : "#fff #fff #e8e8e8",
                                    color: stsAndNum.status === 1 ? "#1e96e6" : "",
                                    borderRadius: "0",
                                }}
                                onClick={() =>
                                    setStsAndNum({
                                        status: 1,
                                        number: 0,
                                    })
                                }
                                to="#"
                            >
                                <span>Ch??? l???y h??ng</span>
                            </Link>
                            <Link
                                className="nav-link active"
                                type="button"
                                style={{
                                    borderColor:
                                        stsAndNum.status === 2
                                            ? "#fff #fff #1e96e6"
                                            : "#fff #fff #e8e8e8",
                                    color: stsAndNum.status === 2 ? "#1e96e6" : "",
                                    borderRadius: "0",
                                }}
                                onClick={() =>
                                    setStsAndNum({
                                        status: 2,
                                        number: 0,
                                    })
                                }
                                to="#"
                            >
                                <span>??ang giao</span>
                            </Link>
                            <Link
                                className="nav-link active"
                                type="button"
                                style={{
                                    borderColor:
                                        stsAndNum.status === 3
                                            ? "#fff #fff #1e96e6"
                                            : "#fff #fff #e8e8e8",
                                    color: stsAndNum.status === 3 ? "#1e96e6" : "",
                                    borderRadius: "0",
                                }}
                                onClick={() =>
                                    setStsAndNum({
                                        status: 3,
                                        number: 0,
                                    })
                                }
                                to="#"
                            >
                                <span>???? nh???n</span>
                            </Link>
                            <Link
                                className="nav-link active"
                                type="button"
                                style={{
                                    borderColor:
                                        stsAndNum.status === 4
                                            ? "#fff #fff #1e96e6"
                                            : "#fff #fff #e8e8e8",
                                    color: stsAndNum.status === 4 ? "#1e96e6" : "",
                                    borderRadius: "0",
                                }}
                                onClick={() =>
                                    setStsAndNum({
                                        status: 4,
                                        number: 0,
                                    })
                                }
                                to="#"
                            >
                                <span>???? h???y</span>
                            </Link>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active">
                            <div className="purchase-body d-flex flex-column p-0 m-0">
                                {page !== null && page.content.length > 0 ? (
                                    page.content.map((value, index) => {
                                        return (
                                            <PurchaseItem
                                                order={value}
                                                key={index}
                                                upd={capNhatDonH}
                                            />
                                        );
                                    })
                                ) : (
                                    <div
                                        className="d-flex flex-column justify-content-center align-items-center"
                                        style={{
                                            height: "50vh",
                                            backgroundColor: "#fff",
                                        }}
                                    >
                                        <img src={emptyBill} alt="" />

                                        <span style={{ fontSize: "24px" }}>
                                            Ch??a c?? h??a ????n n??o
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {page && page.totalPages > 1 && (
                        <div className="paginate">
                            <div
                                className="d-flex justify-content-center"
                                style={{ backgroundColor: "#fff" }}
                            >
                                <PaginateGuest
                                    page={page}
                                    prev={prev}
                                    select={select}
                                    next={next}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Purchase;
