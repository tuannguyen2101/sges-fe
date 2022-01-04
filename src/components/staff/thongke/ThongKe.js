import React from "react";
import { Link } from "react-router-dom";
import Linechart from "./Linechart";
import Piechart from "./Piechart";
import "./thongke.css";

export default function ThongKe() {
    return (
        <div>
            <h3 className="dashboard">Dashboard</h3>
            <Linechart></Linechart>
            <Link to="/admin/theothang">
                <h4 className="chi">Chi tiết doanh thu theo tháng</h4>
            </Link>
            <Piechart></Piechart>
        </div>
    );
}
