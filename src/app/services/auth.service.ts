import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  checkEmail(value: string) {
    return this.http.get('https://jsonplaceholder.typicode.com/users', {
      params: new HttpParams().set('username', value)
    }).pipe(
      map((user: any) =>
        user.length ? { exists: true } : null
      ),
    )
  }
}
