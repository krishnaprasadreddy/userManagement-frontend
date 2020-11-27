import { product } from './../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  URL: string = 'http://localhost:5000/api/product';
  getProducts() {
    return this.http.get(this.URL, this.setHeaders('token'));
  }

  addProduct(product: product) {
    return this.http.post(this.URL, product, this.setHeaders('token'));
  }

  updateProduct(product) {
    console.log(product._id);
    return this.http.put(
      `${this.URL}/${product._id}`,
      product,
      this.setHeaders('token')
    );
  }

  deleteProduct(product) {
    console.log(product._id);
    return this.http.delete(
      `${this.URL}/${product._id}`,
      this.setHeaders('token')
    );
  }

  setHeaders(token?: String) {
    let headers = {
      Accept: 'application/json',
      'content-type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = this.cookieService.get('token');
    }
    return { headers: new HttpHeaders(headers) };
  }
}
