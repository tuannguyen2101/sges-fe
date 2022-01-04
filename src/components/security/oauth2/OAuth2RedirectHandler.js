import React, { Component } from "react";
import { Navigate, Redirect } from "react-router-dom";

class OAuth2RedirectHandler extends Component {
    render() {
        const url = window.location;
        const token = new URLSearchParams(url.search).get("token");
        if (token) {
            localStorage.setItem("token", token);
        }
        return <Navigate to="/" />;
    }
}

export default OAuth2RedirectHandler;
