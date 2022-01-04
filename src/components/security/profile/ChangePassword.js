import React, { useEffect, useState } from "react";
import { BiShow } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileService from "../../../services/guestservice/ProfileService";
import LoginService from "../../../services/loginservice/LoginService";
import Noti, { NotiError, NotiSuccess } from "../../noti/Noti";

const ChangePassword = () => {
    const auth = useSelector((state) => state.auth);
    // const dispatch = useDispatch();

    const [currentProfile, setCurrentProfile] = useState({
        username: "",
        email: "",
        fullName: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [success, setSuccess] = useState(false);

    const [showPass, setShowPass] = useState({
        currentP: false,
        newP: false,
        confirmP: false,
    });

    const renProfile = () => {
        setCurrentProfile({
            username: auth ? auth.username : "",
            email: auth ? auth.email : "",
            fullName: auth ? auth.fullName : "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    const show = (passType) => {
        return passType === "currentP"
            ? setShowPass({
                  ...showPass,
                  currentP: !showPass.currentP,
              })
            : passType === "newP"
            ? setShowPass({
                  ...showPass,
                  newP: !showPass.newP,
              })
            : passType === "confirmP"
            ? setShowPass({
                  ...showPass,
                  confirmP: !showPass.confirmP,
              })
            : null;
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setCurrentProfile({
            ...currentProfile,
            [name]: value,
        });
    };

    const change = () => {
        if (checkValidate) {
            if (checkConfirm) {
                LoginService.login(currentProfile.username, currentProfile.currentPassword).then(
                    (response) => {
                        if (response.status === 500) {
                            setCurrentProfile({
                                ...currentProfile,
                                currentPassword: "",
                                newPassword: "",
                                confirmPassword: "",
                            });
                            NotiError("Lỗi xác nhận tài khoản!");
                        } else if (response.status === 200) {
                            ProfileService.changePassword(
                                currentProfile.currentPassword,
                                currentProfile.newPassword
                            );
                            setCurrentProfile({
                                ...currentProfile,
                                currentPassword: "",
                                newPassword: "",
                                confirmPassword: "",
                            });
                            NotiSuccess("Thay đổi mật khẩu thành công!");
                        }
                    }
                );
            }
            if (!checkConfirm) {
                NotiError("Xác nhận mật khẩu không chính xác!");
            }
        }
        if (!checkValidate) {
            NotiError("Yêu cầu nhập đủ dữ liệu!");
        }
    };

    const checkValidate = () => {
        return (
            currentProfile.newPassword !== "" &&
            currentProfile.newPassword !== "" &&
            currentProfile.confirmPassword !== ""
        );
    };

    const checkConfirm = () => {
        return currentProfile.newPassword === currentProfile.confirmPassword;
    };

    useEffect(() => {
        renProfile();
    }, [auth]);

    return (
        <div className="px-4">
            <div className="title pb-3">
                <h4>Đổi mật khẩu</h4>
                <small>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</small>
                <Noti />
            </div>
            <div className="content-info mt-4">
                <div className="row m-0">
                    <div className="col-10 left-content">
                        <div className="row d-flex align-items-center username pt-4">
                            <div className="col-4 label">
                                <label htmlFor="currentP">Mật khẩu hiện tại</label>
                            </div>
                            <div
                                className="col-8 content d-flex align-items-center"
                                style={{
                                    position: "relative",
                                    paddingRight: "0",
                                }}
                            >
                                <input
                                    type={showPass.currentP ? "text" : "password"}
                                    id="currentP"
                                    value={currentProfile.currentPassword}
                                    name="currentPassword"
                                    onChange={onChange}
                                />
                                <Link
                                    to="#"
                                    style={{
                                        position: "absolute",
                                        right: "0",
                                        borderLeft: "1px solid #e4e4e4",
                                        padding: "0 10px",
                                    }}
                                    name="currentP"
                                    onClick={() => show("currentP")}
                                >
                                    <div className="btn">
                                        <BiShow />
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="row d-flex align-items-center username pt-4">
                            <div className="col-4 label">
                                <label htmlFor="newP">Mật khẩu mới</label>
                            </div>
                            <div
                                className="col-8 content d-flex align-items-center"
                                style={{
                                    position: "relative",
                                    paddingRight: "0",
                                }}
                            >
                                <input
                                    type={showPass.newP ? "text" : "password"}
                                    id="newP"
                                    value={currentProfile.newPassword}
                                    name="newPassword"
                                    onChange={onChange}
                                />
                                <Link
                                    to="#"
                                    style={{
                                        position: "absolute",
                                        right: "0",
                                        borderLeft: "1px solid #e4e4e4",
                                        padding: "0 10px",
                                    }}
                                    name="newP"
                                    onClick={() => show("newP")}
                                >
                                    <div className="btn">
                                        <BiShow />
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="row d-flex align-items-center username pt-4">
                            <div className="col-4 label">
                                <label htmlFor="confirmP">Nhập lại mật khẩu mới</label>
                            </div>
                            <div
                                className="col-8 content d-flex align-items-center"
                                style={{
                                    position: "relative",
                                    paddingRight: "0",
                                }}
                            >
                                <input
                                    type={showPass.confirmP ? "text" : "password"}
                                    id="confirmP"
                                    value={currentProfile.confirmPassword}
                                    name="confirmPassword"
                                    onChange={onChange}
                                />
                                <Link
                                    to="#"
                                    style={{
                                        position: "absolute",
                                        right: "0",
                                        borderLeft: "1px solid #e4e4e4",
                                        padding: "0 10px",
                                    }}
                                    name="confirmP"
                                    onClick={() => show("confirmP")}
                                >
                                    <div className="btn">
                                        <BiShow />
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="row d-flex align-items-center justify-content-end pt-4">
                            {/* <div className="col-4"></div> */}
                            <div className="col-8" style={{ paddingRight: "0" }}>
                                {
                                    <Link to="#" className="save-btn col-6" onClick={change}>
                                        <div className="btn">Xác nhận</div>
                                    </Link>
                                }
                                <Link to="#" style={{ float: "right" }}>
                                    <div className="btn border-0 forget-btn px-0">
                                        Quên mật khẩu?
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
