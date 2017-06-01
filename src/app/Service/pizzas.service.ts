import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Pizza } from '../Model/pizza';

const urlPizzas = 'http://localhost:3009/pizzas';

@Injectable()
export class PizzasService {
  constructor(private http: Http) {}

  deletePizza(pizza: Pizza): Promise<boolean> {
    console.log(pizza);
    const url = urlPizzas + '/' + pizza._id;
    return this.http.delete(url)
      .toPromise()
      .then(data => true)
      .catch(function (err) {
        console.error(err);
      })
      ;
  }

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
