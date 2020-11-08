import { Injectable } from '@angular/core';
import { AsyncValidatorFn, Form, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from "@angular/common/http";

import { map, filter, debounceTime, distinctUntilChanged, switchMap, catchError, take, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  checkIfEmailExists(): AsyncValidatorFn {
    return (control: FormControl): Observable<{ [key: string]: any } | null> | Promise<{ [key: string]: any } | null> => {
      if (!control.valueChanges || control.pristine) {
        return of(null);
      }
      return control.valueChanges.pipe(
        debounceTime(2500),        
        take(1),
        switchMap(_ => this.authService.checkEmail(control.value)),
      );
    }
  }

  ValorEspecifico(control: FormControl): { [nombreFormControl: string]: boolean } {
    if (control.value === 'jesus')
      return {
        noIguales: true
      }
    return null;
  }

  confirmarPassword(form: FormGroup) {
    let password = form.get('password');
    let confirmarPassword = form.get('confirmarPassword');
    if (password.value === confirmarPassword.value)
      return null;
    confirmarPassword.setErrors({ notEqual: true })
  }
}
