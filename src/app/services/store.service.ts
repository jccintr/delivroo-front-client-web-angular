import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private readonly BASE_API: string = 'https://api.delivroo.app.br/api';
  public readonly BASE_STORAGE: string = 'https://api.delivroo.app.br/storage';
  
  constructor(private http: HttpClient) {}

  getStoreData(store: string): Observable<any> {

    return this.http.get(`${this.BASE_API}/tenant/${store}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
  }
}
