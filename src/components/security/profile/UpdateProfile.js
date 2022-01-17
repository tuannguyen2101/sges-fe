import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setAuth } from "../../../actions";
import avatar from "../../../img/avatar.png";
import ProfileService from "../../../services/guestservice/ProfileService";
import { NotiError, NotiSuccess, NotiWarring } from "../../noti/Noti";
import Login from "../login/Login";

const UpdateProfile = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [currentProfile, setCurrentProfile] = useState({
        username: auth ? auth.username : "",
        fullName: auth ? auth.fullName : "",
        email: auth ? auth.email : "",
        // Tên file
        photo: auth ? auth.photo : "",
    });

    //hiển thị hình ảnh blob
    const [currentImage, setCurrentImage] = useState("");

    // file ảnh Buffer
    const [file, setFile] = useState(null);

    const update = () => {
        if (currentProfile !== null) {
            let { username, email, fullName } = currentProfile;
            if ((username.length > 0 && email.length > 0, fullName.length > 0)) {
                ProfileService.updateProfile(currentProfile)
                    .then((response) => response.json())
                    .then((result) => {
                        if (result.message) {
                            NotiError(result.message);
                        } else {
                            if (file !== null) {
                                upload();
                            }
                            let newAuth = {
                                id: auth.id,
                                username: auth.username,
                                fullName: currentProfile.fullName,
                                email: currentProfile.email,
                                photo: currentProfile.photo,
                                roles: auth.roles,
                            };
                            dispatch(setAuth(newAuth));
                            NotiSuccess("Cập nhật tài khoản thành công!");
                        }
                    })
                    .catch((error) => console.log("error", error));
            } else {
                NotiWarring("Thông tin không được để trống!");
            }
        }
    };

    const upload = () => {
        var data = new FormData();
        data.append("files", file);

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };

        axios
            .post("http://localhost:8080/file/save", data, config)
            .then((res) => console.log(res))
            .catch((err) => {
                console.log(err);
            });
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setCurrentProfile({
            ...currentProfile,
            [name]: value,
        });
    };

    const onChangeImage = (event) => {
        const { name, value } = event.target;
        if (event.target.files[0] !== undefined) {
            if (event.target.files[0].type.includes("image")) {
                setCurrentProfile({
                    ...currentProfile,
                    photo: event.target.files[0].name,
                });
                setCurrentImage(URL.createObjectURL(event.target.files[0]));
                setFile(event.target.files[0]);
            }
        }
    };

    return !auth ? (
        <Login />
    ) : (
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
                                className="col-8 info-content d-flex align-items-center"
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
                                <label htmlFor="fullName">Họ và tên</label>
                            </div>
                            <div
                                className="col-8 info-content d-flex align-items-center"
                                style={{
                                    position: "relative",
                                    paddingRight: "0",
                                }}
                            >
                                <input
                                    type="text"
                                    id="fullName"
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
                                className="col-8 info-content d-flex align-items-center"
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
                                {currentProfile ? (
                                    auth.fullName !== currentProfile.fullName ||
                                    auth.email !== currentProfile.email ||
                                    auth.photo !== currentProfile.photo ? (
                                        <Link
                                            to={"/user/" + currentProfile.username}
                                            className="save-btn"
                                            onClick={update}
                                        >
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
                                    )
                                ) : null}
                                {currentProfile ? (
                                    <Link className="mx-3" to={"/user/" + auth.username}>
                                        <div className="btn">Hủy</div>
                                    </Link>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="col-4 right-content d-grid justify-content-center align-items-center">
                        <div className="text-center d-flex align-items-center justify-content-center avatar">
                            <label htmlFor="file" className="btn border-0 p-0">
                                <img
                                    src={
                                        file !== null
                                            ? currentImage
                                            : auth.photo.includes("http")
                                            ? auth.photo
                                            : "http://localhost:8080/file/read/" +
                                              currentProfile.photo
                                    }
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
                                onChange={onChangeImage}
                            />
                            <label htmlFor="file" className="btn">
                                Chọn ảnh
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
