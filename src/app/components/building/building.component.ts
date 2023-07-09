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
  @Input() room: any;
  message:string = "";
  showPlots:boolean = false;
  showButtons:boolean = false;  
  //objects:Array<Object> = [];
  obj:object = new Object();
	dataToShow:Array<Object> = [];
  sendObjects:any;
  auxRooms: string[] = [];

  constructor(public activatedRoute: ActivatedRoute,
    private objectsService: ObjectsService ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(()=> {
      //this.building = window.history.state; 
      
      this.data = window.history.state;
      console.log(this.data)
      this.building = this.data.building.building;
      console.log(this.building)
      //console.log(this.obj.building.building.room)
      this.auxRooms = this.data.building.room

      this.message = this.auxRooms[this.data.rooms]
      if(this.data.rooms !== null){
        console.log("entro aqui")
        this.showPlots = true;
        this.showButtons = true;
        this.getRangePlots(false)
        this.sendObjects =  [];
      }
      
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
    if(flag){
      if((this.range.controls['start'].value !== null && this.range.controls['end'].value !== null) && 
        this.filter.controls['obj'].value !== null){
          //this.showPlots = false;
          //Devolver cantidad total de apariciones del objeto seccionado por dias al igual que las otras llamadas
          this.objectsService.getDetectedObjects(this.filter.controls['obj'].value, this.message, this.building,
            this.range.controls['start'].value, this.range.controls['end'].value).subscribe((res) => { 
            this.sendObjects = res; 
            });

      } else if((this.range.controls['start'].value !== null && this.range.controls['end'].value !== null) && 
        this.filter.controls['obj'].value === null){
          //this.showPlots = true;
          console.log(this.range.controls['start'].value)
          this.objectsService.getFullDetectedObjectsFull(this.message, this.building,
            this.range.controls['start'].value, this.range.controls['end'].value).subscribe((res) => { 
            this.sendObjects = res; 
            });

      } else if((this.range.controls['start'].value === null && this.range.controls['end'].value === null) && 
        (this.filter.controls['obj'].value !== null || this.filter.controls['obj'].value === '')){
          //this.showPlots = false;

          this.objectsService.getCurrentDetectedObjects(this.filter.controls['obj'].value, this.message, this.building).subscribe((res) => { 
            this.sendObjects = res        
          });
      }      
    }else{      
      //this.showPlots = true;
        this.objectsService.getCurrentDetectedObjectsFull(this.message, this.building).subscribe((res) => { 
        this.sendObjects = res        
      });
    }    
  }

  
}
