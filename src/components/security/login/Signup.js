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


    const [currentProfile, setCurrentProfile] = useState({
        username: "",
        email: "",
        fullName: "",
        
        
        password: "",
        photo: "",

    });

    const [success, setSuccess] = useState(false);


    const renProfile = () => {
        setCurrentProfile({
            username: auth ? auth.username : "",
            email: auth ? auth.email : "",
            fullName: auth ? auth.fullName : "",
            password: auth ? auth.password : "",
            photo: auth ? auth.photo : "",

            username: "",
            email: "",
            fullName: "",
            password: "",
            photo: "",
        });
    };



    const onChange = (event) => {
        const { name, value } = event.target;
        setCurrentProfile({
            ...currentProfile,
            [name]: value,
            // [text]:value,
        });
    };
    const checkForm = (username,email,fullName,password,photo) => {
        if (username!== "" && email !== "" && fullName!== "" && password !== "" && photo !== "" ) {
            return true;
        } else {
            NotiError("email không được để trống ");
            return false;
        }
    };
    const change = () => {
      if(checkForm){
        // NotiSuccess("Đăng kí tài khoản thành công!");
        SignupService.signup(currentProfile.username, currentProfile.email, currentProfile.fullName, currentProfile.password, currentProfile.photo).then(
  
            (response) => {
                if (response.status === 500) {
                    setCurrentProfile({
                        ...currentProfile,
                        username: "",
                        email: "",
                        fullName: "",
                        password: "",
                        photo: "",
                    });
                    NotiError("Đăng kí tài khoản thất bại!");
                } else if (response.status === 200) {

                    setCurrentProfile({
                        ...currentProfile,
                        username: "",
                        email: "",
                        fullName: "",
                        password: "",
                        photo: "",
                    });
                    NotiSuccess("Đăng kí tài khoản thành công!");
                }
                else if (response.status === 400) {

                    setCurrentProfile({
                        ...currentProfile,
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


    };

    };

    useEffect(() => {
        renProfile();
    }, [auth]);


    return (
        <section id="addJE">
            <div class="container p-2">
                <div class="row mt-2">
                    <div class="col-8 offset-2">
                        <hr />

                        <div class="card">
                            <div class="card-header">
                                <h3 class="text-center">ADD NEW ACCOUNT</h3>
                            </div>
                        </div>
                        <div class="from-signup1 form-group col-md-6">
                            <label for="emaild">fullname</label>
                            <div
                                className="col-8 content d-flex align-items-center"
                                style={{
                                    position: "relative",
                                    paddingRight: "0",
                                }}
                            >
                                <input
                                    class="from-signup"
                                    type="text"
                                    id="fullname"
                                    value={currentProfile.fullName}
                                    name="fullName"
                                    onChange={onChange}
                                />
                            </div>
                        </div>

             


<div class="from-signup1 form-group col-md-6">
                            <label for="emaild">passWord</label>
                            <div
                                className="col-8 content d-flex align-items-center"
                                style={{
                                    position: "relative",
                                    paddingRight: "0",
                                }}
                            >
                                <input
                                    class="from-signup"
                                    type="password"
                                    id="email"
                                    value={currentProfile.email}
                                    name="email"
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div class="from-signup1 form-group col-md-6">
                            <label for="emaild">username</label>
                            <div
                                className="col-8 content d-flex align-items-center"
                                style={{
                                    position: "relative",
                                    paddingRight: "0",
                                }}
                            >
                                <input
                                    class="from-signup"
                                    type="text"
                                    id="username"
                                    value={currentProfile.username}
                                    name="username"
                                    onChange={onChange}
                                />
                            </div>
                        </div>


                        <div class="form-group col-md-6">
                            <label for="password">email</label>
                            <input
                                class="from-signup"
                                type="email" name="password" id="password"
                                aria-describedby="passwordHid" placeholder="email" value={currentProfile.password}

                                onChange={onChange} />

                        </div>
                        <div class="from-signup1 form-group col-md-6">
                            <label for="emaild">photo</label>
                            <div
                                className="col-8 content d-flex align-items-center"
                                style={{
                                    position: "relative",
                                    paddingRight: "0",
                                }}
                            >
                                <input
                                    class="from-signup"
                                    type="text"
                                    id="photo"
                                    value={currentProfile.photo}
                                    name="photo"
                                    onChange={onChange}
                                />
                            </div>
                        </div>


                        <div className="col-8" style={{ paddingRight: "0" }}>
                            {
                                <Link to="#" className="save-btn col-6" onClick={change}>
                                    <div className="btn">Đăng kí</div>
                                </Link>
                            }
                        </div>
                    </div>
                    <div class="card-footer text-muted"></div>
                </div>


            </div>

        </section >

    );
}

export default Signup;