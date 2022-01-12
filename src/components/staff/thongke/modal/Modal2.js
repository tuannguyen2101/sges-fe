import React from "react";
import "./Modal.css";

function Modal2({ setOpenModal2, months }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal2(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h3>Doanh thu tháng trước</h3>
        </div>
        <div className="body">
          {months[1] ==null ? 0 : months[1]} VNĐ
        </div>
        {months[1] ==null ? <p>{"Doanh thu tháng trước kém hơn " +months[0]+ "VNĐ so với tháng này"}</p>
        : <p>{months[1]<months[0] ? "Doanh thu tháng trước kém hơn " +(months[0] -months[1])+ " so với tháng này" 
        : "Doanh thu tháng trước lớn hơn "+(months[1] -months[0])+ "VNĐ so với tháng này"}</p> }
        
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal2(false);
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

export default Modal2;