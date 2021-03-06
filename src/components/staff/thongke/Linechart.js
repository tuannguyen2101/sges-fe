import axios from "axios";
import {ArrowDownward, ArrowUpward} from '@material-ui/icons';
import React, { useEffect, useState } from "react";
import './thongke.css';
import Modal from "./modal/Modal";
import Modal1 from "./modal/Modal1";
import Modal2 from "./modal/Modal2";


// Thống kê doanh thu theo ngày, tháng, năm
const days = []; 
const weeks = [];
const months = [];
export default function Linechart() {
  const [dataDay, setDataDay] = useState([])
  const [dataWeek, setDataWeek] = useState([])
  const [dataMonth, setDataMonth] = useState([])

  const getDataDay = () =>{
      axios.get("http://localhost:8080/thongKe/getSalesByDay")
      .then(res=>{
          const datas = res.data;
          console.log("aaaaaa",datas)
          datas.forEach(element => {
              days.push(element[1])
              // console.log(element[1])
          });
          // console.log("vv",days);
          setDataDay(res.data[0])
          // console.log("aa",res.data[0])
      })
      .catch(err =>{
          console.log(err)
      })
  }
  const getDataWeek = () =>{
      axios.get("http://localhost:8080/thongKe/getSalesByWeek")
      .then(res=>{
          const datas = res.data;
          datas.forEach(element =>{
              weeks.push(element[1])
          })
          setDataWeek(res.data[0])
          // console.log("bb",res.data)
      })
      .catch(err =>{
          console.log(err)
      })
  }

  const getDataMonth = () =>{
      axios.get("http://localhost:8080/thongKe/getSalesByCurrentMonth")
      .then(res=>{
          const datas = res.data;
          datas.forEach(element =>{
              months.push(element[1])
              // console.log(element[1])
          })
          setDataMonth(res.data[0])
          // console.log("cc",res.data[])
      })
      .catch(err =>{
          console.log(err)
      })
  }

  useEffect(() => {
      getDataDay();
      getDataWeek();
      getDataMonth();
  },[])

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  return(
      <div className="thongke">
          {modalOpen && <Modal setOpenModal={setModalOpen} days={days} />}
          {modalOpen1 && <Modal1 setOpenModal1={setModalOpen1} weeks={weeks}/>}
          {modalOpen2 && <Modal2 setOpenModal2={setModalOpen2} months={months}/>}
          <div className="thongkeItem">
              <span className="thongkeTitle">Doanh thu ngày</span>     
              <div className="thongkeMoneyContainer">

                      <span className="thongkeMoney" key={dataDay[0]}>{dataDay[1]} VNĐ</span>
                      {days[0] < days[1] ?
                      <span className="thongkeMoneyRate">{ ((days[0]-days[1])/days[1] * 100).toFixed(2)}%<ArrowDownward className="thongkeIcon"/></span> 
                      : 
                      <span className="thongkeMoneyRate">+{((days[0]-days[1])/days[1] * 100).toFixed(2)}%<ArrowUpward className="thongkeIconUp"/></span>}
              </div>
              <span className="thongkeSub">So với hôm qua</span>
              <div className="right openModalBtn"
                onClick={() => {
                setModalOpen(true);
                }}>Chi tiết</div>
                
          </div>    
          <div className="thongkeItem">
              <span className="thongkeTitle">Doanh thu tuần</span>     
              <div className="thongkeMoneyContainer">
                      <span className="thongkeMoney" key={dataWeek[0]}>{dataWeek[1]} VNĐ</span>
                          {weeks[0] < weeks[1] ?
                          <span className="thongkeMoneyRate">{ ((weeks[0]-weeks[1])/weeks[1] * 100).toFixed(2)}%<ArrowDownward className="thongkeIcon"/></span> 
                          : 
                      <span className="thongkeMoneyRate">+{((weeks[0]-weeks[1])/weeks[1] * 100).toFixed(2)}%<ArrowUpward className="thongkeIconUp"/></span>}
              </div>
              <span className="thongkeSub">So với tuần trước</span>
              <div className="right openModalBtn"
                onClick={() => {
                setModalOpen1(true);
                }}>Chi tiết</div>
                
          </div>  
          <div className="thongkeItem">
              <span className="thongkeTitle">Doanh thu tháng</span>     
              <div className="thongkeMoneyContainer">
                      <span className="thongkeMoney" key={dataMonth[0]}>{dataMonth[1]} VNĐ</span>
                      {months[1] ?
                        <span className="thongkeMoneyRate">{((months[0]-months[1])/months[1] * 100).toFixed(2)}%<ArrowDownward className="thongkeIcon"/></span> 
                          : 
                          <span className="thongkeMoneyRate">{ (months[0]/1 * 100).toFixed(2)}%<ArrowUpward className="thongkeIconUp"/></span> }

                          {/* {months[0] < months[1] ?
                           <span className="thongkeMoneyRate">{ ((months[0]-months[1])/months[1] * 100).toFixed(2)}%<ArrowDownward className="thongkeIcon"/></span> 
                          : 
                      <span className="thongkeMoneyRate">+{((months[0]-months[1])/months[1] * 100).toFixed(2)}%<ArrowUpward className="thongkeIconUp"/></span>} */}
              </div>
              <span className="thongkeSub">So với tháng trước</span>
              <div className="right openModalBtn"
                onClick={() => {
                setModalOpen2(true);
                }}>Chi tiết</div>
                
          </div>                 
      </div>
  )
}