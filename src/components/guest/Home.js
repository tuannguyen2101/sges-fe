import React from "react";
import { Link } from "react-router-dom";
import "../../css/home/home.scss";
import hangmoive from "../../img/hang-moi-ve.jpg";
import newIcon from "../../img/new-corner-label.png";
import pnew1 from "../../img/new1.jpg";
import pnew2 from "../../img/new2.jpg";
import pnew3 from "../../img/new3.jpg";
import pnew4 from "../../img/new4.jpg";
import sanphambanchay from "../../img/san-pham-ban-chay.jpg";
import slide1 from "../../img/slide1.png";
import slide2 from "../../img/slide2.jpg";
import slide3 from "../../img/slide3.jpg";
import productService from "../../services/guestservice/productService";

const productNew = [
    {
        img: pnew1,
        title: "Áo Sơ Mi Tay Ngắn",
        price: 380000,
        priceSale: 219000,
        sold: 54,
    },
    {
        img: pnew2,
        title: "Áo Sơ Mi Nam Nữ Ngắn Tay SGES Họa Tiết Bandana Unisex",
        price: 470000,
        priceSale: 249000,
        sold: 15,
    },
    {
        img: pnew3,
        title: "Quần Thun Nhung Tăm Culottes Pants Ống Rộng Lưng Thun SGES Unisex Nam Nữ",
        price: 440000,
        priceSale: 235000,
        sold: 690,
    },
    {
        img: pnew4,
        title: "Quần short kaki nam nữ Donut SGES Unisex cá tính cực chất",
        price: 315000,
        priceSale: 165000,
        sold: 109,
    },
    {
        img: pnew4,
        title: "Quần short kaki nam nữ Donut SGES Unisex cá tính cực chất",
        price: 315000,
        priceSale: 165000,
        sold: 109,
    },
    {
        img: pnew4,
        title: "Quần short kaki nam nữ Donut SGES Unisex cá tính cực chất",
        price: 315000,
        priceSale: 165000,
        sold: 109,
    },
];

const Home = () => {
    return (
        <div className="sges-home">
            <div className="container-fluid p-0">
                <div
                    id="carouselExampleCaptions"
                    className="carousel slide sges-slider"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-indicators slide-btn">
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                    </div>
                    <div className="carousel-inner slide-img">
                        <div className="carousel-item active slide-img-item">
                            <img src={slide1} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item slide-img-item">
                            <img src={slide2} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item slide-img-item">
                            <img src={slide3} className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className="sges-product-new container py-2 mb-5">
                    <div className="py-5 d-flex justify-content-center">
                        <div className="title d-flex justify-content-center align-item-center py-2 w-100">
                            <img src={hangmoive} alt="" />
                        </div>
                    </div>
                    <div className="content d-flex">
                        <div className="row m-0">
                            {productNew.map((value, index) => {
                                return (
                                    <div className="col-3 pb-4 product-new-item" key={index}>
                                        <div className="card" key={index}>
                                            <Link to="#">
                                                <div className="p-img">
                                                    <img
                                                        src={value.img}
                                                        className="card-img-top"
                                                        alt={value.title}
                                                    />
                                                    <img
                                                        src={newIcon}
                                                        className="new-icon"
                                                        alt=""
                                                        height="58px"
                                                    />
                                                </div>
                                                <div className="card-body d-grid">
                                                    <p className="card-text p-title">
                                                        {value.title}
                                                    </p>
                                                    <p className="card-text p-price">
                                                        <span className="price-price">
                                                            {value.price.toLocaleString("vi-VN", {
                                                                style: "currency",
                                                                currency: "VND",
                                                            })}
                                                        </span>
                                                        <span className="price-sale">
                                                            {value.priceSale.toLocaleString(
                                                                "vi-VN",
                                                                {
                                                                    style: "currency",
                                                                    currency: "VND",
                                                                }
                                                            )}
                                                        </span>
                                                    </p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="sges-product-new container py-2">
                    <div className="py-5 d-flex justify-content-center">
                        <div className="title d-flex justify-content-center align-item-center py-2 w-100">
                            <img src={sanphambanchay} alt="" />
                        </div>
                    </div>
                    <div className="content d-flex">
                        <div className="row m-0">
                            {productNew.map((value, index) => {
                                return (
                                    <div className="col-3 product-new-item" key={index}>
                                        <div className="card">
                                            <Link to="#">
                                                <div className="p-img">
                                                    <img
                                                        src={value.img}
                                                        className="card-img-top"
                                                        alt={value.title}
                                                    />
                                                    <img
                                                        src={newIcon}
                                                        className="new-icon"
                                                        alt=""
                                                        height="58px"
                                                    />
                                                </div>
                                                <div className="card-body d-grid">
                                                    <p className="card-text p-title">
                                                        {value.title}
                                                    </p>
                                                    <p className="card-text p-price">
                                                        <span className="price-price">
                                                            {value.price.toLocaleString("vi-VN", {
                                                                style: "currency",
                                                                currency: "VND",
                                                            })}
                                                        </span>
                                                        <span className="price-sale">
                                                            {value.priceSale.toLocaleString(
                                                                "vi-VN",
                                                                {
                                                                    style: "currency",
                                                                    currency: "VND",
                                                                }
                                                            )}
                                                        </span>
                                                    </p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

// import { Component } from "react";
// import '../../App.css';

// class Home extends Component {
//     render() {
//         return (
//             <div>
//                 <div>
//                     <div className="row m-0" style={{ backgroundColor: '#F5F3F2' }}>
//                         <div className="col-sm-2">
//                         </div>
//                         <div className="col-sm-8">
//                             <div className="row">
//                                 <div className="col p-0 ps-2">
//                                     <img src="https://media3.scdn.vn/img4/2021/01_08/HZLkEkEd24irMlzQ1aUV.jpg" className="img-fluid" alt="" />
//                                 </div>
//                                 <div className="col p-0 pe-2">
//                                     <div className="w-100 h-100" style={{ backgroundColor: '#FFE9E3', paddingTop: '33%' }}>
//                                         <h3 className="text-center">SULTRY &amp; SMART</h3>
//                                         <p className="text-center">HOT SPRING LOOKS</p>
//                                         <h3 className="text-center">Shop women</h3>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-sm-2" />
//                     </div>
//                     <div className="row m-0" style={{ backgroundColor: '#D4E4E0' }}>
//                         <div className="col-sm-2">
//                         </div>
//                         <div className="col-sm-8">
//                             <div className="row">
//                                 <div className="col p-0 ps-2">
//                                     <div className="w-100 h-100" style={{ backgroundColor: '#A3C7BD', paddingTop: '33%', color: 'white' }}>
//                                         <h3 className="text-center">ELEGANT &amp; SLICK</h3>
//                                         <p className="text-center">GET READY FOR SUMMER</p>
//                                         <h3 className="text-center">Shop men</h3>
//                                     </div>
//                                 </div>
//                                 <div className="col p-0 pe-2">
//                                     <img src="https://cf.shopee.vn/file/7505f513809bd9e0fb59aebfcc6b5eb7" className="img-fluid" alt="" />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-sm-2" />
//                     </div>
//                 </div>
//                 <div>
//                     <div className="p-4">
//                         <h3 className="text-center">Sản phẩm mới</h3>
//                     </div>
//                     <div className="row m-0">
//                         <div className="col-md-2" />
//                         <div className="col-md-8">
//                             <div className="row text-center">
//                                 <div className="col-md-4 ps-2 pe-2">
//                                     <img src="https://static.wixstatic.com/media/84770f_92ad288f7eb849c68652826216de56dc.png/v1/fill/w_394,h_518,al_c,q_90,usm_0.66_1.00_0.01/84770f_92ad288f7eb849c68652826216de56dc.webp" className="img-fluid" alt="" />
//                                     <div className="text-center p-4" style={{ backgroundColor: '#DADAD7' }}>
//                                         <h5 className="fts-normal">DENIM</h5>
//                                         <span>$ 45.00</span>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4 ps-2 pe-2">
//                                     <img src="https://static.wixstatic.com/media/84770f_fa2cb753b49b43faa1e9b3da2e8f72c0.png/v1/fill/w_396,h_518,al_c,q_90,usm_0.66_1.00_0.01/84770f_fa2cb753b49b43faa1e9b3da2e8f72c0.webp" className="img-fluid" alt="" />
//                                     <div className="text-center p-4" style={{ backgroundColor: '#DADAD7' }}>
//                                         <h5 className="fts-normal">DENIM</h5>
//                                         <span>$ 45.00</span>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-4 ps-2 pe-2">
//                                     <img src="https://static.wixstatic.com/media/84770f_8745e3f04d8e4662ba23b4d575602616.png/v1/fill/w_399,h_518,al_c,q_90,usm_0.66_1.00_0.01/84770f_8745e3f04d8e4662ba23b4d575602616.webp" className="img-fluid" alt="" />
//                                     <div className="text-center p-4" style={{ backgroundColor: '#DADAD7' }}>
//                                         <h5 className="fts-normal">DENIM</h5>
//                                         <span>$ 45.00</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-md-2" />
//                     </div>
//                 </div>
//                 <div className="mt-5 text-center">
//                     <h1>ĐĂNG KÝ NHẬN THÔNG BÁO</h1>
//                     <h5>Nhận thông báo từ SGES.</h5>
//                     <div className="row m-4">
//                         <div className="col-md-4" />
//                         <div className="col-md-4 ps-5 pe-5">
//                             <form>
//                                 <input type="email" className="form-control border border-3 rounded-0" placeholder="Nhập địa chỉ email" />
//                                 <button className="mt-3 p-0 pt-2 btn w-100 rounded-0" style={{ backgroundColor: '#A3C7BD' }}>
//                                     <h5 style={{ color: 'white' }}>Đăng ký ngay</h5>
//                                 </button>
//                             </form>
//                         </div>
//                         <div className="col-md-4" />
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default Home;
