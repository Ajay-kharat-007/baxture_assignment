import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.APIURL;
  apiUrl = environment.baseURL;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/admins');
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/api/admins/' + id);
  }

  updateUser(id: any, user: User): Observable<any> {
    return this.http.put(this.apiUrl + '/api/admins/' + id, user);
  }

  addUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl + '/api/admins', user);
  }
}
