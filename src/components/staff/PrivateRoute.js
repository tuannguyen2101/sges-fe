import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Sges from "../guest/Sges";
import Login from "../security/login/Login";
import Dashboard from "./Dashboard";

export default function PrivateRoute() {
    const auth = useSelector((state) => state.auth);
    return auth ? <Outlet /> : <Login />;
}
