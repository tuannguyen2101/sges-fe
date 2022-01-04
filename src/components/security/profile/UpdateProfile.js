import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import avatar from "../../../img/avatar.png";
import ProfileService from "../../../services/guestservice/ProfileService";
import { UPDATE_PROFILE } from "./../../../constants/constants";

const UpdateProfile = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [currentProfile, setCurrentProfile] = useState({
        username: "",
        email: "",
        fullName: "",
        photo: "",
    });

    const [success, setSuccess] = useState(false);

    const renProfile = () => {
        setCurrentProfile({
            username: auth ? auth.username : "",
            email: auth ? auth.email : "",
            fullName: auth ? auth.fullName : "",
            photo: auth ? auth.photo : "",
        });
    };

    const update = () => {
        ProfileService.updateProfile(currentProfile)
            .then((response) => response.text())
            .then((result) => {
                let profile = JSON.parse(result);
                if (profile.message) {
                    alert("Error: " + profile.message);
                } else {
                    dispatch({ type: UPDATE_PROFILE, profile });
                    setSuccess(true);
                    alert("Update profile Successful!");
                }
            })
            .catch((error) => console.log("error", error));
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setCurrentProfile({
            ...currentProfile,
            [name]: value,
        });
    };

    useEffect(() => {
        renProfile();
    }, [auth]);

    return (
        <div className="px-4">
            <div className="title pb-3">
                <h4>Hồ sơ của tôi</h4>
                <small>Quản lý thông tin hồ sơ để bảo mật tài khoản</small>
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
                                <span>{currentProfile.username}</span>
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
                                <input
                                    type="text"
                                    id="fullname"
                                    value={currentProfile.fullName}
                                    name="fullName"
                                    onChange={onChange}
                                />
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
                                <input
                                    type="email"
                                    id="email"
                                    value={currentProfile.email}
                                    name="email"
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                        <div className="row d-flex align-items-center pt-4">
                            <div className="col-4 label"></div>
                            <div className="col-8" style={{ paddingRight: "0" }}>
                                {auth.fullName !== currentProfile.fullName ||
                                auth.email !== currentProfile.email ? (
                                    <Link to="#" className="save-btn" onClick={update}>
                                        <div className="btn">Lưu</div>
                                    </Link>
                                ) : (
                                    <Link
                                        to="#"
                                        className="save-btn"
                                        style={{
                                            backgroundColor: "ButtonFace",
                                            cursor: "default",
                                        }}
                                    >
                                        <div className="btn disabled text-dark">Lưu</div>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 right-content d-grid justify-content-center align-items-center">
                        <div className="text-center d-flex align-items-center justify-content-center avatar">
                            <img
                                src={auth && auth.photo ? auth.photo : avatar}
                                className="img-fluid"
                                alt="avatar"
                            />
                        </div>
                        <div className="text-center">
                            <span>Hình ảnh đại diện</span>
                        </div>
                        {/* <div className="text-center d-flex align-items-center justify-content-center avatar">
                            <label htmlFor="file" className="btn border-0 p-0">
                                <img
                                    src={auth.photo}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = auth.photo;
                                    }}
                                    className="img-fluid"
                                    alt="avatar"
                                />
                            </label>
                        </div>
                        <div className="text-center">
                            <input
                                type="file"
                                id="file"
                                accept="image/*"
                                name="photo"
                                onChange={onChange}
                            />
                            <label htmlFor="file" className="btn">
                                Chọn ảnh
                            </label>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
