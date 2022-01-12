import axios from "axios";
import React, { useEffect, useState } from "react";
import { defaults, Line, Doughnut } from "react-chartjs-2";
import "./thongke.css";

defaults.global.tooltips.enabled = true;
defaults.global.legend.position = "bottom";

// THống kê số lượng sản phẩm theo tên
// Thống kê doanh thu theo tháng

export default function Piechart() {
    const [data, setData] = useState([]);
    const [dataYears, setDataYears] = useState([]);

    const getProduct = () => {
        let namePro = [];
        let quantityPro = [];
        axios
            .get("http://localhost:8080/thongKe/currentProduct")
            .then((res) => {
                const products = res.data;
                products.forEach((element) => {
                    namePro.push(element[0]);
                    quantityPro.push(element[1]);
                });
                setData({
                    labels: namePro,
                    datasets: [
                        {
                            label: "# of votes",
                            data: quantityPro,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 206, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                            ],
                            borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)",
                            ],
                            borderWidth: 1,
                        },
                        // {
                        //   label: 'Quantity',
                        //   data: [47, 52, 67, 58, 9, 50],
                        //   backgroundColor: 'orange',
                        //   borderColor: 'red',
                        // },
                    ],
                });
            })

            .catch((err) => {
                console.log(err);
            });
    };

    const getDataYears = () => {
        let nameYears = [];
        let salaryYears = [];
        axios
            .get("http://localhost:8080/thongKe/getTotal")
            .then((res) => {
                const products = res.data;
                products.forEach((element) => {
                    nameYears.push("Năm " + element[0]);
                    salaryYears.push(element[1]);
                });
                setDataYears({
                    labels: nameYears,
                    datasets: [
                        {
                            label: "# Doanh Số",
                            data: salaryYears,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 206, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                            ],
                            borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                });
            })

            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getProduct();
        getDataYears();
    }, []);

    return (
        <div className="chart">
            <p className="chart1">
                {/* <h3 className="chartTitle"> Sales Analytics</h3> */}
                <Line
                    data={dataYears}
                    options={{
                        title: {
                            display: true,
                            text: "Thống kê doanh thu theo năm ",
                            fontSize: 20,
                        },
                        legend: {
                            labels: {
                                fontSize: 10,
                            },
                            display: true,
                            // position:'right'
                        },
                    }}
                />
            </p>
            <p className="chart2">
                {/* <h3 className="chartTitle">Sales Analytics</h3> */}
                <Doughnut
                    data={data}
                    options={{
                        title: {
                            display: true,
                            text: "Thống kê top 5 sản phẩm bán chạy nhất",
                            fontSize: 20,
                        },
                        legend: {
                            display: true,
                            // position:'right'
                        },
                    }}
                />
            </p>
        </div>
    );
}
