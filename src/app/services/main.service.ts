import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs';
import { Main } from '../interface/main.interface';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  url = environment.api
  data$ = new BehaviorSubject({})
  constructor(private http: HttpClient) { }

  public get() {
    return this.http.get<Main>(this.url).pipe(
      tap(response => this.data$.next(response))
    )
  }
}
