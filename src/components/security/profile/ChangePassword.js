import React, { useEffect, useState } from "react";
import { BiShow } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileService from "../../../services/guestservice/ProfileService";
import LoginService from "../../../services/loginservice/LoginService";
import Noti, { NotiError, NotiInfo, NotiSuccess } from "../../noti/Noti";

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
                            NotiError("L???i x??c nh???n t??i kho???n!");
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
                            NotiSuccess("Thay ?????i m???t kh???u th??nh c??ng!");
                        }
                    }
                );

            }
            // if (!checkConfirm(currentProfile.newPassword, currentProfile.confirmPassword)) {
            return NotiError("X??c nh???n m???t kh???u kh??ng ch??nh x??c!");

            // }
        }
        // if (!checkValidate) {
        return NotiError("Y??u c???u nh???p ????? d??? li???u!");
        // }
    };

    const checkValidate = (o, n, c) => {
        return o !== "" && n !== "" && c !== "";
    };

    const checkConfirm = (n, c) => {
        return n === c;
    };

    useEffect(() => {
        renProfile();
    }, [auth]);

    return (
        <div className="px-4">
            <div className="title pb-3">
                <h4>?????i m???t kh???u</h4>
                <small>????? b???o m???t t??i kho???n, vui l??ng kh??ng chia s??? m???t kh???u cho ng?????i kh??c</small>
            </div>
            <div className="content-info mt-4">
                <div className="row m-0">
                    <div className="col-10 left-content">
                        <div className="row d-flex align-items-center username pt-4">
                            <div className="col-4 label">
                                <label htmlFor="currentP">M???t kh???u hi???n t???i</label>
                            </div>
                            <div
                                className="col-8 info-content d-flex align-items-center"
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
                                <label htmlFor="newP">M???t kh???u m???i</label>
                            </div>
                            <div
                                className="col-8 info-content d-flex align-items-center"
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
                                <label htmlFor="confirmP">Nh???p l???i m???t kh???u m???i</label>
                            </div>
                            <div
                                className="col-8 info-content d-flex align-items-center"
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
                                        <div className="btn">X??c nh???n</div>
                                    </Link>
                                }
                                <Link to="#" style={{ float: "right" }}>
                                    <div className="btn border-0 forget-btn px-0">
                                        Qu??n m???t kh???u?
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
