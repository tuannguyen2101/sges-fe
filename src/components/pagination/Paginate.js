import React from "react";
import { Link } from "react-router-dom";
import "./css/pagination.css";

// const { pageNumber, pageSize, first, last, setPageNumber, setPageSize } = useContext(PageContext)

const prevOnClick = () => {
    // if (first === false) {
    //     setPageNumber(pageNumber - 1)
    // }
};

const nextOnClick = () => {
    // if (last === false) {
    //     setPageNumber(pageNumber + 1)
    // }
};

const onChangePageSize = (event: any) => {
    // setPageSize(event.target.value as number)
};

const Paginate = () => {
    return (
        <div className="paginate-footer">
            <div className="pagination row d-flex align-items-center">
                <div className="col">
                    Hiển thị
                    <select className="col pageSize mx-3" onChange={onChangePageSize}>
                        <option key={5} value="5">
                            5
                        </option>
                        <option key={10} value="10">
                            10
                        </option>
                        <option key={15} value="15">
                            15
                        </option>
                    </select>
                    bản ghi
                </div>
                <div className="pageNumber col-auto">
                    <Link to="#">
                        <div className="btn btn-control" onClick={prevOnClick}>
                            Previous
                        </div>
                    </Link>

                    <Link to="#">
                        <div className="btn">1</div>
                    </Link>
                    <Link to="#">
                        <div className="btn">2</div>
                    </Link>
                    <Link to="#">
                        <div className="btn btn-control">3</div>
                    </Link>
                    <Link to="#">
                        <div className="btn">4</div>
                    </Link>
                    <Link to="#">
                        <div className="btn">5</div>
                    </Link>
                    <Link to="#">
                        <div className="btn btn-control" onClick={nextOnClick}>
                            Next
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Paginate;
