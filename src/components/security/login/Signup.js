import React, { useEffect, useState } from "react";
import { BiShow } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SignupService from "../../../services/loginservice/SignupService";
// import ProfileService from "../../../services/guestservice/ProfileService";
// import LoginService from "../../../services/loginservice/LoginService";
import Noti, { NotiError, NotiSuccess } from "../../noti/Noti";


const Signup = () => {
    const auth = useSelector((state) => state.auth);
    const [signup, setSignup] = useState({
        username: "",
        password: "",
        fullName: "",
        email: "",
        photo: "",

    });

    const [success, setSuccess] = useState(false);


    const renProfile = () => {
        setSignup({
            username: auth ? auth.username : "",
            password: auth ? auth.password : "",
            fullName: auth ? auth.fullName : "",
            email: auth ? auth.email : "",
            photo: auth ? auth.photo : "",

            username: "",
            password: "",
            fullName: "",
            email: "",
            photo: "",
        });
    };



    const onChange = (event) => {
        const { name, value } = event.target;
        setSignup({
            ...signup,
            [name]: value,
            // [text]:value,
        });
    };
    const checkForm = (username, email, fullName, password) => {
debugger
       if (username == "" && email == "" && fullName == "" && password == "" ) {
            NotiError("Không được để trống các ô dữ liệu");
            return false;
        } else if (username.length < 6) {
            NotiError("Username phải dài ít nhất 6 ký tự");
            return false;
        }
        else if (email.length < 5) {
            NotiError("Email phải dài ít nhất 5 ký tự");
            return false;
        }
        else if (email.split("").filter(x => x === "@").length !== 1) {
            NotiError("Email phải chứa @");
            return false;
        }
        else if (email.indexOf(".") === -1) {
            NotiError("Email phải chứa ít nhất một dấu chấm");
            return false;
        }
        else if (password.length < 6) {
            NotiError("Mật khẩu phải dài ít nhất 6 ký tự");
            return false;
        }

    };
    const checkEmail = (username, email, password) => {
        // return !username.length < 6 || !email.length < 5 || email.includes("@") || email.includes(".") || !password.length < 6;
        if (username.length < 6) {
            NotiError("Username phải dài ít nhất 6 ký tự");
            return false;
        }
        if (email.length < 5) {
            NotiError("Email phải dài ít nhất 5 ký tự");
            return false;
        }
        if (email.split("").filter(x => x === "@").length !== 1) {
            NotiError("Email phải chứa @");
            return false;
        }
        if (email.indexOf(".") === -1) {
            NotiError("Email phải chứa ít nhất một dấu chấm");
            return false;
        }
        if (password.length < 6) {
            NotiError("Mật khẩu phải dài ít nhất 6 ký tự");
            return false;
        }
    };
    const change = () => {
        // if (checkEmail(signup.username, signup.email, signup.password)) {
        //     console.log(signup.username, signup.email, signup.password);
        if (checkForm(signup.username, signup.email, signup.fullName, signup.password)) {
          
            SignupService.signup(signup.username, signup.password, signup.fullName, signup.email, signup.photo).then(
                (response) => {
                    if (response.status === 500) {
                        setSignup({
                            ...signup,
                            username: "",
                            email: "",
                            fullName: "",
                            password: "",
                            photo: "",
                        });
                        NotiError("Đăng kí tài khoản thất bại!");
                    } else if (response.status === 200) {

                        setSignup({
                            ...signup,
                            username: "",
                            email: "",
                            fullName: "",
                            password: "",
                            photo: "",
                        });
                        NotiSuccess("Đăng kí tài khoản thành công!");
                    }
                    else if (response.status === 400) {

                        setSignup({
                            ...signup,
                            username: "",
                            email: "",
                            fullName: "",
                            password: "",
                            photo: "",
                        });
                        NotiError("Đăng kí tài khoản thất bại!");
                    }
                }
            );

            // };
        };
    };



    useEffect(() => {
        renProfile();
    }, [auth]);



    return (
        <section id="addJE">


            <div className="login p-5">
                <div className="container d-flex justify-content-center">
                    <div className="card col-5">
                        <div className="p-4">
                            <div className="login-title mb-3 text-center">
                                <span>Đăng kí</span>
                            </div>

                            <div className="login-field my-4 px-4">

                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="fullName"
                                        className="form-control"
                                        placeholder="fullname "
                                        value={signup.fullName}
                                        onChange={onChange}

                                    />
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="username "
                                        value={signup.username}
                                        onChange={onChange}

                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="email "
                                        value={signup.email}
                                        onChange={onChange}

                                    />
                                    <input
                                        type="text"
                                        name="photo"
                                        className="form-control"
                                        placeholder="photo "
                                        value={signup.photo}
                                        onChange={onChange}

                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="password"
                                        value={signup.password}
                                        onChange={onChange}

                                    />
                                </div>
                                <div className="login-btn">
                                    {/* <button className="btn w-100 form-control"> */}
                                    <Link to="#" className="save-btn col-6" onClick={change}>
                                        <div className="btn signup">Đăng kí</div>
                                    </Link>
                                    {/* </button> */}
                                </div>


                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signup;