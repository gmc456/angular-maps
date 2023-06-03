import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-stackedchart',
  templateUrl: './stackedchart.component.html',
  styleUrls: ['./stackedchart.component.css']
})
export class StackedchartComponent {

  public chart: any;

  i:number = 0;
  commomObjs: string[] = [];
  datasets: any[] =[];
	labels:string[] = [];
	objects:Array<object> = [];
	pieChartColors: string[] = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(79, 255, 51)', 'rgb(249, 51, 255)'
	, 'rgb(83, 63, 119)', 'rgb(252, 248, 14)', 'rgb(76, 99, 80)', 'rgb(118, 0, 27)', 'rgb(62, 238, 177)'
	, 'rgb(238, 62, 185)', 'rgb(1, 37, 105)', 'rgb(142, 108, 10)', 'rgb(139, 65, 7)', 'rgb(173, 160, 149)']
  hashMap = new Map<string, number[]>();
  

	@Input('data2')
    set data(data: object[]) {
      this.resetData();
      if(data !== null && data.length !== 0){
        this.objects = data;
        if(this.objects[0].hasOwnProperty("tobjects")){
          this.objects.forEach((element: any) => {   
            this.labels.push(element._id)
            element.tobjects.forEach((obj: any) =>{
              if(!this.commomObjs.includes(obj.object)){
                this.commomObjs.push(obj.object)
              }            
            })                     
            this.i = 0;
          });  
  
          this.commomObjs.forEach((obj:any) => {
            const sumas:number[] = [];
            this.objects.forEach((element: any) => {  
              if(element.tobjects.some((item: { object: any; }) => item.object === obj)){
                element.tobjects.forEach((obj2: any) =>{
                  if(obj2.object === obj){
                    sumas.push(obj2.total);
                  }
                })                
              }else{
                sumas.push(0); 
              }
            });
            this.datasets.push({label:obj, data:sumas, backgroundColor: this.pieChartColors[this.i]});
            this.i++;
          });
        }else{
          this.labels.push('Last update')
          this.objects.forEach((element: any) => { 					
            this.datasets.push({label:element._id, data:[element.count], backgroundColor: this.pieChartColors[this.i]});
            this.i++;  
          });
        }              
      }
      
      this.chart.destroy();
		  this.createChart();
    }

    resetData(){
      this.labels.splice(0);
      this.datasets.splice(0);
      this.i = 0;
    }

	createChart(){  
		this.chart = new Chart("MyChart2", {
		  type: 'bar',
      data: {
        labels: this.labels,
        datasets: this.datasets
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Objects detected on range of dates'
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      },		  
		  
		});
	  }    

	  ngOnInit(): void {
		  this.createChart();
	  } 
}
