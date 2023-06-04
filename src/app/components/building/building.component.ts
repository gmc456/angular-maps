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
  @Input() data: any;
  message:string = "";
  showPlots:boolean = false;  
  objects:Array<Object> = [];
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

  
  receiveMessage($event: string) {
    this.message = $event

    if(this.message !== ''){
      this.showPlots = true;
      this.getRangePlots(false)
      this.sendObjects =  [];
    }
  } 

  getRangePlots(flag:boolean) {
    console.log('Type of search ' + flag)
    if(flag && (this.range.controls['start'].value !== null && this.range.controls['end'].value != null)){
      console.log('Ranges enter')
      this.objectsService.getFullDetectedObjectsFull(this.message, this.building.building,
        this.range.controls['start'].value, this.range.controls['end'].value).subscribe((res) => { 
        this.sendObjects = res; 
        });
    }else{
      console.log('Without Ranges enter')
      this.objectsService.getCurrentDetectedObjectsFull(this.message, this.building.building).subscribe((res) => { 
        this.sendObjects = res        
      });      
    }    
  }

  
}
