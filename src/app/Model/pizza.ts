import { Ingredient } from './ingredient';

export interface Pizza {
  _id: String;
  name: String;
  price: Number;
  ingredients: Ingredient[];
}
