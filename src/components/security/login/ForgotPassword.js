import React, { useEffect, useState } from "react";
import { BiShow } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ForgotPasswordService from "../../../services/loginservice/ForgotPasswordService";
import Noti, { NotiError, NotiSuccess } from "../../noti/Noti";
const ForgotPassword = () => {
    const auth = useSelector((state) => state.auth);


    const [currentProfile, setCurrentProfile] = useState({
        email: "",

    });

    const [success, setSuccess] = useState(false);



    const renProfile = () => {
        setCurrentProfile({

            email: auth ? auth.email : "",
            email: "",
        });
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setCurrentProfile({
            ...currentProfile,
            [name]: value,
        });
    };
    const checkForm = (email) => {
        if (email !== "") {
            return true;
        } else {
            NotiError("email không được để trống ");
            return false;
        }
    };
    const change = () => {
    debugger
        if (checkForm) {
            // NotiSuccess("Thay đổi mật khẩu thành công vui lòng check mail!");
            ForgotPasswordService.forgotpassword(currentProfile.email).then(
                (response) => {
                    if (response.status === 500) {
                        setCurrentProfile({
                            ...currentProfile,
                            email: "",

                        });
                        NotiError("Lỗi xác nhận tài khoản!");
                    } else if (response.status === 200) {
                        ForgotPasswordService.forgotpassword(
                            currentProfile.email

                        );
                        setCurrentProfile({
                            ...currentProfile,
                            email: "",

                        });
                        NotiSuccess("Thay đổi mật khẩu thành công vui lòng check mail!");
                    }
                    else if (response.status === 304) {
                        ForgotPasswordService.forgotpassword(
                            currentProfile.email

                        );
                        setCurrentProfile({
                            ...currentProfile,
                            email: "",

                        });
                        NotiSuccess("Thay đổi mật khẩu thành công vui lòng check mail!");
                    }
                }

            );


        };
    };
    const checkValidate = () => {
        return (
            currentProfile.email !== ""
        );
    };



    useEffect(() => {
        renProfile();
    }, [auth]);
    return (
        <div class="modal-body">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="text-center">

                            <p>If you have forgotten your password you can reset it here.</p>
                            <div class="panel-body">

                                <div class="form-group">
                                    <input class="form-control input-lg" placeholder="E-mail Address" name="email" value={currentProfile.email}

                                        onChange={onChange} type="email" />


                                </div>
                            </div>
                        </div>

                        <div className="col-8" style={{ paddingRight: "0" }}>
                            {
                                <Link to="#" className="save-btn col-6" onClick={change}>
                                    <div className="btn">Xác nhận</div>
                                </Link>
                            }
                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
}
export default ForgotPassword;