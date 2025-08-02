import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TestUsersService {
  private fakeUsersURL = 'http://localhost:3000/api/testUsers';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    //Funcion que me permite obtener los usuarios de prueba mediante un GET a nuestra API propia
    return this.http.get<any>(this.fakeUsersURL + '/getTestUsers');
  }
}
