import axios from "axios";
import { Component } from "react"
import { Bar, Line } from "react-chartjs-2";

// THống kê doanh thu trong từng năm

const namePro = [];
const quantityPro = [];
export default class Linechart extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount = () =>{
        this.getData();
    }

    getData = () =>{
        axios.get("http://localhost:8080/thongKe/getTotal")
        .then(res=>{
            const products = res.data;
            products.forEach(element => {
              namePro.push(element[0]);
              quantityPro.push(element[1]);
            });
            
        })
        
        .catch(err =>{
            console.log(err)
        })
        
      }

    render(){
        return(
            <div className="container">
                <h3 className="text-center">Thống kê tổng doanh thu từng năm</h3>
            <Line
              data={{
                // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                labels: namePro,
                datasets: [
                //   {
                //     label: 'Tổng doanh thu ',
                //     // data: [12, 19, 3, 5, 2, 3],
                //     data: quantityPro,
                //     backgroundColor: [
                //       'rgba(255, 99, 132, 0.2)',
                //       'rgba(54, 162, 235, 0.2)',
                //       'rgba(255, 206, 86, 0.2)',
                //       'rgba(75, 192, 192, 0.2)',
                //       'rgba(153, 102, 255, 0.2)',
                //       'rgba(255, 159, 64, 0.2)',
                //     ],
                //     borderColor: [
                //       'rgba(255, 99, 132, 1)',
                //       'rgba(54, 162, 235, 1)',
                //       'rgba(255, 206, 86, 1)',
                //       'rgba(75, 192, 192, 1)',
                //       'rgba(153, 102, 255, 1)',
                //       'rgba(255, 159, 64, 1)',
                //     ],
                //     borderWidth: 1,
                //   },
                  {
                    label: 'Tổng doanh thu',
                    data: quantityPro,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                  },
                ],
              }}
              height={400}
              width={600}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
                legend: {
                  labels: {
                    fontSize: 25,
                  },
                },
              }}
            />
          </div>
        )
    }

}