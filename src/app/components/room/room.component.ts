import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectsService } from 'src/app/services/objects.service';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit{

  @Input() obj: any;
  @Input() building: any;
  @Input() room: any;
  auxRooms: number[] = [];  
  result = 0;

  constructor(public activatedRoute: ActivatedRoute,
    private objectsService: ObjectsService ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(()=> {
      this.obj = window.history.state;
      this.building = this.obj.building.building;
      //console.log(this.obj.building.building.room)
      this.auxRooms = this.obj.building.room
      this.room = this.auxRooms[this.obj.rooms]
    });
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    gaby: new FormControl<string | null>(null)
  });

  calculateValue() {
    if(this.range.controls['start'].value !== null && this.range.controls['end'].value != null){
      this.objectsService.getDetectedObjects("gg", this.room, this.building,
        this.range.controls['start'].value, this.range.controls['end'].value).subscribe((res) => { 
        this.result = res; 
        });
    }else{
      this.objectsService.getCurrentDetectedObjects("hh", this.room, this.building).subscribe((res) => { 
        this.result = res        
      });      
    }    
  }

}
