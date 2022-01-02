import React from "react";
import "../../css/paginate/paginateguest.scss";
// import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const PaginateGuest = () => {
    return (
        <div className="paginate-guest py-3 mt-5">
            <div className="paginate-content d-flex justify-content-center align-items-center">
                <div className="row m-0">
                    <div className="col-auto">
                        <div className="page-number d-flex justify-content-center align-items-center">
                            <div className="page-number-btn">
                                <div className="btn">
                                    <span className="d-flex justify-content-center align-items-center">
                                        <FiChevronLeft fontSize={16} />
                                    </span>
                                </div>
                            </div>
                            <div className="page-number-btn">
                                <div className="btn">1</div>
                            </div>
                            <div className="page-number-btn">
                                <div className="btn">2</div>
                            </div>
                            <div className="page-number-btn">
                                <div className="btn">3</div>
                            </div>
                            <div className="page-number-btn">
                                <div className="btn">4</div>
                            </div>
                            <div className="page-number-btn">
                                <div className="btn">5</div>
                            </div>
                            <div className="page-number-btn">
                                <div className="btn">
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
