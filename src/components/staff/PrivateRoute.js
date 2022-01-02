import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Sges from "../guest/Sges";
import Dashboard from "./Dashboard";

export default function PrivateRoute() {
    const auth = useSelector((state) => state.auth);
    return auth ? <Outlet /> : <Navigate to="/login" />;
}
