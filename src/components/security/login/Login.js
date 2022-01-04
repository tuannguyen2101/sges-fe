import { Component } from "react";
import { connect } from "react-redux";
import googleLogo from "../../../img/google.png";
import LoginService from "../../../services/loginservice/LoginService";
import "./../../../css/login.scss";

import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Noti, { NotiError, NotiSuccess } from "../../noti/Noti";
import { setAuth } from "../../../actions";
import { Navigate } from "react-router-dom";
import PrivateRoute from "../../staff/PrivateRoute";

const Login = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [account, setAccount] = useState({
        username: "",
        password: "",
    });

    const onChangeHand = (event) => {
        setAccount({
            ...account,
            [event.target.name]: event.target.value,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (checkForm(account.username, account.password)) {
            LoginService.login(account.username, account.password)
                .then((response) => {
                    if (response.status === 200) {
                        NotiSuccess("Bạn đã đăng nhập vào SGES!");
                    } else {
                        NotiError("Tài khoản hoặc mật khẩu khong chính xác!");
                    }
                    return response.text();
                })
                .then((result) => {
                    localStorage.setItem("token", result);
                    var myHeaders = new Headers();
                    myHeaders.append("Authorization", "Bearer " + result);
                    myHeaders.append("Cookie", "JSESSIONID=C6B69B1366935F0C4E7CCAC8732291BA");

                    var requestOptions = {
                        method: "GET",
                        headers: myHeaders,
                        redirect: "follow",
                    };

                    fetch("http://localhost:8080/getProfile", requestOptions)
                        .then((response) => response.text())
                        .then((result) => {
                            console.log(result);
                            let user = JSON.parse(result);
                            let auth = {
                                id: user.id,
                                username: user.username,
                                fullName: user.fullName,
                                email: user.email,
                                photo: user.photo,
                                roles: user.roles,
                            };
                            dispatch(setAuth(auth));
                            console.log("auth", auth);
                        })
                        .catch((error) => {
                            NotiError("Tài khoản hoặc mật khẩu không chính xác!");
                        });
                })
                .catch((error) => {
                    NotiError("Tài khoản hoặc mật khẩu không chính xác!");
                });
        }
    };

    const checkForm = (username, password) => {
        if (username !== "" && password !== "") {
            return true;
        } else {
            NotiError("Username và Pasword không được để trống ");
            return false;
        }
    };

    return auth ? (
        <Navigate to="/" />
    ) : (
        <div className="login p-5">
            <Noti />
            <div className="container d-flex justify-content-center">
                <div className="card col-5">
                    <div className="p-4">
                        <div className="login-title mb-3 text-center">
                            <span>Đăng nhập</span>
                        </div>
                        <div className="login-text my-3 px-4 text-center">
                            <p>
                                Nếu đã từng mua hàng trên Website trước đây, bạn có thể đăng nhập để
                                truy cập tài khoản bằng email nhé
                            </p>
                        </div>
                        <div className="login-field my-4 px-4">
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="Username/Email của bạn"
                                        onChange={onChangeHand}
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Mật khẩu"
                                        onChange={onChangeHand}
                                    />
                                </div>
                                <div className="login-btn">
                                    <button className="btn w-100 form-control">
                                        <span>Đăng nhập</span>
                                    </button>
                                </div>
                                <div className="my-3 text-center">
                                    <span>Hoặc</span>
                                </div>
                                <div className="login-btn-gloogle">
                                    <a href="http://localhost:8080/oauth2/authorize/google">
                                        <div className="btn w-100 form-control">
                                            <span>Đăng nhập với Gooogle</span>
                                            <img src={googleLogo} alt="" width="30px" />
                                        </div>
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
