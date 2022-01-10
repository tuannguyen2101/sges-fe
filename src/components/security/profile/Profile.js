import React, { useEffect, useState } from "react";
import { RiFileList3Line, RiUserLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import "../../../css/profile.scss";
import avatar from "../../../img/avatar.png";
import Login from "../login/Login";

const Profile = () => {
    const auth = useSelector((state) => state.auth);

    return !auth ? (
        <Login />
    ) : (
        <div className="profile">
            <div className="container p-0">
                <div className="row m-0 profile-layout">
                    <div className="col-3 py-3 px-0 profile-menu">
                        <div className="row m-0 d-flex pb-3 account">
                            <div className="col-4 p-0 d-flex justify-content-center align-items-center">
                                <img
                                    src={"http://localhost:8080/file/read/" + auth.photo}
                                    className="img-fluid"
                                    width="100%"
                                    alt="avatar"
                                />
                            </div>
                            <div className="col-8 p-0">
                                <div className="d-grid">
                                    <span>
                                        <b>{auth.username}</b>
                                    </span>
                                    <span>{auth.fullName}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row m-0 sub-menu mt-4">
                            <Link to={"/myprofile/" + auth.username}>
                                <div className="h-100 btn px-0 d-flex justify-content-center align-items-center">
                                    <div className="col-3 icon-submenu">
                                        <RiUserLine />
                                    </div>
                                    <div className="col-9 text-start">
                                        <span>Tài khoản của tôi</span>
                                    </div>
                                </div>
                            </Link>
                            <Link to={"/myprofile/" + auth.username + "/update"}>
                                <div className="h-100 btn d-flex justify-content-center align-items-center">
                                    <div className="col-3 icon-submenu"></div>
                                    <div className="col-9 text-start">
                                        <span>Cập nhật thông tin</span>
                                    </div>
                                </div>
                            </Link>
                            <Link to={"/myprofile/" + auth.username + "/change-password"}>
                                <div className="h-100 btn d-flex justify-content-center align-items-center">
                                    <div className="col-3 icon-submenu"></div>
                                    <div className="col-9 text-start">
                                        <span>Đổi mật khẩu</span>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/myorder">
                                <div className="h-100 btn d-flex justify-content-center align-items-center">
                                    <div className="col-3 icon-submenu">
                                        <RiFileList3Line />
                                    </div>
                                    <div className="col-9 text-start">
                                        <span>Đơn mua</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="card py-3">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
