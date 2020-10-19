import { LightningElement, track } from 'lwc';
//import { registerListener, unregisterAllListeners} from 'c/pubsub';
import {loadScript } from 'lightning/platformResourceLoader';
import chartjs from '@salesforce/resourceUrl/Chartjs';
import getChartValues from '@salesforce/apex/ShowChartController.getChartValues';

export default class ShowCharts extends LightningElement {
@track CityLabels =[];
@track regcount = [];
    renderedCallback() {
        alert('ACB1');
        //this.getChartData();
        console.log('chartjs loading');
      
    }

    connectedCallback() {
        window.setInterval(function (){
            //this.getChartData();
        },10);
    }
    /*@track Message;
    connectedCallback() {
        registerListener('messageFromSpace', this.handleMessage, this);
    }
   
    handleMessage(myMessage) {
        alert('ddfdfh');
        console.log('myMessage'+myMessage);
        //Add your code here
    }
*/
    getChartData()
    {
        getChartValues()
        .then(result =>
            {
                for (var key in result) {
                    var chartdata = result[key];
                    console.log('chartdata.Citylabel : '+chartdata.Citylabel + 'chartdata.CityCount : '+chartdata.CityCount);
                this.CityLabels.push(chartdata.Citylabel);
                this.regcount.push(chartdata.CityCount);
                }
                alert('Labels '+this.CityLabels);
                alert('Values '+this.regcount);

                Promise.all([
                    loadScript(this, chartjs+'/Chart.min.js')
                ])
                .then(() => {
                    this.setChartData();
                })
                .catch(error => {
                    console.log('Error1 : '+error);
                });
            })
            .catch(error =>{
                console.log('Error : '+error);
            });
    }

    setChartData()
    {
        var ctx = this.template.querySelector(".chart");
        alert('ctx '+ctx);
        var lineChart = new Chart(ctx, {
            type: 'doughnut',
            /*data:{
                datasets: [{
                    data: [10, 20, 30]
                }],
            
                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'Red',
                    'Yellow',
                    'Blue'
                ]
            }*/
            data: {
                labels: this.CityLabels,
                datasets: [{
                    label: 'Cities',
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#e8c3b9"],
                    data: this.regcount,
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Total Tasks by Status'
                }
            }
        });

        alert('ctx '+ctx);
    }
}