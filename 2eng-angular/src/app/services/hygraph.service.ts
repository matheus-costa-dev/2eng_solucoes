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

export interface TestimonialData {
  name: string;
  role: string;
  text: string;
  rating?: number;
  avatar?: {
    url: string;
  };
}

export interface ClientData {
  name: string;
  logo: {
    url: string;
  };
}

export interface ServiceHomeData {
  serviceId: string;
  images: {
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

  getTestimonials(): Observable<TestimonialData[]> {
    const query = `
      query GetTestimonials {
        testimonials(first: 20) {
          name
          role
          text
          rating
          avatar {
            url
          }
        }
      }
    `;
    return this.http.post<any>(this.endpoint, { query }, { headers: this.headers })
      .pipe(
        map(res => res.data.testimonials),
        catchError(this.handleError)
      );
  }

  getClients(): Observable<ClientData[]> {
    const query = `
      query GetClients {
        clients(first: 20) {
          name
          logo {
            url
          }
        }
      }
    `;
    return this.http.post<any>(this.endpoint, { query }, { headers: this.headers })
      .pipe(
        map(res => res.data.clients),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return of([]);
  }

  getServiceHomes(): Observable<ServiceHomeData[]> {
    const query = `
      query GetServiceHomes {
        serviceHomes(first: 50) {
          serviceId
          images {
            url
          }
        }
      }
    `;
    console.log("Sending query to Hygraph for ServiceHomes:", query);
    return this.http.post<any>(this.endpoint, { query }, { headers: this.headers }).pipe(
      map(res => {
        if (res.errors) {
          console.error('GraphQL Errors:', res.errors);
        }
        return res.data?.serviceHomes || [];
      }),
      catchError(error => {
        console.error('Network Error fetching service homes:', error);
        // Extract exact error body if possible
        if (error.error) {
          console.error('Inner error body:', error.error);
        }
        return of([]);
      })
    );
  }
}
