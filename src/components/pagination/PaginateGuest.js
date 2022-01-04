import React, { useEffect } from "react";
import "../../css/paginate/paginateguest.scss";
// import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";

const PaginateGuest = ({ page, prev, next, select }) => {
    const p = useSelector((state) => state.product);

    const onSelect = (event) => {
        select(event.target.textContent - 1);
    };

    return (
        <div className="paginate-guest py-3 mt-5">
            <div className="paginate-content d-flex justify-content-center align-items-center">
                <div className="row m-0">
                    <div className="col-auto">
                        <div className="page-number d-flex justify-content-center align-items-center">
                            <div className="page-number-btn">
                                <div className="btn" onClick={prev}>
                                    <span className="d-flex justify-content-center align-items-center">
                                        <FiChevronLeft fontSize={16} />
                                    </span>
                                </div>
                            </div>
                            {p.first !== true && (
                                <>
                                    {p.last === true && (
                                        <div className="page-number-btn" onClick={onSelect}>
                                            <div className="btn">{p.number - 1}</div>
                                        </div>
                                    )}
                                    <div className="page-number-btn" onClick={onSelect}>
                                        <div className="btn">{p.number}</div>
                                    </div>
                                </>
                            )}
                            <div
                                className="page-number-btn"
                                style={{ border: "2px solid #1e96e6" }}
                            >
                                <div className="btn" style={{ color: "#1e96e6" }}>
                                    {p.number + 1}
                                </div>
                            </div>
                            {p.last !== true && (
                                <>
                                    <div className="page-number-btn" onClick={onSelect}>
                                        <div className="btn">{p.number + 2}</div>
                                    </div>
                                    {p.first == true && (
                                        <div className="page-number-btn" onClick={onSelect}>
                                            <div className="btn">{p.number + 3}</div>
                                        </div>
                                    )}
                                </>
                            )}

                            <div className="page-number-btn">
                                <div className="btn" onClick={next}>
                                    <span className="d-flex justify-content-center align-items-center">
                                        <FiChevronRight fontSize={16} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaginateGuest;
