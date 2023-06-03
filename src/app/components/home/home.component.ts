import { Component, OnInit } from '@angular/core';
import { BuildingService } from 'src/app/services/building.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  rooms: string[] = []; 
  itemsw: string[] = []; 
  buildings: any[] = [];

  constructor(
    private buildingService: BuildingService 
  ) {}

  ngOnInit(): void {
    this.buildingService.getBuildings().subscribe((res) => { 
      this.buildings = res; 
      console.log(this.buildings);
    });

    //if (this.building) { 

      /*for (let key in this.building) {
        console.log(key, this.building[key]);
      }*/

      //this.rooms = [...this.building.room];

      //this.formHorario.controls['nombre'].setValue(this.persona.nombre);
      //this.formHorario.controls['unidad'].setValue(this.persona.unidad);
      //this.formHorario.controls['telefono'].setValue(this.persona.telefono);

      //this.persona.cargo = this.formHorario.controls['cargo'].value;

      //return;
      //console.log(this.rooms);

    //}
  }

  items = ['CITE III', 'CITE IV', 'CITE V'];
  expandedIndex = 0;

}
