import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../css/paginate/pagination.scss";

const Paginate = (props) => {
    const page = useSelector((state) => state.category);

    const {
        thisPageProps,
        prevOnClickProps,
        nextOnClickProps,
        onChangePageSizeProps,
        selectPageProps,
    } = props;

    const onChangePageSize = (event) => {
        onChangePageSizeProps(event.target.value);
    };

    const selectPage = (event) => {
        selectPageProps(event.target.textContent - 1);
    };

    return (
        <div className="paginate-footer">
            <div className="pagination row d-flex align-items-center">
                <div className="col-6 d-flex-center">
                    <span>Hiển thị tối đa</span>
                    <select
                        className="col-3 pageSize mx-3"
                        onChange={onChangePageSize}
                        value={thisPageProps.size}
                    >
                        <option key={5} value="5">
                            5
                        </option>
                        <option key={10} value="10">
                            10
                        </option>
                        <option key={20} value="20">
                            20
                        </option>
                        <option key={30} value="30">
                            30
                        </option>
                    </select>
                    <span>bản ghi</span>
                </div>
                <div className="pageNumber col-6 text-end d-flex-center">
                    {page.first !== true ? (
                        <>
                            <Link to="#">
                                <div className="btn btn-outline-primary" onClick={prevOnClickProps}>
                                    <BsArrowLeft fontSize={16} />
                                </div>
                            </Link>
                            {page.last !== false ? (
                                <Link to="#">
                                    <div className="btn btn-outline-primary" onClick={selectPage}>
                                        {page.number - 1}
                                    </div>
                                </Link>
                            ) : null}
                            <Link to="#">
                                <div className="btn btn-outline-primary" onClick={selectPage}>
                                    {page.number}
                                </div>
                            </Link>
                        </>
                    ) : null}
                    <Link to="#">
                        <div className="btn btn-outline-primary active">{page.number + 1}</div>
                    </Link>

                    {page.last !== true ? (
                        <>
                            <Link to="#">
                                <div className="btn btn-outline-primary" onClick={selectPage}>
                                    {page.number + 2}
                                </div>
                            </Link>
                            {page.first !== false ? (
                                <Link to="#">
                                    <div className="btn btn-outline-primary" onClick={selectPage}>
                                        {page.number + 3}
                                    </div>
                                </Link>
                            ) : null}
                            <Link to="#">
                                <div className="btn btn-outline-primary" onClick={nextOnClickProps}>
                                    <BsArrowRight fontSize={16} />
                                </div>
                            </Link>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Paginate;
