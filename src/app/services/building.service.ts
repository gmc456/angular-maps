import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  url = 'http://localhost:3000/devices'; 
  constructor(private http: HttpClient) {} 

  getBuildings(): Observable<any> { 
    return this.http.get(`${this.url}/get_buildings/{test}`);
  }
}
