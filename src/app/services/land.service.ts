import { Injectable } from '@angular/core';
import { LANDEN } from '../mock/mock-landen';
import { Land } from '../model/land';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class LandService {
  private landenUrl = 'api/landen';

  getLanden(): Observable<Land[]> {
    return this.http.get<Land[]>(this.landenUrl).pipe(catchError(this.handleError('getLanden', []))
    );
  }

  getTopLanden(top: number): Observable<Land[]> {
    return this.http.get<Land[]>(this.landenUrl)
      .pipe(
        map(landen => landen.sort(function (a, b) { return b.inwoners - a.inwoners; }).slice(0, top)),
        catchError(this.handleError('getTopLanden', []))
      );
  }

  getLand(id: number): Observable<Land | undefined> {
    const url = `${this.landenUrl}/${id}`;
    return this.http.get<Land>(url)
      .pipe(
        catchError(this.handleError<Land>(`getLand id=${id}`))
      );
  }

  updateLand(land: Land): Observable<any> {
    return this.http.put(this.landenUrl, land, httpOptions).pipe(
      catchError(this.handleError<any>('updateLand'))
    );
  }

  addLand(land: Land): Observable<Land> {
    return this.http.post<Land>(this.landenUrl, land, httpOptions).pipe(
      catchError(this.handleError<Land>('addLand'))
    );
  }

  deleteLand(land: Land | number): Observable<Land> {
    const id = typeof land === 'number' ? land : land.id;
    const url = `${this.landenUrl}/${id}`;
    return this.http.delete<Land>(url, httpOptions).pipe(
      catchError(this.handleError<Land>('deleteLand'))
    );
  }

  constructor(private http: HttpClient) { }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(operation, error);
      return of(result as T);
    };
  }
  zoekLand(zoekString: string): Observable<Land[]> {
    if (!zoekString.trim()) {
      return of([]);
    }
    return this.http.get<Land[]>(`${this.landenUrl}/?name=${zoekString}`).pipe(
      catchError(this.handleError<Land[]>('zoekLand', []))
    );
  }
}
