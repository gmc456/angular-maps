import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  message: string = "empty"

  @Output() messageEvent = new EventEmitter<string>();

  sendMessage(room: string) {
    this.message = room;
    this.messageEvent.emit(this.message)
  }

}
