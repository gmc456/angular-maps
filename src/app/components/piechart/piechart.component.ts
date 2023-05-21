import { Component } from '@angular/core';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent {
  chartOptions = {
	  animationEnabled: true,
	  theme: "light1",
	  title:{
		text: "Objetos detectados",
    fontSize: 20
	  },
	  data: [{
		type: "pie",
		startAngle: 45,
		indexLabel: "{name}: {y}",
		indexLabelPlacement: "inside",
		//yValueFormatString: "#,###.##'%'",
		dataPoints: [
		  { y: 20, name: "Persona" },
		  { y: 13, name: "Ordenador" },
		  { y: 3, name: "Perro" },
		  { y: 14.9, name: "LinkedIn" },
		  { y: 10.6, name: "Pinterest" },
		  { y: 8.5, name: "Others" }
		]
	  }]
	}

}
