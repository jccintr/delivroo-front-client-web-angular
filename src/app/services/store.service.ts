import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private readonly BASE_API: string = 'https://api.delivroo.app.br/api';
  public readonly BASE_STORAGE: string = 'https://api.delivroo.app.br/storage';
  private waitTime: string = '';
  constructor(private http: HttpClient) {}

  getStoreData(store: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_API}/tenant/${store}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).pipe(
      tap(data => {
        this.waitTime = data.tempo_espera;
      })
    );
}

  getWaitTime(){
    return this.waitTime;
  }
}
