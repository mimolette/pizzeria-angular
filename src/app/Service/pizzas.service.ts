import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Pizza } from '../Model/pizza';

const urlPizzas = 'http://localhost:3009/pizzas';

@Injectable()
export class PizzasService {
  constructor(private http: Http) {}

  getPizzas(): Promise<Pizza[]> {
    return this.http.get(urlPizzas)
      .map(response => response.json())
      .toPromise()
    ;
  }

  addPizza(pizza: Pizza): Promise<Pizza> {
    return this.http.post(urlPizzas, pizza)
      .map(response => response.json())
      .toPromise()
      ;
  }
}
