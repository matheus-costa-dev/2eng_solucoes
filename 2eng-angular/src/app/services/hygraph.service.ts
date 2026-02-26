import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SlideData {
  title: string;
  text: string;
  link: string;
  btnText: string;
  background: {
    url: string;
  };
}

export interface ServiceData {
  title: string;
  category: string;
  description: string;
  benefits?: string[];
  images?: {
    url: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class HygraphService {
  private http = inject(HttpClient);
  private endpoint = environment.hygraphEndpoint;
  private token = environment.hygraphToken;

  private get headers() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });
  }

  getSlides(): Observable<SlideData[]> {
    const query = `
      query GetSlides {
        slides {
          title
          text
          link
          btnText
          background {
            url
          }
        }
      }
    `;
    
    return this.http.post<any>(this.endpoint, { query }, { headers: this.headers }).pipe(
      map(res => res.data?.slides || []),
      catchError(error => {
        console.error('Error fetching slides:', error);
        return of([]);
      })
    );
  }

  getServices(): Observable<ServiceData[]> {
    const query = `
      query GetServices {
        services(first: 50) {
          title
          category
          description
          benefits
          images {
            url
          }
        }
      }
    `;

    return this.http.post<any>(this.endpoint, { query }, { headers: this.headers }).pipe(
      map(res => res.data?.services || []),
      catchError(error => {
        console.error('Error fetching services:', error);
        return of([]);
      })
    );
  }
}
