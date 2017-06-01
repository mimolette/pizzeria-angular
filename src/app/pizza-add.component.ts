import { Component, EventEmitter, Input , Output } from '@angular/core';
import {PizzasService} from './Service/pizzas.service';
import {Ingredient} from'./Model/ingredient';
import {Pizza} from './Model/pizza';

@Component({
  selector: 'app-pizza-add',
  templateUrl: './Views/pizza-add.component.html',
  styleUrls: ['./CSS/pizza-add.css']
})

export class PizzaAddComponent {
  @Input() name: String;
  @Input() price: Number;
  @Input() ingredients: Ingredient[] = [];
  @Output() onCancel = new EventEmitter<boolean>();
  @Output() onInsert = new EventEmitter<Pizza>();

  constructor(private pizzaService: PizzasService) {}

  onSubmitAction(): void {
    const pizzaObj = {
      _id: null,
      name: this.name,
      price: this.price,
      ingredients: this.ingredients
    };

    this.pizzaService.addPizza(pizzaObj)
      .then(function (data) {
        this.onInsert.emit(data);
      }.bind(this))
      .catch(function (err) {
      console.error(err);
    }.bind(this));
  }

  onSelectIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  onUnselectIngredient(ingredient: Ingredient) {
    const index = this.ingredients.indexOf(ingredient);

    if (index) {
      this.ingredients.splice(index, 1);
    }
  }

  onCancelAction(): void {
    this.onCancel.emit(true);
  }
}
