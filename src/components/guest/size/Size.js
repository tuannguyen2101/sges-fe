import React, { useEffect } from "react";
import "../../../css/size/size.scss";
import g from "../../../img/gay.png";
import bt from "../../../img/binhthuong.png";
import dd from "../../../img/daydan.png";
import { Link } from "react-router-dom";
import thun from "../../../img/thun.jpg";
import short from "../../../img/short.jpg";
import hoodie from "../../../img/hoodie.jpg";
import somi from "../../../img/somi.jpg";
import jogger from "../../../img/jogger.jpg";
import { useState } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { sizeThun, sizeHoodie, sizeSomi, sizeJogger, sizeShort } from "./SizeData";

const Size = () => {
    const loai = [thun, hoodie, somi, jogger, short];
    const tenLoai = ["Áo thun", "Áo hoodie", "Áo Sơ mi", "Quần Jogger", "Quần short"];

    const [sizeGoiY, setSizeGoiY] = useState(1);

    const [goiY, setGoiY] = useState({
        loai: thun,
        cao: 160,
        nang: 55,
        type: 2,
    });

    const changeCate = (event) => {
        setGoiY({
            ...goiY,
            loai: event.target.value,
        });
    };

    const sizeHandle = () => {
        if (goiY.loai === thun) {
            var sizs = sizeThun.filter((value, index) => {
                return (
                    goiY.cao > value.caoMin &&
                    goiY.cao < value.caoMax &&
                    goiY.nang > value.nangMin &&
                    goiY.nang < value.nangMax &&
                    value
                );
            })[0];
            tinhSize(sizs);
        } else if (goiY.loai === hoodie) {
            var sizs = sizeHoodie.filter((value, index) => {
                return (
                    goiY.cao > value.caoMin &&
                    goiY.cao < value.caoMax &&
                    goiY.nang > value.nangMin &&
                    goiY.nang < value.nangMax &&
                    value
                );
            })[0];
            tinhSize(sizs);
        } else if (goiY.loai === somi) {
            var sizs = sizeSomi.filter((value, index) => {
                return (
                    goiY.cao > value.caoMin &&
                    goiY.cao < value.caoMax &&
                    goiY.nang > value.nangMin &&
                    goiY.nang < value.nangMax &&
                    value
                );
            })[0];
            tinhSize(sizs);
        } else if (goiY.loai === jogger) {
            var sizs = sizeJogger.filter((value, index) => {
                return (
                    goiY.cao > value.caoMin &&
                    goiY.cao < value.caoMax &&
                    goiY.nang > value.nangMin &&
                    goiY.nang < value.nangMax &&
                    value
                );
            })[0];
            tinhSize(sizs);
        } else if (goiY.loai === short) {
            var sizs = sizeShort.filter((value, index) => {
                return (
                    goiY.cao > value.caoMin &&
                    goiY.cao < value.caoMax &&
                    goiY.nang > value.nangMin &&
                    goiY.nang < value.nangMax &&
                    value
                );
            })[0];
            tinhSize(sizs);
        }
    };

    const tinhSize = (loi) => {
        if (loi !== undefined && loi !== null) {
            if (loi.type.includes(goiY.type)) {
                setSizeGoiY(loi.size);
            } else {
                if (loi.size === 4) {
                    setSizeGoiY(loi.size);
                } else {
                    setSizeGoiY(loi.size + 1);
                }
            }
        }
    };

    useEffect(() => {
        sizeHandle();
    }, [goiY]);

    return (
        <div className="sges-size container">
            <div className="py-5">
                <div className="mb-5 d-flex justify-content-center">
                    <h4>
                        <span>Hướng dẫn chọn size chuẩn</span>
                    </h4>
                </div>
                <div
                    className="d-flex size-title justify-content-between"
                    style={{ position: "relative" }}
                >
                    <div className="d-flex flex-column col-4 p-0">
                        <div className="count w-100 text-center">
                            <div className="p-2">
                                <span>1</span>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column col-4 p-0">
                        <div className="count w-100 text-center">
                            <div className="p-2">
                                <span>2</span>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column col-4 p-0">
                        <div className="count w-100 text-center">
                            <div className="p-2">
                                <span>3</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className="container border-bottom"
                        style={{ position: "absolute", top: "20px" }}
                    ></div>
                </div>
                <div className="size-content d-flex mt-3">
                    <div className="col-4 px-4 d-flex justify-content-start flex-column">
                        <div className="h-100">
                            <div className="w-100 text-center mb-3">
                                <span>Loại sản phẩm</span>
                            </div>
                            <div className="select-category mb-3 w-100">
                                <select
                                    className="form-control w-100"
                                    style={{ borderRadius: "10px" }}
                                    onChange={changeCate}
                                >
                                    <option hidden>--- Chọn loại sản phẩm ---</option>
                                    {loai.map((value, index) => {
                                        return (
                                            <option value={value} key={index}>
                                                {tenLoai.map((v, i) => {
                                                    return i === index && v;
                                                })}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="d-flex justify-content-center w-100">
                                <img src={goiY.loai} alt="" width="85%" />
                            </div>
                        </div>
                    </div>
                    <div className="col-4 px-4 d-flex justify-content-center flex-column">
                        <div className="w-100 text-center mb-3">
                            <span>Thông số cơ thể</span>
                        </div>
                        <div className="d-flex justify-content-between mb-5">
                            <div className="col-4 text-center d-flex justify-content-center">
                                <Link
                                    to="#"
                                    className="d-flex flex-column"
                                    onClick={() =>
                                        setGoiY({
                                            ...goiY,
                                            type: 1,
                                        })
                                    }
                                >
                                    <img
                                        src={g}
                                        alt=""
                                        width="100px"
                                        style={{
                                            borderRadius: "20px",
                                            opacity: goiY.type === 1 ? "" : "0.5",
                                        }}
                                    />
                                    <span className="py-2">Gầy</span>
                                </Link>
                            </div>
                            <div className="col-4 text-center d-flex justify-content-center">
                                <Link
                                    to="#"
                                    className="d-flex flex-column"
                                    onClick={() =>
                                        setGoiY({
                                            ...goiY,
                                            type: 2,
                                        })
                                    }
                                >
                                    <img
                                        src={bt}
                                        alt=""
                                        width="100px"
                                        style={{
                                            borderRadius: "20px",
                                            opacity: goiY.type === 2 ? "" : "0.5",
                                        }}
                                    />
                                    <span className="py-2">Bình thường</span>
                                </Link>
                            </div>
                            <div className="col-4 text-center d-flex justify-content-center">
                                <Link
                                    to="#"
                                    className="d-flex flex-column"
                                    onClick={() =>
                                        setGoiY({
                                            ...goiY,
                                            type: 3,
                                        })
                                    }
                                >
                                    <img
                                        src={dd}
                                        alt=""
                                        width="100px"
                                        style={{
                                            borderRadius: "20px",
                                            opacity: goiY.type === 3 ? "" : "0.5",
                                        }}
                                    />
                                    <span className="py-2">Đầy đặn</span>
                                </Link>
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="cao mb-4">
                                <label
                                    htmlFor="cao"
                                    className="form-label w-100 d-flex justify-content-between pb-3"
                                >
                                    <span>{"Chiều cao (cm)"}</span>
                                </label>
                                <InputRange
                                    maxValue={180}
                                    minValue={156}
                                    value={goiY.cao}
                                    onChange={(value) =>
                                        setGoiY({
                                            ...goiY,
                                            cao: value,
                                        })
                                    }
                                />
                            </div>
                            <div className="nang mt-4">
                                <label
                                    htmlFor="nang"
                                    className="form-label w-100 d-flex justify-content-between pb-3"
                                >
                                    <span>{"Cân nặng (kg)"}</span>
                                </label>
                                <InputRange
                                    maxValue={80}
                                    minValue={50}
                                    value={goiY.nang}
                                    fontSize="24px"
                                    onChange={(value) =>
                                        setGoiY({
                                            ...goiY,
                                            nang: value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-4 px-4 d-flex justify-content-start flex-column">
                        <div className="w-100 text-center mb-3">
                            <span>Sges gợi ý</span>
                        </div>
                        <div className="w-100 d-flex justify-content-center">
                            <div
                                className="size-select d-flex justify-content-center"
                                style={{ borderRadius: "50px" }}
                            >
                                <span style={{ fontSize: "50px" }}>
                                    {sizeGoiY === 0
                                        ? "S"
                                        : sizeGoiY === 1
                                        ? "M"
                                        : sizeGoiY === 2
                                        ? "L"
                                        : sizeGoiY === 3
                                        ? "XL"
                                        : sizeGoiY === 4
                                        ? "2XL"
                                        : ""}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Size;
