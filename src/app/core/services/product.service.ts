import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IProduct } from '../../shared/models/product';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class productService {
  apiUrl: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // Create products
  createproducts(product): Observable<IProduct> {
    return this.http
      .post<IProduct>(this.apiUrl + '/products', product)
      .pipe(catchError(this.error));
  }

  // Read products
  showproducts() {
    return this.http.get(`${this.apiUrl}/products`);
  }

  // Get product detsila by id
  getCotactDetails(id): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl + '/products/' + id);
  }

  // Update products
  updateproduct(id: string, product: IProduct): Observable<IProduct[]> {
    return this.http.put<IProduct[]>(`${this.apiUrl}/products/${id}`, product, {
      headers: this.headers,
    });
  }

  // Delete a product
  deleteproduct(id: any): Observable<IProduct[]> {
    const url = `${this.apiUrl}/products/${id}`;
    return this.http.delete<IProduct[]>(url, {
      headers: this.headers,
    });
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
