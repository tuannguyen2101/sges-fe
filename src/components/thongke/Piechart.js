import axios from "axios";
import { Component } from "react"
import { Pie,defaults } from "react-chartjs-2";

defaults.global.tooltips.enabled = true
defaults.global.legend.position = 'bottom'

// THống kê số lượng sản phẩm theo tên

const namePro = [];
const quantityPro = [];
export default class Piechart extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount = () =>{
        this.getData();
    }

    getData = () =>{
        axios.get("http://localhost:8080/thongKe/currentProduct")
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
            <div>
                <h3 className="text-center">Thống kê số lượng sản phẩm</h3>
            <Pie   
              data={{
                // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                labels: namePro,
                datasets: [
                  {
                    label: 'Tổng số lượng ',
                    // data: [12, 19, 3, 5, 2, 3],
                    data: quantityPro,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                  },
                //   {
                //     label: 'Tổng doanh thu',
                //     data: quantityPro,
                //     backgroundColor: 'rgba(54, 162, 235, 1)',
                //     borderColor: 'rgba(75, 192, 192, 1)',
                //     borderWidth: 4,
                //   },
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