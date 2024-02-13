import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl = environment.APIURL;

  constructor(private http: HttpClient) {}

  getJsonUsers(): Observable<any> {
    return this.http.get(this.baseUrl + '/users');
  }
}
