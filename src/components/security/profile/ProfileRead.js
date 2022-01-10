import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import avatar from "../../../img/avatar.png";
import Login from "../login/Login";

const ProfileRead = () => {
    const auth = useSelector((state) => state.auth);

    const [currentProfile, setCurrentProfile] = useState({
        username: auth ? auth.username : "",
        fullName: auth ? auth.fullName : "",
        email: auth ? auth.email : "",
        // Tên file
        photo: auth ? auth.photo : "",
    });

    return !auth ? (
        <Login />
    ) : (
        <div className="px-4">
            <div className="title pb-3">
                <h4>Hồ sơ của tôi</h4>
                <small>Thông tin hồ sơ</small>
            </div>
            <div className="content-info mt-4">
                <div className="row m-0">
                    <div className="col-8 left-content">
                        <div className="row d-flex align-items-center username pt-4">
                            <div className="col-4 label">
                                <label htmlFor="username">Tên đăng nhập</label>
                            </div>
                            <div
                                className="col-8 content d-flex align-items-center"
                                style={{
                                    position: "relative",
                                    paddingRight: "0",
                                }}
                            >
                                <span>{auth.username}</span>
                            </div>
                        </div>
                        <div className="row d-flex align-items-center fullname pt-4">
                            <div className="col-4 label">
                                <label htmlFor="fullname">Họ và tên</label>
                            </div>
                            <div
                                className="col-8 content d-flex align-items-center"
                                style={{
                                    position: "relative",
                                    paddingRight: "0",
                                }}
                            >
                                <span>{auth.fullName}</span>
                            </div>
                        </div>
                        <div className="row d-flex align-items-center email pt-4">
                            <div className="col-4 label">
                                <label htmlFor="email">Email</label>
                            </div>
                            <div
                                className="col-8 content d-flex align-items-center"
                                style={{
                                    position: "relative",
                                    paddingRight: "0",
                                }}
                            >
                                <span>{auth.email}</span>
                            </div>
                        </div>
                        <div className="row d-flex align-items-center pt-4">
                            <div className="col-4 label"></div>
                            <div className="col-8" style={{ paddingRight: "0" }}>
                                <Link
                                    to={"/myprofile/" + auth.username + "/update"}
                                    className="save-btn"
                                >
                                    <div className="btn">Chỉnh sửa</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 right-content d-grid justify-content-center align-items-center">
                        <div className="text-center d-flex align-items-center justify-content-center avatar">
                            <img
                                src={"http://localhost:8080/file/read/" + auth.photo}
                                className="img-fluid"
                                alt="avatar"
                            />
                        </div>
                        <div className="text-center">
                            <span>Hình ảnh đại diện</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileRead;
