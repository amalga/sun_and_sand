import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class DataService {
  
  constructor(private http: HttpClient) {}

  public getImages(): Observable<any> {
    return this.http.get("./assets/data/gallery.json");
  }
  
  public getSwatches(): Observable<any> {
    return this.http.get("./assets/data/swatches.json");
  }

}
