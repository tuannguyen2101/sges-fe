import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";


function Barchartmonth(){
    const[getdatas,setGetData]=useState([]);
    const[getYear,setGetYear] = useState([]);
    const[selectedOption, setSelectedOption] = useState(getYear[0]);

    const getYears = () =>{
        axios.get("http://localhost:8080/thongKe/getAllYears")
        .then(res=>{
            // console.log(res.data)
            // setSelectedOption(res.data)
            setGetYear(res.data)
            // console.log(res);
        })
        .catch(err =>{
            console.log(err)
        })
    }

    useEffect(() => {
        getYears();
        
      }, []);

      const getData = (year) =>{
        axios.get(`http://localhost:8080/thongKe/getTotalByMonth/${year}`)
        .then(res=>{
            const products = res.data;
            let name = [];
             let datas = [];
            products.forEach(element => {
              name.push(element[0]);
              datas.push(element[2]);
            });
            // console.log("a",name,datas)
            setGetData({
                labels: name,
                datasets: [
                    {
                      label: 'Tổng doanh thu',
                      backgroundColor:'rgba(54, 162, 235, 0.8)',
                    //   [
                    //       'green',
                    //       'red',
                    //       'blue',
                    //       '#FFBF00',
                    //       '#DE3163',
                    //       'orange',
                    //       '#40E0D0',
                    //       '#6495ED',
                    //       '#CCCCFF',
                    //       '#FFBF00',
                    //       '#DE3163',
                    //       '#9FE2BF',
                    //       '#CD5C5C'
                    //    ],
                      borderWidth:0,
                      data: datas
                    }
                   ]
            })
        })
        .catch(err =>{
            console.log(err)
        })
        
    }
    useEffect(() => {
        if(selectedOption!=null){
            getData(selectedOption);
        }else{
          getData(2022);
        }
      }, [selectedOption]);

      return(
        <div>
          <h3 className="dashboard">Dashboard</h3>
          <div className="container"> Chọn năm: &nbsp;
              <select value={selectedOption}
           onChange={(e)=> setSelectedOption(e.target.value)}
           >
               {getYear.map((e)=>(
                   <option key={e} value={e} onClick={()=>getData(e)}>
                       {e}
                   </option>
               ))}
           </select><br/>
           <span>Selected option: {selectedOption}</span><br/>
           <div className="col-sm-9">
           <Bar
             data={getdatas}
                options={{
                    title:{
                      display:true,
                      text:'Thống kê doanh thu theo tháng trong năm',
                      fontSize:20
                    },
                    legend:{
                      display:true,
                      position:'right'
                    }
                }}
                />
            </div>

          </div>
          </div>
      )
}
export default Barchartmonth;