import React, { useEffect, useState } from "react";
import { BiShow } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ForgotPasswordService from "../../../services/loginservice/ForgotPasswordService";
import Noti, { NotiError, NotiSuccess } from "../../noti/Noti";


const ForgotPassword = () => {

    const auth = useSelector((state) => state.auth);
    const [forgotPass, setForgotPass] = useState({
        email: "",
    });

    const [success, setSuccess] = useState(false);



    const renProfile = () => {
        setForgotPass({

            email: auth ? auth.email : "",
            email: "",
        });
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setForgotPass({
            ...forgotPass,
            [name]: value,
        });
    };
  
    const changepass = () => {
      
        if (checkEmail(forgotPass.email)) {
                ForgotPasswordService.forgotpassword(forgotPass.email).then(
                    (response) => {
                        if (response.status === 500) {
                            setForgotPass({
                                ...forgotPass,
                                email: "",

                            });
                            NotiError("Lỗi xác nhận tài khoản!");
                        } else if (response.status === 200) {
                            ForgotPasswordService.forgotpassword(
                                forgotPass.email

                            );
                            setForgotPass({
                                ...forgotPass,
                                email: "",

                            });
                            NotiSuccess("Thay đổi mật khẩu thành công vui lòng check mail!");
                        }
                        else if (response.status === 304) {
                            ForgotPasswordService.forgotpassword(
                                forgotPass.email

                            );
                            setForgotPass({
                                ...forgotPass,
                                email: "",

                            });
                            NotiSuccess("Thay đổi mật khẩu thành công vui lòng check mail!");
                        }
                    }

                );


            
        };
    };


    const checkEmail = (email) => {
        
        if (email == "") {
            NotiError("Không được để trống các ô dữ liệu");
            return false;
        }else if (email.length < 5) {
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

    };

    useEffect(() => {
        renProfile();
    }, [auth]);

    return (
        <div class="modal-body">
            <div className="login p-5">
                <div className="container d-flex justify-content-center">
                    <div className="card col-5">
                        <div className="p-4">
                            <div className="login-title mb-3 text-center">
                                <span>Quên mật khẩu</span>
                            </div>

                            <div className="login-field my-4 px-4">

                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="email của bạn"
                                        value={forgotPass.email}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="login-btn">
                                    <Link to="#" className="save-btn col-6" onClick={changepass}>
                                        <div className="btn signup">Xác nhận</div>
                                    </Link>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ForgotPassword;