import React from "react";
import "./Modal.css";

function Modal1({ setOpenModal1,weeks }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal1(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h3>Doanh thu tuần trước</h3>
        </div>
        <div className="body">
          {weeks[1]} VNĐ
        </div>
        <p>{weeks[1]<weeks[0] ? "Doanh thu tuần trước kém hơn " +(weeks[0] -weeks[1])+ " so với tuần này" 
        : "Doanh thu tuần trước lớn hơn "+(weeks[1] -weeks[0])+ "VNĐ so với tuần này"}</p>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal1(false);
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

export default Modal1;