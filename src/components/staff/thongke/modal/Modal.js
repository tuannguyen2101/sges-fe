import React from "react";
import "./Modal.css";

function Modal({ setOpenModal,days }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h3>Doanh thu ngày hôm qua</h3>
        </div>
        <div className="body">
          {days[1]} VNĐ
        </div>
        <p>{days[1]<days[0] ? "Doanh thu ngày hôm qua kém hơn " +(days[0] -days[1])+ " so với ngày hôm nay" 
        : "Doanh thu ngày hôm qua lớn hơn "+(days[1] -days[0])+ "VNĐ so với hôm nay"}</p>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;