import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectsService {

  url = 'http://localhost:3004/recognizedObjects'; 
  constructor(private http: HttpClient) {} 

  getCurrentDetectedObjects(object_type: string, space: string, building: string): Observable<any> {
    return this.http.get(`${this.url}/current_detected_objects/`+object_type+`/`+space+`/`+building);
  }
  
  getCurrentDetectedObjectsFull(space: string, building: string): Observable<any> {
    return this.http.get(`${this.url}/current_full_detected_objects/`+space+`/`+building);
  }

  getDetectedObjects(object_type: string, space: string, building: string, from: Date, to: Date): Observable<any> {
    return this.http.get(`${this.url}/detected_objects/`+object_type+`/`+space+`/`+building+`/`+from+`/`+to);
  }

  getFullDetectedObjectsFull(space: string, building: string, from: Date | null, to: Date | null): Observable<any> {
    return this.http.get(`${this.url}/full_detected_objects/`+space+`/`+building+`/`+from+`/`+to);

  }
}
