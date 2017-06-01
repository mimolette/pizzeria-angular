import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Ingredient } from '../Model/ingredient';

const urlIngredients = 'http://localhost:3009/ingredients';

@Injectable()
export class IngredientsService {
  constructor(private http: Http) {}

  getIngredients(): any {
    return this.http.get(urlIngredients)
      .toPromise()
      .then(response => response.json() as Ingredient)
      .catch(function (err) {
        console.error(err);
      });
  }
}
