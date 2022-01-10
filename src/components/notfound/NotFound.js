import React from "react";
import notfount from "../../img/404.jpeg";

const NotFound = ({ message, noti, text }) => {
    return (
        <div className="not-found-page py-5" style={{ backgroundColor: "#fff" }}>
            <div className="container">
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "auto" }}
                >
                    <div className="row">
                        <div className="col-4">
                            <img src={notfount} alt="404" width="100%" />
                        </div>
                        <div className="col-8">
                            <div className="message d-flex justify-content-center align-items-center h-100 flex-column text-center">
                                <span
                                    className="py-5"
                                    style={{
                                        fontSize: "64px",
                                        fontFamily: "cursive",
                                        fontWeight: "500",
                                    }}
                                >
                                    {message ? message : "AWWW... DON’T CRY."}
                                </span>
                                <span
                                    style={{
                                        fontSize: "18px",
                                        fontFamily: "cursive",
                                        fontWeight: "500",
                                    }}
                                >
                                    {noti ? noti : "It's just a 404 Error!"}
                                </span>
                                <span
                                    style={{
                                        fontSize: "18px",
                                        fontFamily: "cursive",
                                        fontWeight: "500",
                                    }}
                                >
                                    {text
                                        ? text
                                        : "What you’re looking for may have been misplaced in Long Term Memory."}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
