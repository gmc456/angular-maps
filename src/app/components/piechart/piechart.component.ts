import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class PiechartComponent implements OnInit{

	public chart: any;
	labels:string[] = [];
	values:Array<number> = [];
	objects:Array<object> = [];
	test:any[] = [];
	pieChartLabels: string[] = []
	pieChartValues: number[] = []
	pieChartColors: string[] = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(79, 255, 51)', 'rgb(249, 51, 255)'
	, 'rgb(83, 63, 119)', 'rgb(252, 248, 14)', 'rgb(76, 99, 80)', 'rgb(118, 0, 27)', 'rgb(62, 238, 177)'
	, 'rgb(238, 62, 185)', 'rgb(1, 37, 105)', 'rgb(142, 108, 10)', 'rgb(139, 65, 7)', 'rgb(173, 160, 149)']
	hashMap = new Map<string, number>();

	@Input('data')
    set data(data: object[]) {
		this.resetData();
		if(data !== null && data.length !== 0){
			this.objects = data;
			if(this.objects[0].hasOwnProperty("tobjects")){
				this.objects.forEach((element: any) => {					
					element.tobjects.forEach((obj: any) =>{
						if(this.hashMap.has(obj.object)){
							const sum = this.hashMap.get(obj.object) + obj.total;
							this.hashMap.set(obj.object, sum)
						}else{
							this.hashMap.set(obj.object, obj.total)
						}						
						this.test.push({name:obj.object, total:obj.total})					            
					})							 
				}); 
				
				this.hashMap.forEach((key, value) => {
					this.pieChartLabels.push(value); 
					this.pieChartValues.push(key);
				})
				
			}else{
				this.objects.forEach((element: any) => { 					
					this.pieChartLabels.push(element._id); 
					this.pieChartValues.push(element.count);       
				});	
			}
		}
		this.chart.destroy();
		this.createChart();
    }

	resetData(){
		this.pieChartLabels.splice(0);
		this.pieChartValues.splice(0);
		this.test.splice(0);
		this.hashMap.clear();
	}

	createChart(){  
		this.chart = new Chart("MyChart", {
		  type: 'doughnut', //this denotes tha type of chart
	
		  data: {// values on X-Axis
			labels: this.pieChartLabels,
			  datasets: [{
				//label: 'My First Dataset',
				data: this.pieChartValues,
				backgroundColor: this.pieChartColors ,
				hoverOffset: 4
			  }]
		  },
		  options: {
			plugins: {
			  title: {
				display: true,
				text: 'Objects detected'
			  },
			},
			responsive: true			
		  },		  
		  
		});
	  }

	  ngOnInit(): void {
		this.createChart();
	  } 

}
