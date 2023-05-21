import { Component } from '@angular/core';

@Component({
  selector: 'app-stackedchart',
  templateUrl: './stackedchart.component.html',
  styleUrls: ['./stackedchart.component.css']
})
export class StackedchartComponent {

  chart: any;
 
  chartOptions = {
    theme: "light1",
    title:{
      text: "Objetos por dias",
      fontSize: 20
    },
    animationEnabled: true,
    toolTip: {
      shared: true
    },
    legend: {
      horizontalAlign: "right",
      verticalAlign: "center",
      reversed: true
    },
    axisY: {
       includeZero: true
    },
    data: [{
      type: "stackedColumn",
      name: "Facebook",
      showInLegend: true,
      dataPoints: [
        { label: "01-01-2023", y: 19729 },
        { label: "02-01-2023", y: 22127 },
        { label: "03-01-2023", y: 12654 },
        { label: "04-01-2023", y: 22914 }
      ]
    }, {
        type: "stackedColumn",
        name: "Twitter",
        showInLegend: true,
        dataPoints: [
          { label: "01-01-2023", y: 4288 },
          { label: "02-01-2023", y: 6390 },
          { label: "03-01-2023", y: 3510 },
          { label: "04-01-2023", y: 3876 }
        ]
    }, {
        type: "stackedColumn",
         name: "Instagram",
        showInLegend: true,
        dataPoints: [
          { label: "01-01-2023", y: 5338 },
          { label: "02-01-2023", y: 8670 },
          { label: "03-01-2023", y: 4779 },
          { label: "04-01-2023", y: 9415 }
        ]
    }]
  }

}
