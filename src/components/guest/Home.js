import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/home/home.scss";
import hangmoive from "../../img/hang-moi-ve.jpg";
import newIcon from "../../img/new-corner-label.png";
import sanphambanchayTitle from "../../img/san-pham-ban-chay.jpg";
import slide1 from "../../img/slide1.png";
import slide2 from "../../img/slide2.jpg";
import slide3 from "../../img/slide3.jpg";
import productService from "../../services/guestservice/productService";

const Home = () => {
    const [productNews, setProductNews] = useState([]);

    const [sanPhamBanChay, setSanPhamBanChay] = useState([]);

    const findProductNewByTop = () => {
        productService
            .findProductNew()
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setSanPhamBanChay(
                    ...new Array(
                        result.map((value, index) => {
                            return value;
                        })
                    )
                );
            })
            .catch((error) => console.log("error", error));
    };

    const timSanPhamBanChay = () => {
        productService
            .timSanPhamBanChay()
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setProductNews(
                    ...new Array(
                        result.map((value, index) => {
                            return value;
                        })
                    )
                );
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        findProductNewByTop();
        timSanPhamBanChay();
    }, []);

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
                            <Link to="/shop">
                                <img src={slide1} className="d-block w-100" alt="..." />
                            </Link>
                        </div>
                        <div className="carousel-item slide-img-item">
                            <Link to="/shop">
                                <img src={slide2} className="d-block w-100" alt="..." />
                            </Link>
                        </div>
                        <div className="carousel-item slide-img-item">
                            <Link to="/shop">
                                <img src={slide3} className="d-block w-100" alt="..." />
                            </Link>
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
                            {productNews
                                ? productNews.map((value, index) => {
                                      return (
                                          <div className="col-3 pb-4 product-new-item" key={index}>
                                              <div className="card">
                                                  <Link to={"/product/" + value.id}>
                                                      <div className="p-img">
                                                          <img
                                                              src={
                                                                  "http://localhost:8080/file/read/" +
                                                                  value.image
                                                              }
                                                              className="card-img-top"
                                                              alt={value.name}
                                                              onError={(e) => {
                                                                  e.target.onerror = null;
                                                                  e.target.src =
                                                                      "http://localhost:8080/file/read/no-image-800x600.png";
                                                              }}
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
                                                              {value.name}
                                                          </p>
                                                          <p className="card-text p-price">
                                                              <span className="price-price">
                                                                  {value.price.toLocaleString(
                                                                      "vi-VN",
                                                                      {
                                                                          style: "currency",
                                                                          currency: "VND",
                                                                      }
                                                                  )}
                                                              </span>
                                                              <span className="price-sale">
                                                                  {value.sale.toLocaleString(
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
                                  })
                                : null}
                        </div>
                    </div>
                </div>
                <div className="sges-product-new container py-2">
                    <div className="py-5 d-flex justify-content-center">
                        <div className="title d-flex justify-content-center align-item-center py-2 w-100">
                            <img src={sanphambanchayTitle} alt="" />
                        </div>
                    </div>
                    <div className="content d-flex">
                        <div className="row m-0">
                            {sanPhamBanChay
                                ? sanPhamBanChay.map((value, index) => {
                                      return (
                                          <div className="col-3 pb-4 product-new-item" key={index}>
                                              <div className="card">
                                                  <Link to={"/product/" + value.id}>
                                                      <div className="p-img">
                                                          <img
                                                              src={
                                                                  "http://localhost:8080/file/read/" +
                                                                  value.image
                                                              }
                                                              className="card-img-top"
                                                              alt={value.name}
                                                              onError={(e) => {
                                                                  e.target.onerror = null;
                                                                  e.target.src =
                                                                      "https://bizflyportal.mediacdn.vn/bizflyportal/459/347/2020/06/02/17/37/70515910726734841.jpg";
                                                              }}
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
                                                              {value.name}
                                                          </p>
                                                          <p className="card-text p-price">
                                                              <span className="price-price">
                                                                  {value.price.toLocaleString(
                                                                      "vi-VN",
                                                                      {
                                                                          style: "currency",
                                                                          currency: "VND",
                                                                      }
                                                                  )}
                                                              </span>
                                                              <span className="price-sale">
                                                                  {value.sale.toLocaleString(
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
                                  })
                                : null}
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
