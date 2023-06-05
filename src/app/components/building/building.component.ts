import { Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ObjectsService } from 'src/app/services/objects.service';


@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit{

  @Input() building: any;
  //@Input() data: any;
  message:string = "";
  showPlots:boolean = false;
  showButtons:boolean = false;  
  //objects:Array<Object> = [];
  obj:object = new Object();
	dataToShow:Array<Object> = [];
  sendObjects:any;

  constructor(public activatedRoute: ActivatedRoute,
    private objectsService: ObjectsService ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(()=> {
      this.building = window.history.state;      
    });
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  filter = new FormGroup({
    obj: new FormControl<string | null>(null)
  });

  
  receiveMessage($event: string) {
    this.message = $event

    if(this.message !== ''){
      this.showPlots = true;
      this.showButtons = true;
      this.getRangePlots(false)
      this.sendObjects =  [];
    }
  } 

  getRangePlots(flag:boolean) {
    console.log('Type of search ' + this.filter.controls['obj'].value)
    if(flag){
      if((this.range.controls['start'].value !== null && this.range.controls['end'].value !== null) && 
        this.filter.controls['obj'].value !== null){
          //this.showPlots = false;
          //Devolver cantidad total de apariciones del objeto seccionado por dias al igual que las otras llamadas
          console.log('Ranges enter -> ' + "gg")
          this.objectsService.getDetectedObjects(this.filter.controls['obj'].value, this.message, this.building.building,
            this.range.controls['start'].value, this.range.controls['end'].value).subscribe((res) => { 
            this.sendObjects = res; 
            });

      } else if((this.range.controls['start'].value !== null && this.range.controls['end'].value !== null) && 
        this.filter.controls['obj'].value === null){
          //this.showPlots = true;

          console.log('Ranges enter')
          this.objectsService.getFullDetectedObjectsFull(this.message, this.building.building,
            this.range.controls['start'].value, this.range.controls['end'].value).subscribe((res) => { 
            this.sendObjects = res; 
            });

      } else if((this.range.controls['start'].value === null && this.range.controls['end'].value === null) && 
        this.filter.controls['obj'].value !== null){
          //this.showPlots = false;

          console.log('Without Ranges enter')
          console.log('Ranges enter -> ' + this.filter.controls['obj'].value)
          this.objectsService.getCurrentDetectedObjects(this.filter.controls['obj'].value, this.message, this.building.building).subscribe((res) => { 
            this.sendObjects = res        
          });
      }      
    }else{      
      //this.showPlots = true;
      console.log('Without Ranges enter')
        this.objectsService.getCurrentDetectedObjectsFull(this.message, this.building.building).subscribe((res) => { 
        this.sendObjects = res        
      });
    }    
  }

  
}
